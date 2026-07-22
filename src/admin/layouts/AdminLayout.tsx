import { Outlet } from "react-router-dom";

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import "../styles/admin-layout.css";

const AdminLayout = () => {
  return (
    <div className="admin-layout">

      <Sidebar />

      <div className="admin-main">

        <Header />

        <main className="admin-content">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;