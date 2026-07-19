import { useEffect, useState } from "react";

function Compliance() {
  const [checks, setChecks] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/compliance")
      .then((res) => res.json())
      .then((data) => setChecks(data.checks || []))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="page">
      <h1>Compliance Checks</h1>

      <h3>Total Checks: {checks.length}</h3>

      <table>
        <thead>
          <tr>
            <th>Deployment</th>
            <th>Namespace</th>
            <th>Replicas</th>
            <th>Compliance</th>
          </tr>
        </thead>

        <tbody>
          {checks.map((item, index) => (
            <tr key={index}>
              <td>{item.deployment}</td>
              <td>{item.namespace}</td>
              <td>{item.replicas}</td>
              <td>{item.compliance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Compliance;
