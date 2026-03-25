const pool = require("../config/db");

async function dashboard(req, res, next) {
  try {
    const totalProjects = (await pool.query("SELECT COUNT(*) FROM projects"))
      .rows[0].count;
    const statusRows = await pool.query(
      "SELECT status, COUNT(*) as count FROM projects GROUP BY status ORDER BY status",
    );
    const newsCount = (await pool.query("SELECT COUNT(*) FROM news")).rows[0]
      .count;
    const groupsCount = (await pool.query("SELECT COUNT(*) FROM groups"))
      .rows[0].count;

    const projectsByDept = await pool.query(
      `SELECT d.id, d.name, COUNT(p.id) AS count FROM departments d LEFT JOIN projects p ON p.department_id = d.id GROUP BY d.id,d.name ORDER BY d.name`,
    );

    const projectsBySemester = await pool.query(
      `SELECT s.id, s.name, COUNT(p.id) AS count FROM semesters s LEFT JOIN projects p ON p.semester_id = s.id GROUP BY s.id,s.name ORDER BY s.sequence`,
    );

    res.json({
      totalProjects: Number(totalProjects),
      statusBreakdown: statusRows.rows,
      totalNews: Number(newsCount),
      totalGroups: Number(groupsCount),
      projectsByDepartment: projectsByDept.rows,
      projectsBySemester: projectsBySemester.rows,
    });
  } catch (error) {
    next(error);
  }
}

module.exports = { dashboard };
