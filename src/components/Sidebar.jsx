import { Home, BarChart2, PieChart, Settings } from "lucide-react";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="logo">Stock Market Dashboard</h2>

      <ul>
        <li><Home size={18}/> Dashboard</li>
        <li><BarChart2 size={18}/> Active Stocks</li>
        <li><PieChart size={18}/> Portfolio</li>
        <li><Settings size={18}/> Settings</li>
      </ul>

      <div className="sidebar-footer">
        <p>👤 User</p>
        <small>Investor Mode</small>
      </div>
    </div>
  );
}

export default Sidebar;