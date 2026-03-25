const pool = require("../config/db");

async function createSemester(req, res, next) {
  try {
    const { department_id, name, sequence } = req.body;
    if (!department_id || !name || sequence === undefined) {
      return res
        .status(400)
        .json({ error: "department_id, name, sequence required" });
    }
    const { rows } = await pool.query(
      "INSERT INTO semesters (department_id, name, sequence) VALUES ($1,$2,$3) RETURNING *",
      [department_id, name, sequence],
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    if (err.code === "23505")
      return res
        .status(409)
        .json({ error: "Semester already exists for department" });
    next(err);
  }
}

async function listSemesters(req, res, next) {
  try {
    const { department_id } = req.query;
    let query = "SELECT * FROM semesters";
    const params = [];
    if (department_id) {
      params.push(department_id);
      query += " WHERE department_id = $1";
    }
    query += " ORDER BY department_id, sequence";
    const { rows } = await pool.query(query, params);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function updateSemester(req, res, next) {
  try {
    const { id } = req.params;
    const { name, sequence } = req.body;
    const { rows } = await pool.query(
      "UPDATE semesters SET name = COALESCE($1,name), sequence = COALESCE($2,sequence) WHERE id = $3 RETURNING *",
      [name, sequence, id],
    );
    if (!rows.length)
      return res.status(404).json({ error: "Semester not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function deleteSemester(req, res, next) {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(
      "DELETE FROM semesters WHERE id = $1",
      [id],
    );
    if (!rowCount) return res.status(404).json({ error: "Semester not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createSemester,
  listSemesters,
  updateSemester,
  deleteSemester,
};
