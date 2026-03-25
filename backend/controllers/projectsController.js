const pool = require("../config/db");

const allowedStatuses = ["Ongoing", "Completed", "Pending"];

async function createProject(req, res, next) {
  try {
    const {
      title,
      description,
      department_id,
      semester_id,
      status,
      start_date,
      end_date,
      progress,
    } = req.body;
    if (!title || !description)
      return res.status(400).json({ error: "title + description required" });

    const projectStatus =
      status && allowedStatuses.includes(status) ? status : "Pending";

    const result = await pool.query(
      `INSERT INTO projects (title, description, department_id, semester_id, status, start_date, end_date, progress)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,
      [
        title,
        description,
        department_id || null,
        semester_id || null,
        projectStatus,
        start_date || null,
        end_date || null,
        progress || 0,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    next(err);
  }
}

async function getProjects(req, res, next) {
  try {
    const { status, department_id, semester_id, search } = req.query;
    const conditions = [];
    const values = [];

    if (status) {
      values.push(status);
      conditions.push(`status = $${values.length}`);
    }
    if (department_id) {
      values.push(department_id);
      conditions.push(`department_id = $${values.length}`);
    }
    if (semester_id) {
      values.push(semester_id);
      conditions.push(`semester_id = $${values.length}`);
    }
    if (search) {
      values.push(`%${search}%`);
      conditions.push(
        `(title ILIKE $${values.length} OR description ILIKE $${values.length})`,
      );
    }

    const query = `SELECT * FROM projects ${conditions.length ? "WHERE " + conditions.join(" AND ") : ""} ORDER BY created_at DESC`;
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (err) {
    next(err);
  }
}

async function getProjectById(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM projects WHERE id = $1", [
      id,
    ]);
    if (!rows.length)
      return res.status(404).json({ error: "Project not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function updateProject(req, res, next) {
  try {
    const { id } = req.params;
    const updates = req.body;

    const fields = [];
    const values = [];
    Object.entries(updates).forEach(([key, value]) => {
      if (
        [
          "title",
          "description",
          "department_id",
          "semester_id",
          "status",
          "start_date",
          "end_date",
          "progress",
        ].includes(key)
      ) {
        fields.push(`${key} = $${values.length + 1}`);
        values.push(value);
      }
    });

    if (!fields.length)
      return res.status(400).json({ error: "No valid fields to update" });

    values.push(id);
    const query = `UPDATE projects SET ${fields.join(", ")}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`;
    const { rows } = await pool.query(query, values);
    if (!rows.length)
      return res.status(404).json({ error: "Project not found" });
    res.json(rows[0]);
  } catch (err) {
    next(err);
  }
}

async function deleteProject(req, res, next) {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query(
      "DELETE FROM projects WHERE id = $1",
      [id],
    );
    if (!rowCount) return res.status(404).json({ error: "Project not found" });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
