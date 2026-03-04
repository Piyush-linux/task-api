import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const { rows } = await pool.query(
    "INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING id,email",
    [name, email, hashedPassword],
  );

  res.status(201).json({
    message: "User created",
    user: rows[0],
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const { rows } = await pool.query(
    "SELECT id,email,password FROM users WHERE email=$1",
    [email],
  );

  if (rows.length === 0) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const user = rows[0];

  const validPassword = await bcrypt.compare(password, user.password);

  if (!validPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  res.json({
    message: "Login successful",
    token,
  });
};
