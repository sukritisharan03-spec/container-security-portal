import { useEffect, useState } from "react";

function Deployments() {
  const [deployments, setDeployments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/deployments")
      .then((res) => res.json())
      .then((data) => {
        setDeployments(data.deployments || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="page">
      <h1>Deployment Status</h1>

      <h3>Total Deployments: {deployments.length}</h3>

      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Namespace</th>
            <th>Ready</th>
            <th>Available</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {deployments.map((deployment, index) => (
            <tr key={index}>
              <td>{deployment.name}</td>
              <td>{deployment.namespace}</td>
              <td>{deployment.ready}</td>
              <td>{deployment.available}</td>
              <td>{deployment.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Deployments;