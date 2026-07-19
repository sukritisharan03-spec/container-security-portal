import { useEffect, useState } from "react";

import OverviewCards from "../components/OverviewCards";
import StatusCard from "../components/StatusCard";
import SecurityCard from "../components/SecurityCard";
import ProjectsTable from "../components/ProjectsTable";
import { endpoints } from "../services/api";

function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [dashboard, setDashboard] = useState(null);
  const [security, setSecurity] = useState(null);
  const [projects, setProjects] = useState([]);
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    fetch(endpoints.overview)
      .then((res) => res.json())
      .then(setOverview);

    fetch(endpoints.dashboard)
      .then((res) => res.json())
      .then(setDashboard);

    fetch(endpoints.security)
      .then((res) => res.json())
      .then(setSecurity);

    fetch(endpoints.projects)
      .then((res) => res.json())
      .then(setProjects);

    fetch(endpoints.activity)
      .then((res) => res.json())
      .then(setActivity);
  }, []);

  if (!overview || !dashboard || !security) {
    return <h2 style={{ padding: "40px" }}>Loading...</h2>;
  }

return (
  <div className="dashboard-page">
    <OverviewCards data={overview} />

    <div className="cards">
      <StatusCard
        title="Harbor Registry"
        status={overview.harbor_status}
      />

      <StatusCard
        title="Kubernetes"
        status={overview.kubernetes_status}
      />

      <StatusCard
        title="Argo CD"
        status={overview.argocd_status}
      />

      <StatusCard
        title="Security Score"
        status={`${overview.security_score}%`}
      />

      <StatusCard
        title="Running Containers"
        status={dashboard.running_containers}
      />

      <StatusCard
        title="Cluster Nodes"
        status={dashboard.cluster_nodes}
      />
    </div>

    <SecurityCard security={security} />

    <ProjectsTable projects={projects} />

    <div className="section">
      <h2>Recent Activity</h2>

      {activity.map((item, index) => (
        <div key={index} className="activity-item">
          <strong>{item.time}</strong> — {item.event}
        </div>
      ))}
    </div>
  </div>
);
}

export default Dashboard;