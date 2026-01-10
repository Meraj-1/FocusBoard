import TaskList from "../Task/TaskList";

export default function ProjectDetail({ project }) {
  return (
    <div className="h-full flex flex-col">
      <h2 className="text-xl mb-4">{project.name}</h2>
      <TaskList projectId={project._id} />
    </div>
  );
}
