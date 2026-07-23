import app from "./app.js";
import connectDB from "./config/database.js";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);
// import { configDotenv } from "dotenv";
connectDB()
const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})