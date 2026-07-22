import { Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/Dashboard/Dashboard";

import BannerList from "../pages/Banner/BannerList";

import CategoryList from "../pages/Categories/CategoryList";

import ShapeList from "../pages/Shapes/ShapeList";

import ProductList from "../pages/Products/ProductList";

import OrderList from "../pages/Orders/OrderList";

import CustomerList from "../pages/Customers/CustomerList";

import GeneralSettings from "../pages/Settings/GeneralSettings";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>

        {/* Redirect /admin -> /admin/dashboard */}
        <Route index element={<Navigate to="dashboard" replace />} />

        <Route path="dashboard" element={<Dashboard />} />

        <Route path="banners" element={<BannerList />} />

        <Route path="products" element={<ProductList />} />

        <Route path="categories" element={<CategoryList />} />

        <Route path="shapes" element={<ShapeList />} />

        <Route path="orders" element={<OrderList />} />

        <Route path="customers" element={<CustomerList />} />

        <Route
          path="settings/general"
          element={<GeneralSettings />}
        />

      </Route>
    </Routes>
  );
};

export default AdminRoutes;