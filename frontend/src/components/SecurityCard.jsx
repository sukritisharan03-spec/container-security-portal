import {
  ShieldAlert,
  ShieldX,
  Shield,
  ShieldCheck,
} from "lucide-react";

function SecurityCard({ security }) {
  return (
    <div className="security-card">

      <div className="section-header">
        <div>
          <h2>Security Summary</h2>
          <p>Container vulnerability overview</p>
        </div>
      </div>

      <div className="security-grid">

        <div className="security-item critical">
          <ShieldAlert size={34} />
          <h3>Critical</h3>
          <p>{security.critical}</p>
        </div>

        <div className="security-item high">
          <ShieldX size={34} />
          <h3>High</h3>
          <p>{security.high}</p>
        </div>

        <div className="security-item medium">
          <Shield size={34} />
          <h3>Medium</h3>
          <p>{security.medium}</p>
        </div>

        <div className="security-item low">
          <ShieldCheck size={34} />
          <h3>Low</h3>
          <p>{security.low}</p>
        </div>

      </div>

    </div>
  );
}

export default SecurityCard;