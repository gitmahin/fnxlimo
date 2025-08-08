import mongoose from "mongoose"


type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

async function connDb(): Promise<void> {
    if(connection.isConnected) {
        console.log("Database already connected")
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "" )
        connection.isConnected = db.connections[0]?.readyState

    } catch (error) {
        console.log("Error connecting to database")
        process.exit(1)
    }
}

export default connDb