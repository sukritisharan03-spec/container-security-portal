import {
  ShieldCheck,
  FolderKanban,
  Boxes,
  GitBranch,
} from "lucide-react";

function OverviewCards({ data }) {
  return (
    <div className="overview-cards">

      <div className="overview-card">
        <ShieldCheck className="overview-icon" size={34} />
        <h3>Security Score</h3>
        <h1>{data.security_score}%</h1>
      </div>

      <div className="overview-card">
        <FolderKanban className="overview-icon" size={34} />
        <h3>Harbor Projects</h3>
        <h1>{data.total_projects}</h1>
      </div>

      <div className="overview-card">
        <Boxes className="overview-icon" size={34} />
        <h3>Kubernetes</h3>
        <h1>{data.kubernetes_status}</h1>
      </div>

      <div className="overview-card">
        <GitBranch className="overview-icon" size={34} />
        <h3>Argo CD</h3>
        <h1>{data.argocd_status}</h1>
      </div>

    </div>
  );
}

export default OverviewCards;