import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Header from '../components/Header';
import Footer from '../components/Footer';
import styled from 'styled-components';

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  width: 100%;
  padding: 20px;
`;

const UserLayout = () => {
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

export default UserLayout; 