import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Outlet } from 'react-router-dom';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding-bottom: 80px; // 커진 푸터 높이에 맞게 패딩 조정
`;

const MainLayout = () => {
  return (
    <LayoutContainer>
      <Header />
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
      <Footer />
    </LayoutContainer>
  );
};

export default MainLayout; 