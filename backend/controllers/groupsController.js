const pool = require("../config/db");

async function createGroup(req, res, next) {
  try {
    const {
      name,
      description,
      department_id,
      semester_id,
      leader_student_id,
      teacher_ids,
      project_id,
    } = req.body;
    if (!name || !department_id || !semester_id) {
      return res
        .status(400)
        .json({ error: "name, department_id, and semester_id required" });
    }

    const groupResult = await pool.query(
      `INSERT INTO groups (name, description, department_id, semester_id, leader_student_id, project_id)
       VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
      [
        name,
        description || null,
        department_id,
        semester_id,
        leader_student_id || null,
        project_id || null,
      ],
    );

    const group = groupResult.rows[0];

    if (Array.isArray(teacher_ids) && teacher_ids.length) {
      const placeholders = teacher_ids
        .map((_, i) => `($1, $${i + 2})`)
        .join(", ");
      await pool.query(
        `INSERT INTO group_teachers (group_id, teacher_id) VALUES ${placeholders} ON CONFLICT DO NOTHING`,
        [group.id, ...teacher_ids],
      );
    }

    res.status(201).json(group);
  } catch (error) {
    next(error);
  }
}

async function listGroups(req, res, next) {
  try {
    const { department_id, semester_id } = req.query;
    const conditions = [];
    const values = [];

    if (department_id) {
      values.push(department_id);
      conditions.push(`department_id = $${values.length}`);
    }
    if (semester_id) {
      values.push(semester_id);
      conditions.push(`semester_id = $${values.length}`);
    }

    const query = `SELECT * FROM groups ${conditions.length ? "WHERE " + conditions.join(" AND ") : ""} ORDER BY created_at DESC`;
    const { rows } = await pool.query(query, values);
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

async function getGroupById(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM groups WHERE id = $1", [
      id,
    ]);
    if (!rows.length) return res.status(404).json({ error: "Group not found" });
    const group = rows[0];

    const students = (
      await pool.query(
        "SELECT s.* FROM students s JOIN group_students gs ON gs.student_id = s.id WHERE gs.group_id = $1",
        [id],
      )
    ).rows;
    const teachers = (
      await pool.query(
        "SELECT t.* FROM teachers t JOIN group_teachers gt ON gt.teacher_id = t.id WHERE gt.group_id = $1",
        [id],
      )
    ).rows;

    res.json({ ...group, students, teachers });
  } catch (error) {
    next(error);
  }
}

async function updateGroup(req, res, next) {
  try {
    const { id } = req.params;
    const {
      name,
      description,
      department_id,
      semester_id,
      leader_student_id,
      project_id,
      teacher_ids,
      student_ids,
    } = req.body;

    const fields = [];
    const values = [];
    const setFields = {
      name,
      description,
      department_id,
      semester_id,
      leader_student_id,
      project_id,
    };

    Object.entries(setFields).forEach(([k, v]) => {
      if (v !== undefined) {
        values.push(v);
        fields.push(`${k} = $${values.length}`);
      }
    });

    if (fields.length) {
      values.push(id);
      await pool.query(
        `UPDATE groups SET ${fields.join(", ")}, updated_at = NOW() WHERE id = $${values.length}`,
        values,
      );
    }

    if (Array.isArray(student_ids)) {
      await pool.query("DELETE FROM group_students WHERE group_id = $1", [id]);
      for (const student_id of student_ids) {
        await pool.query(
          "INSERT INTO group_students (group_id, student_id) VALUES ($1,$2) ON CONFLICT DO NOTHING",
          [id, student_id],
        );
      }
    }

    if (Array.isArray(teacher_ids)) {
      await pool.query("DELETE FROM group_teachers WHERE group_id = $1", [id]);
      for (const teacher_id of teacher_ids) {
        await pool.query(
          "INSERT INTO group_teachers (group_id, teacher_id) VALUES ($1,$2) ON CONFLICT DO NOTHING",
          [id, teacher_id],
        );
      }
    }

    const updated = (
      await pool.query("SELECT * FROM groups WHERE id = $1", [id])
    ).rows[0];
    res.json(updated);
  } catch (error) {
    next(error);
  }
}

async function deleteGroup(req, res, next) {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query("DELETE FROM groups WHERE id = $1", [
      id,
    ]);
    if (!rowCount) return res.status(404).json({ error: "Group not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  createGroup,
  listGroups,
  getGroupById,
  updateGroup,
  deleteGroup,
};
