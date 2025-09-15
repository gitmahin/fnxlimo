import mongoose from "mongoose";

// import dotenv from "dotenv"

// dotenv.config({
//   path: "./../../.env" // adjust path as needed
// });

// console.log("database uri is", process.env.MONGO_URI)

type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

async function connDb(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database already connected");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = db.connections[0]?.readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to database");
    process.exit(1);
  }
}

export default connDb;
