import { Routes, Route, Navigate } from "react-router-dom";

//layout
import Layout from "./Layouts/Layout";

//pages
import HomePage from "./pages/HomePage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route path="/user-profile" element={<span>USER PROFILE PAGE</span>} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
