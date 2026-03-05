import pool from "../config/db.js";
export const createTask = async (req, res) => {
  const { title, description, status } = req.body;

  const userId = req.user.userId;

  const { rows } = await pool.query(
    `INSERT INTO tasks (title, description, status, user_id)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [title, description, status, userId],
  );
  const task = rows[0];

  res.status(201).json({
    meta: {
      success: true,
      message: "Task created successfully",
    },
    data: task,
  });
};

export const getTasks = async (req, res) => {
  const userId = req.user.userId;

  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  const offset = (page - 1) * limit;

  const { rows } = await pool.query(
    `SELECT id, title, description, status, created_at
     FROM tasks
     WHERE user_id=$1
     ORDER BY created_at DESC
     LIMIT $2 OFFSET $3`,
    [userId, limit, offset],
  );

  res.json({
    meta: {
      success: true,
      page,
      limit,
      count: rows.length,
    },
    data: rows,
  });
};

export const getTaskById = async (req, res) => {
  const userId = req.user.userId;
  const taskId = req.params.id;

  const { rows } = await pool.query(
    // SELECT task_id, title, description, status, due_date, created_at
    `SELECT id, title, description, status, created_at
     FROM tasks
     WHERE id=$1 AND user_id=$2`,
    [taskId, userId],
  );

  if (rows.length === 0) {
    return res.status(404).json({ error: "Task not found" });
  }
  const task = rows[0];

  res.json({
    meta: {
      success: true,
      message: "Task fetched successfully",
    },
    data: task,
  });
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
         updated_at=NOW()
     WHERE id=$4 AND user_id=$5
     RETURNING *`,
    [title, description, status, taskId, userId],
  );

  const task = rows[0];

  if (!task) {
    return res.status(404).json({
      meta: {
        success: false,
        message: "Task not found",
      },
    });
  }

  res.json({
    meta: {
      success: true,
      message: "Task updated successfully",
    },
    data: task,
  });
};

export const deleteTask = async (req, res) => {
  const taskId = Number(req.params.id);
  const userId = req.user.userId;

  const { rowCount } = await pool.query(
    `DELETE FROM tasks
     WHERE id=$1 AND user_id=$2`,
    [taskId, userId],
  );

  if (rowCount === 0) {
    return res.status(404).json({
      meta: {
        success: false,
        message: "Task not found",
      },
    });
  }

  res.json({
    meta: {
      success: true,
      message: "Task deleted successfully",
    },
  });
};
