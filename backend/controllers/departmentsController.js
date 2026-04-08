const pool = require("../config/db");

async function createDepartment(req, res, next) {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: "name required" });
    const { rows } = await pool.query(
      "INSERT INTO departments (name, description) VALUES ($1,$2) RETURNING *",
      [name, description || null],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === "23505")
      return res.status(409).json({ error: "Department exists" });
    next(err);
  }
}

async function listDepartments(req, res, next) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM departments ORDER BY name",
    );
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function updateDepartment(req, res, next) {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    const { rows } = await pool.query(
      "UPDATE departments SET name = COALESCE($1,name), description = COALESCE($2,description) WHERE id = $3 RETURNING *",
      [name, description, id],
    );
    if (!rows.length)
      return res.status(404).json({ error: "Department not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function deleteDepartment(req, res, next) {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(
      "DELETE FROM departments WHERE id = $1",
      [id],
    );
    if (!rowCount)
      return res.status(404).json({ error: "Department not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createDepartment,
  listDepartments,
  updateDepartment,
  deleteDepartment,
};
