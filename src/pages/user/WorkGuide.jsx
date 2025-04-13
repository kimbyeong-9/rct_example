import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 80px 20px 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #DCE3E2;
`;

const ContentBox = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
`;

const WorkSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 20px;
  color: #2A8191;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #2A8191;
`;

const WorkList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const WorkItem = styled.li`
  margin-bottom: 15px;
  padding-left: 25px;
  position: relative;
  line-height: 1.6;
  color: #666;

  &:before {
    content: "•";
    color: #2A8191;
    font-weight: bold;
    position: absolute;
    left: 0;
  }
`;

const ImageSection = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WorkImage = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  background-image: ${props => props.bgImage ? `url(${props.bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
  font-size: 18px;
`;

const BottomImages = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const IntroLetter = styled.div`
  margin-bottom: 40px;
  padding: 40px;
  background-color: #f8f9fa;
  border-radius: 12px;
  border-left: 4px solid #2A8191;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

const IntroTitle = styled.h2`
  font-size: 28px;
  color: #2A8191;
  margin-bottom: 25px;
  text-align: center;
  font-weight: 900;
  letter-spacing: 2px;
  font-family: 'Jalnan', sans-serif !important;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
`;

const IntroContent = styled.p`
  line-height: 2.2;
  color: #333;
  text-align: center;
  font-size: 16px;
  font-family: 'Jalnan', sans-serif !important;
  letter-spacing: 1px;
  word-spacing: 2px;
  font-weight: 400;

  span.company {
    color: #2A8191;
    font-weight: 700;
    font-size: 18px;
  }

  span.experience {
    color: #1A5276;
    font-weight: 700;
    font-size: 18px;
  }

  span.quality {
    color: #2874A6;
    font-weight: 700;
    font-size: 18px;
  }

  span.trust {
    color: #3498DB;
    font-weight: 700;
    font-size: 18px;
  }

  span.environment {
    color: #5DADE2;
    font-weight: 700;
    font-size: 18px;
  }

  span.equipment {
    color: #85C1E9;
    font-weight: 700;
    font-size: 18px;
  }

  span.maintenance {
    color: #AED6F1;
    font-weight: 700;
    font-size: 18px;
  }
`;

const WorkGuide = () => {
  return (
    <Container>
      <ContentBox>
        <Title>업무 안내</Title>
        
        <IntroLetter>
          <IntroTitle>진우ENG를 방문해주셔서 감사합니다</IntroTitle>
          <IntroContent>
            저희 <span className="company">진우ENG</span>는 <span className="experience">20년 이상의 경험</span>을 바탕으로 덕트시공 및 공조시설 전문 업체로서<br />
            고객님들의 <span className="environment">쾌적한 환경</span>을 위해 최선을 다하고 있습니다.<br /><br />
            <span className="equipment">최신 장비</span>와 숙련된 기술자들이 함께하여<br />
            <span className="quality">정확한 시공과 철저한 품질관리</span>로 고객님의 만족을 최우선으로 생각합니다.<br /><br />
            덕트시공부터 공조시설 설치, <span className="maintenance">유지보수</span>까지<br />
            모든 공정을 전문적으로 책임지고 진행하며,<br />
            고객님과의 <span className="trust">신뢰</span>를 가장 소중히 여기고 있습니다.
          </IntroContent>
        </IntroLetter>

        <ImageSection>
          <WorkImage bgImage="/images/work-guide/duct-work-1.jpg">
            닥트시공 작업 현장 1
          </WorkImage>
        </ImageSection>

        <WorkSection>
          <SectionTitle>설치 시공</SectionTitle>
          <WorkList>
            <WorkItem>에어컨, 냉난방기, 환기시설, 공조기 등 다양한 공조시설 설치</WorkItem>
            <WorkItem>보일러 및 온수기 설치</WorkItem>
            <WorkItem>정수기, 환기팬, 제습기, 공기청정기 등 기타 시설 설치</WorkItem>
            <WorkItem>전문 기술자에 의한 정확한 설치 및 시공</WorkItem>
          </WorkList>
        </WorkSection>

        <WorkSection>
          <SectionTitle>유지보수</SectionTitle>
          <WorkList>
            <WorkItem>정기적인 점검 및 유지보수 서비스</WorkItem>
            <WorkItem>고장 수리 및 부품 교체</WorkItem>
            <WorkItem>청소 및 필터 교체</WorkItem>
            <WorkItem>시스템 최적화 및 성능 개선</WorkItem>
          </WorkList>
        </WorkSection>

        <WorkSection>
          <SectionTitle>컨설팅</SectionTitle>
          <WorkList>
            <WorkItem>시설물 설치 계획 수립</WorkItem>
            <WorkItem>에너지 효율 개선 방안 제시</WorkItem>
            <WorkItem>설비 교체 및 업그레이드 컨설팅</WorkItem>
            <WorkItem>맞춤형 솔루션 제공</WorkItem>
          </WorkList>
        </WorkSection>

        <WorkSection>
          <SectionTitle>고객 서비스</SectionTitle>
          <WorkList>
            <WorkItem>24시간 긴급 출동 서비스</WorkItem>
            <WorkItem>전문 기술 상담</WorkItem>
            <WorkItem>견적 및 상담 서비스</WorkItem>
            <WorkItem>고객 만족도 향상을 위한 지속적인 관리</WorkItem>
          </WorkList>
        </WorkSection>

        <BottomImages>
          <WorkImage bgImage="/images/work-guide/duct-work-2.jpg">
            닥트시공 작업 현장 2
          </WorkImage>
          <WorkImage bgImage="/images/work-guide/duct-work-3.jpg">
            닥트시공 작업 현장 3
          </WorkImage>
        </BottomImages>
      </ContentBox>
    </Container>
  );
};

export default WorkGuide; 