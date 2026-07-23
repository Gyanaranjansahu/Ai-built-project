import connect from "../schema/model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookies from "cookies"
export default async function verify(req, res) {
  const { email, password } = req.body;

  // 1. Missing fields
  if (!email || !password) {
    return res.status(400).json({ text: "Email and password are required" });
  }

  try {
    // 2. Find user
    const user = await connect.findOne({ email });
    if (!user) {
      return res.status(400).json({ text: "User does not exist" });
    }

    // 3. Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ text: "Wrong password" });
    }

    // 4. Token & Cookie
    const token = jwt.sign({ id: user._id , email:user.email}, process.env.SECRET_KEY);
    res.cookies("token", token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
let cooks=req.cookies.token
console.log(cooks + "is ");

    return res.status(200).json({
      text: "Login successful",
      token,
      user: { id: user._id, name: user.name, email: user.email },
      cookie:cooks
    });

  } catch (error) {
    return res.status(500).json({ text: "Server error" });
  }
}