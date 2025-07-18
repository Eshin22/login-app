const { MongoClient } = require("mongodb");

const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/your-database";

async function migrateComments() {
  const client = new MongoClient(MONGODB_URI);

  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db();
    const papers = db.collection("papers");

    // Find all papers where comments is a string
    const papersToMigrate = await papers
      .find({
        comments: { $type: "string" },
      })
      .toArray();

    console.log(`Found ${papersToMigrate.length} papers to migrate`);

    for (const paper of papersToMigrate) {
      const legacyComment = paper.comments;
      const newComments = [];

      // If there's a legacy comment, convert it to the new format
      if (legacyComment && legacyComment.trim()) {
        newComments.push({
          reviewer: paper.reviewer || "Unknown",
          comment: legacyComment.trim(),
          createdAt: new Date(),
        });
      }

      // Update the paper with the new comments array
      await papers.updateOne(
        { _id: paper._id },
        {
          $set: {
            comments: newComments,
            reviewCount: newComments.length,
          },
        }
      );

      console.log(`Migrated paper ${paper._id}`);
    }

    console.log("Migration completed successfully");
  } catch (error) {
    console.error("Migration failed:", error);
    throw error;
  } finally {
    await client.close();
  }
}

// Run the migration
migrateComments()
  .then(() => {
    console.log("Migration finished");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Migration error:", error);
    process.exit(1);
  });
