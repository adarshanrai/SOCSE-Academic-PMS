const pool = require("../config/db");

async function createNews(req, res, next) {
  try {
    const { title, description, image_url, published_at } = req.body;
    if (!title || !description)
      return res.status(400).json({ error: "title + description required" });

    const result = await pool.query(
      "INSERT INTO news (title, description, image_url, published_at) VALUES ($1,$2,$3,$4) RETURNING *",
      [title, description, image_url || null, published_at || new Date()],
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
}

async function getNews(req, res, next) {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM news ORDER BY published_at DESC",
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

async function getNewsById(req, res, next) {
  try {
    const { id } = req.params;
    const { rows } = await pool.query("SELECT * FROM news WHERE id = $1", [id]);
    if (!rows.length) return res.status(404).json({ error: "News not found" });
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

async function updateNews(req, res, next) {
  try {
    const { id } = req.params;
    const { title, description, image_url, published_at } = req.body;
    const { rows } = await pool.query(
      `UPDATE news SET title = COALESCE($1,title), description = COALESCE($2,description), image_url = COALESCE($3,image_url), published_at = COALESCE($4,published_at), updated_at = NOW() WHERE id = $5 RETURNING *`,
      [title, description, image_url, published_at, id],
    );
    if (!rows.length) return res.status(404).json({ error: "News not found" });
    res.json(rows[0]);
  } catch (error) {
    next(error);
  }
}

async function deleteNews(req, res, next) {
  try {
    const { id } = req.params;
    const { rowCount } = await pool.query("DELETE FROM news WHERE id = $1", [
      id,
    ]);
    if (!rowCount) return res.status(404).json({ error: "News not found" });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
}

module.exports = { createNews, getNews, getNewsById, updateNews, deleteNews };
