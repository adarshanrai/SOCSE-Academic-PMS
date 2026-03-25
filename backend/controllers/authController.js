const pool = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "email and password required" });
  }

  try {
    const { rows } = await pool.query("SELECT * FROM admins WHERE email = $1", [
      email.toLowerCase(),
    ]);
    const admin = rows[0];
    if (!admin) return res.status(401).json({ error: "Invalid credentials" });

    const validPassword = await bcrypt.compare(password, admin.password_hash);
    if (!validPassword)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin.id, email: admin.email, role: admin.role },
      process.env.JWT_SECRET || "supersecret",
      {
        expiresIn: "8h",
      },
    );

    return res.json({
      token,
      admin: {
        id: admin.id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (err) {
    next(err);
  }
};

const register = async (req, res, next) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: "name, email and password required" });
  }

  try {
    const password_hash = await bcrypt.hash(password, 12);

    const { rows } = await pool.query(
      "INSERT INTO admins (name, email, password_hash, role) VALUES ($1,$2,$3,$4) RETURNING id,name,email,role",
      [name, email.toLowerCase(), password_hash, role || "admin"],
    );

    res.status(201).json({ admin: rows[0] });
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "Email already exists" });
    next(err);
  }
};

module.exports = { login, register };
