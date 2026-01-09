import Task from "../models/task_model.js"

export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    projectId: req.project._id
  });
  res.json(tasks);
};


export const createTask = async (req, res) => {
  const task = await Task.create({
    title: req.body.title,
    projectId: req.project._id
  });
  res.status(201).json(task);
};


export const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    {
      _id: req.params.taskId
    },
    req.body,
    { new: true }
  );

  res.json(task);
};


export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.taskId);
  res.json({ message: "Task deleted" });
};
