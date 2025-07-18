// Quick script to get paper IDs and reviewer names for testing
// Run this in your browser console or Node.js environment

// Example MongoDB queries to get test data:

// To get all papers with their IDs and assigned reviewers:
db.papers.find(
  {},
  { _id: 1, title: 1, reviewer: 1, reviewCount: 1, status: 1 }
);

// To get all papers assigned to a specific reviewer:
db.papers.find({ reviewer: "John Doe" }, { _id: 1, title: 1, reviewCount: 1 });

// To get papers with less than 3 reviews (good for testing):
db.papers.find(
  { reviewCount: { $lt: 3 } },
  { _id: 1, title: 1, reviewer: 1, reviewCount: 1 }
);

// To find papers with string comments (legacy format):
db.papers.find({ comments: { $type: "string" } }, { _id: 1, comments: 1 });

// To update a paper's comments field from string to array (migration):
db.papers.updateMany({ comments: { $type: "string" } }, [
  {
    $set: {
      comments: {
        $cond: {
          if: {
            $and: [{ $ne: ["$comments", ""] }, { $ne: ["$comments", null] }],
          },
          then: [
            {
              reviewer: { $ifNull: ["$reviewer", "Unknown"] },
              comment: "$comments",
              createdAt: new Date(),
            },
          ],
          else: [],
        },
      },
    },
  },
]);

// Example test data for HTTP requests:
/*
Replace these values in your test.http file:

1. Get a real paper ID:
   - Open MongoDB Compass or run: db.papers.findOne({}, {_id: 1})
   - Copy the ObjectId, e.g., "6747b123456789abcdefghij"

2. Get a real reviewer name:
   - Run: db.papers.distinct("reviewer")
   - Pick a reviewer name, e.g., "John Doe"

3. Update the variables in test.http:
   @paperId = your_actual_paper_id
   @reviewerName = your_actual_reviewer_name
*/
