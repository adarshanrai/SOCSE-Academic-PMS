const pool = require("../config/db");

async function getSettings(req, res, next) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM settings ORDER BY id LIMIT 1",
    );
    if (!rows.length) return res.json({});
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

async function updateSettings(req, res, next) {
  try {
    const { college_name, logo_url, contact_email, contact_phone } = req.body;
    let row = (await pool.query("SELECT * FROM settings ORDER BY id LIMIT 1"))
      .rows[0];

    if (!row) {
      const created = (
        await pool.query(
          "INSERT INTO settings (college_name, logo_url, contact_email, contact_phone) VALUES ($1,$2,$3,$4) RETURNING *",
          [
            college_name || "SOCSE Academic PMS",
            logo_url || null,
            contact_email || null,
            contact_phone || null,
          ],
        )
      ).rows[0];
      return res.json(created);
    }

    const { rows } = await pool.query(
      `UPDATE settings SET college_name = COALESCE($1,college_name), logo_url = COALESCE($2,logo_url), contact_email = COALESCE($3,contact_email), contact_phone = COALESCE($4,contact_phone), updated_at = NOW() WHERE id = $5 RETURNING *`,
      [college_name, logo_url, contact_email, contact_phone, row.id],
    );
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = { getSettings, updateSettings };
