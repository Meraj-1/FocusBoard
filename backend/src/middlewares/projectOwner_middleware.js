import Project from "../models/project_model.js";

export const projectOwnerOnly = async (req, res, next) => {
  const project = await Project.findOne({
    _id: req.params.projectId,
    owner: req.user._id
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found or access denied" });
  }

  req.project = project;
  next();
};
