import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
          <Route path="admin" element={<AdminPage />} />
          <Route path="admin/installation" element={<InstallationManage />} />
          <Route path="admin/notice" element={<NoticeManage />} />
          <Route path="admin/questions" element={<QuestionsManage />} />
        </Route>
        <Route path="/admin/login" element={<AdminLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter; 