import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import UserLayout from '../layouts/UserLayout';
import AdminLayout from '../layouts/AdminLayout';
import MainPage from '../pages/user/MainPage';
import CompanyPage from '../pages/user/CompanyPage';
import WorkGuide from '../pages/user/WorkGuide';
import Installation from '../pages/user/Installation';
import InstallationDetail from '../pages/user/InstallationDetail';
import Notice from '../pages/user/Notice';
import Estimate from '../pages/user/Estimate';
import AdminLogin from '../pages/admin/AdminLogin';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Routes */}
        <Route element={<UserLayout />}>
          <Route path="/home" element={<MainPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/work-guide" element={<WorkGuide />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="/installation/:category/:subcategory" element={<InstallationDetail />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/estimate" element={<Estimate />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminLogin />} />
        </Route>

        {/* Redirect to home page if route not found or root path */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router; 