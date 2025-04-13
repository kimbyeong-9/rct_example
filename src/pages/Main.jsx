import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  padding: 80px 20px;
  min-height: 100vh;
  background-color: #DCE3E2;
`;

const ContentBox = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background-color: white;
  padding: 40px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const WelcomeSection = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #333;
  margin-bottom: 20px;
`;

const Description = styled.p`
  font-size: 18px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 25px;
  justify-content: center;
  margin-top: 40px;
  flex-wrap: wrap;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 18px;
  font-family: 'Gaegu', cursive;
  font-weight: 700;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: inline-block;
  min-width: 150px;
  text-align: center;
  
  &:nth-child(1) {
    background-color: #FFE5E5;
    color: #FF6B6B;
    border: 2px dashed #FFB3B3;
    
    &:hover {
      background-color: #FFD1D1;
      transform: scale(1.05) rotate(-2deg);
      box-shadow: 0 6px 20px rgba(255, 107, 107, 0.2);
    }
  }
  
  &:nth-child(2) {
    background-color: #E5F3FF;
    color: #4DABF7;
    border: 2px dashed #A5D8FF;
    
    &:hover {
      background-color: #D0EBFF;
      transform: scale(1.05) rotate(2deg);
      box-shadow: 0 6px 20px rgba(77, 171, 247, 0.2);
    }
  }
  
  &:nth-child(3) {
    background-color: #E5FFE3;
    color: #40C057;
    border: 2px dashed #B2F2BB;
    
    &:hover {
      background-color: #D3F9D8;
      transform: scale(1.05) rotate(-2deg);
      box-shadow: 0 6px 20px rgba(64, 192, 87, 0.2);
    }
  }

  &:before {
    content: '✨';
    position: absolute;
    font-size: 14px;
    top: 5px;
    left: 10px;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:after {
    content: '✨';
    position: absolute;
    font-size: 14px;
    bottom: 5px;
    right: 10px;
    opacity: 0;
    transition: all 0.3s ease;
  }

  &:hover:before,
  &:hover:after {
    opacity: 1;
  }
`;

const AdminButton = styled(Link)`
  text-decoration: none;
  padding: 12px 25px;
  border-radius: 20px;
  font-size: 16px;
  font-family: 'Jalnan', sans-serif;
  font-weight: 700;
  transition: all 0.3s ease;
  background-color: #2A8191;
  color: white;
  border: 2px solid #2A8191;
  margin-top: 40px;
  display: inline-block;
  
  &:hover {
    background-color: white;
    color: #2A8191;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const Main = () => {
  // 페이지 진입 시 스크롤 위치를 상단으로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <ContentBox>
        <WelcomeSection>
          <Title>진우ENG에 오신 것을 환영합니다</Title>
          <Description>
            진우ENG는 다양한 설치 서비스를 제공하는 전문 업체입니다.
          </Description>
          <Description>
            에어컨, 냉난방기, 보일러 등 다양한 설비의 설치 및 수리 서비스를 제공하고 있습니다.
          </Description>
          <ButtonContainer>
            <StyledLink to="/installation">설치시공</StyledLink>
            <StyledLink to="/questions">질문사항</StyledLink>
            <StyledLink to="/estimate">견적문의</StyledLink>
          </ButtonContainer>
          <AdminButton to="/admin">관리자 페이지</AdminButton>
        </WelcomeSection>
      </ContentBox>
    </Container>
  );
};

export default Main; 