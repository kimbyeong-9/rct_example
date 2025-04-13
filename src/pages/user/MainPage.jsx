import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 180px);
  background-color: #DCE3E2;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SliderContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  overflow: hidden;
  margin-bottom: 40px;
  box-shadow: none;
  background-color: #C7C7C7;
`;

const Slide = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: ${props => props.active ? 1 : 0};
  transition: opacity 0.15s ease;
  background-size: cover;
  background-position: center;
  background-image: url(${props => props.image});
`;

const DotsContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 8px;
  z-index: 2;
`;

const PaginationDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#2A8191' : '#DCE3E2'};
  margin: 0 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
`;

const ContentBox = styled.div`
  max-width: 1000px;
  width: calc(100% - 40px);
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 20px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #2A8191;
  margin-bottom: 30px;
  text-align: center;
  font-weight: 900;
  letter-spacing: 2px;
  font-family: 'Jalnan', sans-serif !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const WelcomeText = styled.p`
  font-size: 18px;
  line-height: 2;
  color: #333;
  text-align: center;
  margin-bottom: 40px;
  font-family: 'Jalnan', sans-serif !important;
`;

const ToolBox = styled.section`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  margin: 40px auto;
  max-width: 1200px;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ToolItem = styled.div`
  background-color: #f8f9fa;
  padding: 25px;
  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease;
  cursor: pointer;
  border: 1px solid #e9ecef;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const LinkToolItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 180px;
  text-align: center;
  padding: 1.5rem;
  text-decoration: none;
  border: 2px dashed #aaa;
  border-radius: 15px;
  background-color: ${props => props.color || '#fff'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  font-family: 'Gaegu', cursive;

  &:hover {
    transform: scale(1.05) rotate(1deg);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);

    &::after {
      content: '✨';
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 1.5rem;
      animation: sparkle 1s infinite;
    }
  }

  @keyframes sparkle {
    0% { opacity: 0; transform: translateY(0) scale(0.8); }
    50% { opacity: 1; transform: translateY(-5px) scale(1); }
    100% { opacity: 0; transform: translateY(-10px) scale(0.8); }
  }
`;

const ToolIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const ToolTitle = styled.h3`
  margin: 0.5rem 0;
  font-size: 1.4rem;
  color: #333;
  font-family: 'Gaegu', cursive;
`;

const ToolDescription = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #555;
  font-family: 'Gaegu', cursive;
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  height: 300px;
  background-color: #f8f9fa;
  border: 2px dashed #ccc;
  border-radius: 0;
  margin: 40px 0 20px;
  position: relative;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ImagePlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #aaa;
  
  svg {
    font-size: 48px;
    margin-bottom: 10px;
  }
  
  p {
    font-size: 16px;
  }
`;

const AdminButton = styled(Link)`
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 18px;
  font-family: 'Jalnan', sans-serif;
  font-weight: 700;
  transition: all 0.3s ease;
  background-color: #2A8191;
  color: white;
  border: 2px solid #2A8191;
  margin-top: 40px;
  display: inline-block;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  
  &:hover {
    background-color: white;
    color: #2A8191;
    transform: translateY(-3px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const MainPage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    { image: '/images/main/slide1.jpg' },
    { image: '/images/main/slide2.jpg' },
    { image: '/images/main/slide3.jpg' },
    { image: '/images/main/slide4.jpg' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 2000);

    return () => clearInterval(timer);
  }, [slides.length]);

  // 페이지 진입 시 스크롤 위치를 상단으로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <SliderContainer>
        {slides.map((slide, index) => (
          <Slide
            key={index}
            image={slide.image}
            active={index === currentSlide}
          />
        ))}
        <DotsContainer>
          {slides.map((_, index) => (
            <PaginationDot
              key={index}
              active={index === currentSlide}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </DotsContainer>
      </SliderContainer>

      <ContentBox>
        <Title>진우ENG에 오신 것을 환영합니다</Title>
        <WelcomeText>
          진우ENG는 다양한 설치 서비스를 제공하는 전문 업체입니다.<br />
          에어컨, 냉난방기, 보일러 등 다양한 설비의 설치 및 수리 서비스를 제공하고 있습니다.
        </WelcomeText>
        
        <ToolBox>
          <LinkToolItem to="/installation" color="#FFD6E0">
            <ToolIcon>🔧</ToolIcon>
            <ToolTitle>설치시공</ToolTitle>
            <ToolDescription>닥트 및 기구 설치 서비스</ToolDescription>
          </LinkToolItem>
          
          <LinkToolItem to="/questions" color="#D4F0F0">
            <ToolIcon>❓</ToolIcon>
            <ToolTitle>질문사항</ToolTitle>
            <ToolDescription>자주 묻는 질문과 답변</ToolDescription>
          </LinkToolItem>
          
          <LinkToolItem to="/estimate" color="#E2F0CB">
            <ToolIcon>📝</ToolIcon>
            <ToolTitle>견적문의</ToolTitle>
            <ToolDescription>프로젝트 견적 문의하기</ToolDescription>
          </LinkToolItem>
        </ToolBox>
      </ContentBox>
      
      <ImageContainer>
        <ImagePlaceholder>
          <span>🖼️</span>
          <p>이미지 준비 중입니다.</p>
        </ImagePlaceholder>
        {/* 이미지가 준비되면 아래 코드의 주석을 제거하고 이미지 경로를 설정하세요 */}
        {/* <img src="/images/main/site-image.jpg" alt="진우ENG 설치 현장" /> */}
      </ImageContainer>

      <AdminButton to="/admin">관리자</AdminButton>
    </Container>
  );
};

export default MainPage; 