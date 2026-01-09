// src/components/Project/ProjectList.jsx
import { useEffect, useState } from "react";
import api from "../api/api";

export default function ProjectList({ selectProject }) {
  const [projects, setProjects] = useState([]);

  const fetchProjects = async () => {
    try {
      const res = await api.get("/projects");
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl mb-2">My Projects</h2>
      <ul>
        {projects.map((p) => (
          <li
            key={p._id}
            className="p-2 border rounded mb-2 cursor-pointer hover:bg-gray-100"
            onClick={() => selectProject(p)}
          >
            {p.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
