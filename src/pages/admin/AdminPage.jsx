import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

const Container = styled.div`
  padding: 40px 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const ContentBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  font-size: 28px;
  color: #333;
  margin-bottom: 30px;
`;

const AdminSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const AdminCard = styled(Link)`
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 25px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    border-color: #2A8191;
  }
`;

const CardTitle = styled.h2`
  font-size: 20px;
  color: #2A8191;
  margin-bottom: 15px;
`;

const CardDescription = styled.p`
  font-size: 16px;
  color: #666;
  line-height: 1.5;
`;

const BackButton = styled(Link)`
  display: block;
  width: 200px;
  text-align: center;
  margin: 20px auto 0;
  padding: 10px 20px;
  background-color: #2A8191;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #1f6a77;
  }
`;

const LogoutButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d32f2f;
  }
`;

const AdminPage = () => {
  const navigate = useNavigate();

  // 페이지 진입 시 스크롤 위치를 상단으로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리
    sessionStorage.removeItem('isAdminLoggedIn');
    navigate('/admin/login');
  };

  return (
    <Container>
      <ContentBox>
        <Title>관리자 페이지</Title>
        <AdminSection>
          <AdminCard to="/admin/installation">
            <CardTitle>설치시공 관리</CardTitle>
            <CardDescription>
              설치시공 게시물을 관리합니다.
              카테고리 및 게시물을 추가, 수정, 삭제할 수 있습니다.
            </CardDescription>
          </AdminCard>
          
          <AdminCard to="/admin/notice">
            <CardTitle>공지사항 관리</CardTitle>
            <CardDescription>
              공지사항을 등록하고 관리할 수 있습니다.
              중요 공지를 상단에 고정할 수 있습니다.
            </CardDescription>
          </AdminCard>
          
          <AdminCard to="/admin/questions">
            <CardTitle>질문사항 관리</CardTitle>
            <CardDescription>
              고객들의 질문을 확인하고
              답변을 작성할 수 있습니다.
            </CardDescription>
          </AdminCard>
          
          <AdminCard to="/admin/EstimateManage">
            <CardTitle>견적문의 관리</CardTitle>
            <CardDescription>
              고객들의 견적 문의를 확인하고
              답변을 작성할 수 있습니다.
            </CardDescription>
          </AdminCard>
        </AdminSection>
        <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
      </ContentBox>
    </Container>
  );
};

export default AdminPage; 