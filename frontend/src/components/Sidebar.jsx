import {
  Shield,
  LayoutDashboard,
  Package,
  Boxes,
  CheckCircle2,
  TriangleAlert,
} from "lucide-react";

import { NavLink } from "react-router-dom";


function Sidebar() {
  return (
    <aside className="sidebar">

      <div className="logo">

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "8px",
          }}
        >
          <Shield size={28} color="#60A5FA" />

          <h2>Container Security</h2>
        </div>

        <p>Security & Compliance</p>

      </div>


      <nav>
        <ul>

          <li>
            <NavLink to="/">
              <LayoutDashboard size={18} />
              <span>Dashboard</span>
            </NavLink>
          </li>


          <li>
            <NavLink to="/images">
              <Package size={18} />
              <span>Container Images</span>
            </NavLink>
          </li>


          <li>
            <NavLink to="/deployments">
              <Boxes size={18} />
              <span>Deployment Status</span>
            </NavLink>
          </li>


          <li>
            <NavLink to="/compliance">
              <CheckCircle2 size={18} />
              <span>Compliance Checks</span>
            </NavLink>
          </li>


          <li>
            <NavLink to="/alerts">
              <TriangleAlert size={18} />
              <span>Critical Alerts</span>
            </NavLink>
          </li>


        </ul>
      </nav>


    </aside>
  );
}


export default Sidebar;