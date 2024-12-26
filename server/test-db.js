const mongoose = require("mongoose"); // Correctly import mongoose

// Define a schema
const testSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

// Define a model
const TestModel = mongoose.model("TestCollection", testSchema);

// Test MongoDB connection and operations
async function testDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/testDatabase", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB successfully!");

    // Add a test document
    const doc = new TestModel({ name: "John Doe", age: 30 });
    await doc.save();
    console.log("Document saved:", doc);

    // Retrieve all documents
    const docs = await TestModel.find();
    console.log("Documents in TestCollection:", docs);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await TestModel.deleteMany({});
    console.log("All documents deleted from TestCollection");

    const docs = await TestModel.find();
    console.log("Documents in TestCollection after cleanup:", docs);

    mongoose.connection.close();
    console.log("Connection closed.");
  }
}

// Run the test
testDatabase();

