// Run this script to clear the users collection if needed
// Usage: node reset-db.js

const { MongoClient } = require("mongodb");

async function resetUsersCollection() {
  const client = new MongoClient("mongodb://localhost:27017"); // Update with your MongoDB URI

  try {
    await client.connect();
    const db = client.db("your-database-name"); // Update with your database name

    // Drop the users collection
    await db.collection("users").drop();
    console.log("Users collection dropped successfully");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}

resetUsersCollection();
