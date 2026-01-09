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

