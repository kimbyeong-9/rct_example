import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import MainPage from '../pages/user/MainPage';
import Installation from '../pages/user/Installation';
import InstallationDetail from '../pages/user/InstallationDetail';
import Questions from '../pages/user/Questions';
import WorkGuide from '../pages/user/WorkGuide';
import Notice from '../pages/user/Notice';
import Estimate from '../pages/user/Estimate';
import Company from '../pages/Company';
import AdminPage from '../pages/admin/AdminPage';
import InstallationManage from '../pages/admin/InstallationManage';
import NoticeManage from '../pages/admin/NoticeManage';
import QuestionsManage from '../pages/admin/QuestionsManage';
import AdminLogin from '../pages/admin/AdminLogin';
import CredentialsReset from '../pages/admin/CredentialsReset';
import EmailVerification from '../pages/admin/EmailVerification';
import EstimateManage from "../pages/admin/EstimateManage";

// 관리자 인증 확인용 PrivateRoute 컴포넌트
const PrivateRoute = ({ element }) => {
  const isAuthenticated = sessionStorage.getItem('isAdminLoggedIn') === 'true';
  return isAuthenticated ? element : <Navigate to="/admin/login" replace />;
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<MainPage />} />
          <Route path="installation" element={<Installation />} />
          <Route path="installation/:category/:subcategory" element={<InstallationDetail />} />
          <Route path="company" element={<Company />} />
          <Route path="work-guide" element={<WorkGuide />} />
          <Route path="questions" element={<Questions />} />
          <Route path="notice" element={<Notice />} />
          <Route path="estimate" element={<Estimate />} />
          
          {/* 관리자 페이지 라우트는 PrivateRoute를 통해 인증 체크 */}
          <Route path="admin" element={<PrivateRoute element={<AdminPage />} />} />
          <Route path="admin/installation" element={<PrivateRoute element={<InstallationManage />} />} />
          <Route path="admin/notice" element={<PrivateRoute element={<NoticeManage />} />} />
          <Route path="admin/questions" element={<PrivateRoute element={<QuestionsManage />} />} />
          <Route path="admin/EstimateManage" element={<PrivateRoute element={<EstimateManage />} />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/reset-credentials" element={<CredentialsReset />} />
        <Route path="/admin/direct-password-change" element={<CredentialsReset />} />
        <Route path="/admin/verify-email" element={<EmailVerification />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter; 