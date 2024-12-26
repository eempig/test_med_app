const mongoose = require("mongoose");

// Connection URI for local MongoDB
const mongoURI = "mongodb://127.0.0.1:27017"; // Replace with your MongoDB URI

// Define a schema and model
const testSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

const TestModel = mongoose.model("TestCollection", testSchema);

// Test MongoDB connection and perform operations
async function testDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI, { dbName: "testDatabase" });
    console.log("Connected to MongoDB successfully!");

    // Add a test document
    const doc = new TestModel({ name: "John Doe", age: 30 });
    await doc.save();
    console.log("Document saved:", doc);

    // Retrieve all documents
    const docs = await TestModel.find();
    console.log("Documents in TestCollection:", docs);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } finally {
    // Disconnect from MongoDB
    await mongoose.connection.close();
    console.log("Connection closed.");
  }
}

// Run the test
testDatabase();
