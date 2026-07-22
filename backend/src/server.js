import app from "./app.js";
import connectDB from "./config/database.js";
// import { configDotenv } from "dotenv";
connectDB()
const PORT=process.env.PORT||5000
app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})