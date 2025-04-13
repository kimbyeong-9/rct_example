import React, { useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 80px 20px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HomeBox = styled.div`
  max-width: 1200px;
  width: 100%;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 40px;
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
`;

const Content = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #666;
`;

const Home = () => {
  // 페이지 진입 시 스크롤 위치를 상단으로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <HomeBox>
        <Title>진우ENG에 오신 것을 환영합니다</Title>
        <Content>
          <p>
            진우ENG는 다양한 설치 서비스를 제공하는 전문 업체입니다. 
            에어컨, 냉난방기, 보일러 등 다양한 설비의 설치 및 수리 서비스를 
            제공하고 있습니다.
          </p>
        </Content>
      </HomeBox>
    </Container>
  );
};

export default Home; 