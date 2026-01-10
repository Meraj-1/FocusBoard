import Project from "../models/project_model.js"


export const createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      owner: req.user._id
    });
    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user._id });
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const editProject = async (req, res) => {
  try {
    const project = await Project.findOneAndUpdate(
      { _id: req.params.projectId, owner: req.user._id },
      req.body,
      { new: true }
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProject = async (req, res) => {
  try {
    const project = await Project.findOneAndDelete({
      _id: req.params.projectId,
      owner: req.user._id,
    });
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json({ message: "Project deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};