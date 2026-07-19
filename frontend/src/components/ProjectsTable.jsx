import { FolderKanban, CheckCircle2, Package } from "lucide-react";

function ProjectsTable({ projects }) {
  return (
    <div className="section">

      <div className="section-title">
        <FolderKanban size={24} />
        <h2>Container Projects</h2>
      </div>

      <table className="project-table">
        <thead>
          <tr>
            <th>Project</th>
            <th>Status</th>
            <th>Container Image</th>
            <th>Registry</th>
          </tr>
        </thead>

        <tbody>

          {projects.map((project, index) => (

            <tr key={index}>

              <td>
                <strong>{project.name}</strong>
              </td>

              <td>
                <span className="project-status">
                  <CheckCircle2 size={16} />
                  {project.status}
                </span>
              </td>

              <td>
                <span className="image-name">
                  <Package size={16} />
                  {project.image}
                </span>
              </td>

              <td>{project.registry}</td>

            </tr>

          ))}

        </tbody>
      </table>

    </div>
  );
}

export default ProjectsTable;