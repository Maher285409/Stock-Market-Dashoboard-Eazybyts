import { Search } from "lucide-react";

function Topbar() {
  return (
    <div className="topbar">

      {/* SEARCH */}
      <div className="search-box">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search stocks..." />
      </div>

      {/* PROFILE */}
      <div className="profile">
        👤
      </div>

    </div>
  );
}

export default Topbar;