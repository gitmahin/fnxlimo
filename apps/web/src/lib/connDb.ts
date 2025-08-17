import mongoose from "mongoose";

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
    const db = await mongoose.connect(
      "mongodb+srv://finixlimo_3445:tVvoQ5kFwLDeLDuS@cluster0.ssnme5e.mongodb.net/finixlimo?retryWrites=true&w=majority&appName=Cluster0"
    );
    connection.isConnected = db.connections[0]?.readyState;
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error connecting to database");
    process.exit(1);
  }
}

export default connDb;
