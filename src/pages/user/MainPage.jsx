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

const ToolBox = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 30px;
  margin-top: 40px;
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
  width: 30%;
  max-width: 280px;
  height: 200px;
  padding: 20px;
  margin: 10px;
  border: 2px dashed ${props => props.color || '#FFD6E0'};
  border-radius: 20px;
  background-color: ${props => props.color || '#FFD6E0'}20;
  text-decoration: none;
  color: #333;
  transition: all 0.3s ease;
  font-family: 'Gaegu', cursive;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  
  &:hover {
    transform: scale(1.05) rotate(2deg);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    animation: sparkle 1.5s infinite;
  }
  
  @keyframes sparkle {
    0% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
    50% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.8); }
    100% { box-shadow: 0 0 5px rgba(255, 255, 255, 0.5); }
  }
`;

const ToolIcon = styled.div`
  font-size: 36px;
  color: #2A8191;
  margin-bottom: 15px;
`;

const ToolTitle = styled.h3`
  font-size: 22px;
  margin: 10px 0;
  color: #333;
  font-family: 'Gaegu', cursive;
  font-weight: bold;
`;

const ToolDescription = styled.p`
  font-size: 14px;
  text-align: center;
  line-height: 1.4;
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
            <ToolIcon>🏠</ToolIcon>
            <ToolTitle>설치시공</ToolTitle>
            <ToolDescription>
              전문 기술자들이 정확한 시공과 품질관리로<br />
              고객님의 만족을 최우선으로 생각합니다.
            </ToolDescription>
          </LinkToolItem>
          
          <LinkToolItem to="/questions" color="#D6E0FF">
            <ToolIcon>❓</ToolIcon>
            <ToolTitle>질문사항</ToolTitle>
            <ToolDescription>
              자주 묻는 질문과 답변을<br />
              확인하실 수 있습니다.
            </ToolDescription>
          </LinkToolItem>
          
          <LinkToolItem to="/estimate" color="#D6FFE0">
            <ToolIcon>💰</ToolIcon>
            <ToolTitle>견적문의</ToolTitle>
            <ToolDescription>
              정확한 견적과 신속한 답변으로<br />
              고객님의 문의에 답변드립니다.
            </ToolDescription>
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