import { useEffect, useState } from "react";
import api from "../api/api";
import ProjectForm from "./ProjectForm";

export default function ProjectList({ select }) {
  const [projects, setProjects] = useState([]);

  const load = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="space-y-3">
      <ProjectForm refresh={load} />

      {projects.map(project => (
        <div
          key={project._id}
          onClick={() => select(project)}
          className="cursor-pointer px-3 py-2 rounded border border-zinc-800 hover:bg-zinc-900"
        >
          {project.name}
        </div>
      ))}
    </div>
  );
}
