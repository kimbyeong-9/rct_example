import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContainer = styled.header`
  background-color: #2A8191;
  background-image: linear-gradient(90deg, rgba(52, 192, 181, 0.1) 50%, transparent 50%);
  background-size: 20px 20px;
  padding: 10px 0 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: 60px;
  display: flex;
  align-items: flex-start;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding-top: 5px;
`;

const LogoContainer = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  margin-top: -5px;
`;

const LogoSvgContainer = styled.div`
  width: 65px;
  height: 65px;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LogoText = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
`;

const MenuBox = styled.div`
  width: 100%;
  background-color: rgba(255, 255, 255, 0.95);
  padding: 10px 0;
  display: flex;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 60px;
  left: 0;
  z-index: 999;
  border-bottom: 3px solid #34C0B5;
`;

const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover {
    background-color: rgba(42, 129, 145, 0.1);
    color: #2A8191;
  }
`;

const AdminNavLink = styled(NavLink)`
  color: #2A8191;
  font-weight: 700;
  border: 1px solid #2A8191;
  
  &:hover {
    background-color: #2A8191;
    color: white;
  }
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <LogoContainer to="/">
          <LogoSvgContainer>
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* 메인 J자 */}
              <path d="M18 10C18 10 32 10 32 10C36 10 38 12 38 16V38C38 42 36 44 32 44H26" 
                stroke="white" strokeWidth="6" strokeLinecap="round"/>
              <path d="M24 30V44" 
                stroke="white" strokeWidth="6" strokeLinecap="round"/>
              
              {/* 덕트/파이프 요소 */}
              <path d="M10 8L16 8" stroke="#34C0B5" strokeWidth="3" strokeLinecap="round"/>
              <path d="M16 8L16 13" stroke="#34C0B5" strokeWidth="3" strokeLinecap="round"/>
              <path d="M13 13L19 13" stroke="#34C0B5" strokeWidth="3" strokeLinecap="round"/>
              <circle cx="12" cy="18" r="2" fill="#34C0B5"/>
              <circle cx="19" cy="16" r="2" fill="#34C0B5"/>
              
              {/* 그라데이션 정의 */}
              <defs>
                <linearGradient id="gradient1" x1="10" y1="10" x2="38" y2="44" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#2A8191"/>
                  <stop offset="100%" stopColor="#34C0B5"/>
                </linearGradient>
                <linearGradient id="gradient2" x1="10" y1="8" x2="20" y2="20" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#34C0B5"/>
                  <stop offset="100%" stopColor="#2A8191"/>
                </linearGradient>
              </defs>
            </svg>
          </LogoSvgContainer>
          <LogoText>진우ENG</LogoText>
        </LogoContainer>
      </HeaderContent>
      <MenuBox>
        <Nav>
          <NavLink to="/">HOME</NavLink>
          <NavLink to="/company">업체소개</NavLink>
          <NavLink to="/work-guide">업무안내</NavLink>
          <NavLink to="/installation">설치시공</NavLink>
          <NavLink to="/notice">공지사항</NavLink>
          <NavLink to="/estimate">견적문의</NavLink>
          <AdminNavLink to="/admin">관리자</AdminNavLink>
        </Nav>
      </MenuBox>
    </HeaderContainer>
  );
};

export default Header; 