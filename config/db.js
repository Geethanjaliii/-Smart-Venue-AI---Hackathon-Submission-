const mongoose = require('mongoose');

/**
 * Initializes connection to MongoDB.
 * The system defaults to a local instance if no MONGO_URI is provided in a .env file.
 */
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/smartvenue';
        
        // Connect to MongoDB using Mongoose
        const conn = await mongoose.connect(uri, {
            // Mongoose 6+ automatically uses new URL parser and unified topology
            // But we keep this clean without deprecated options
            serverSelectionTimeoutMS: 5000 // Timeout early if no DB is running locally
        });

        console.log(`[Database] MongoDB Connected successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`[Database Error]: Failed to connect to MongoDB.`);
        console.error(`Details: ${error.message}`);
        
        // For a resilient backend, we don't necessarily want to kill the whole UI simulator
        // if DB fails, so we log it but do not process.exit(1) in this prototype mode.
        console.warn(`[System] Running in degraded mode (without persistent storage).`);
    }
};

module.exports = connectDB;
