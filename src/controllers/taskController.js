import pool from "../config/db.js";

export const createTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  const userId = req.user.userId;

  const { rows } = await pool.query(
    `INSERT INTO tasks (title, description, status, due_date, user_id)
     VALUES ($1,$2,$3,$4,$5)
     RETURNING *`,
    [title, description, status, dueDate, userId],
  );

  res.status(201).json(rows[0]);
};

export const getTasks = async (req, res) => {
  const userId = req.user.userId;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `SELECT *
     FROM tasks
     WHERE user_id=$1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset],
  );

  res.json(rows);
};

export const getTaskById = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  const { rows } = await pool.query(
    // SELECT task_id, title, description, status, due_date, created_at
    `SELECT id, title, description, status, due_date, created_at
     FROM tasks
     WHERE id=$1 AND user_id=$2`,
    [taskId, userId],
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(rows[0]);
};

export const updateTask = async (req, res) => {
  const { title, description, status, dueDate } = req.body;

  const taskId = req.params.id;
  const userId = req.user.userId;

  const { rows } = await pool.query(
    `UPDATE tasks
     SET title=$1,
         description=$2,
         status=$3,
         due_date=$4,
         updated_at=NOW()
     WHERE id=$5 AND user_id=$6
     RETURNING *`,
    [title, description, status, dueDate, taskId, userId],
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json(rows[0]);
};

export const deleteTask = async (req, res) => {
  const taskId = req.params.id;
  const userId = req.user.userId;

  const { rowCount } = await pool.query(
    `DELETE FROM tasks
     WHERE id=$1 AND user_id=$2`,
    [taskId, userId],
  );

  if (rowCount === 0) {
    return res.status(404).json({ error: "Task not found" });
  }

  res.json({ message: "Task deleted" });
};
