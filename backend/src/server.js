import dns from "dns";
// Override DNS servers early (useful for MongoDB Atlas connection issues on certain cloud environments)
dns.setServers(["8.8.8.8", "8.8.4.4"]);

import app from "./app.js";
import connectDB from "./config/database.js";

const PORT = process.env.PORT || 5000;

// Connect to Database first, then start listening for HTTP traffic
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ Failed to connect to Database:", error.message);
    process.exit(1); // Exit process with failure if DB connection fails
  }
};

startServer();