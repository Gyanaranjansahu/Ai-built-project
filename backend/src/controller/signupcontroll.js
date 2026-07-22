import connect from "../schema/model.js";
import bcrypt from "bcrypt";

export default async function add(req, res) {
  let { name, email, password } = req.body;

  // 1. Basic empty field check
  if (!name || !email || !password) {
    return res.status(400).json({
      text: "All fields are required"
    });
  }

  try {
    // 2. Check if user already exists
    let exist = await connect.findOne({
      $or: [{ name }, { email }]
    });

    if (exist) {
      return res.status(409).json({
        // 409 Conflict is better suited for duplicate users than 401 Unauthorized
        text: "User already exists",
        name,
        email
      });
    }

    // 3. Hash password
    let hashpass = await bcrypt.hash(password, 10);

    // 4. Create user inside database
    let create = await connect.create({
      name,
      email,
      password: hashpass
    });

    return res.status(201).json({
      text: "Signup successfully",
      user: {
        id: create._id,
        name: create.name,
        email: create.email
        // Note: Never return the password (hashed or raw) in the response!
      }
    });

  } catch (error) {
    // Catch Mongoose Validation Errors (e.g. minlength, pattern match)
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        text: "Validation Error",
        errors: messages
      });
    }

    // Catch MongoDB Duplicate Key Error (Code 11000) for unique constraints
    if (error.code === 11000) {
      return res.status(409).json({
        text: "Duplicate key error: field already exists"
      });
    }

    // Generic server error for anything unexpected
    console.error("Error creating user:", error);
    return res.status(500).json({
      text: "Internal server error"
    });
  }
}