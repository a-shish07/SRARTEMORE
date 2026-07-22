import { NavLink, useNavigate } from "react-router-dom";

import {
  FaTachometerAlt,
  FaBoxOpen,
  FaTags,
  FaShapes,
  FaShoppingCart,
  FaUsers,
  FaUserShield,
  FaCog,
  FaSignOutAlt,
  FaRulerCombined,
} from "react-icons/fa";

import "../styles/admin-sidebar.css";
import { FaImages } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");

    navigate("/admin/login");
  };

  return (
    <aside className="admin-sidebar">

      <div className="sidebar-logo">
        <h2>SR ARTÉMORE</h2>
        <span>Admin Panel</span>
      </div>

      <nav className="sidebar-menu">

        <NavLink to="/admin/dashboard" className="sidebar-link">
          <FaTachometerAlt />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/admin/banners" className="sidebar-link">
          <FaImages />
          <span>Hero Banner</span>
        </NavLink>

        <NavLink to="/admin/products" className="sidebar-link">
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>

        <NavLink to="/admin/categories" className="sidebar-link">
          <FaTags />
          <span>Categories</span>
        </NavLink>

        <NavLink to="/admin/shapes" className="sidebar-link">
          <FaShapes />
          <span>Shapes</span>
        </NavLink>

        <NavLink to="/admin/sizes" className="sidebar-link">
          <FaRulerCombined />
          <span>Sizes</span>
        </NavLink>

        <NavLink to="/admin/orders" className="sidebar-link">
          <FaShoppingCart />
          <span>Orders</span>
        </NavLink>

        <NavLink to="/admin/customers" className="sidebar-link">
          <FaUsers />
          <span>Customers</span>
        </NavLink>

        <NavLink to="/admin/users" className="sidebar-link">
          <FaUserShield />
          <span>Users</span>
        </NavLink>

        <NavLink to="/admin/settings" className="sidebar-link">
          <FaCog />
          <span>Settings</span>
        </NavLink>

      </nav>

      <button className="logout-btn" onClick={logout}>
        <FaSignOutAlt />
        <span>Logout</span>
      </button>

    </aside>
  );
};

export default Sidebar;