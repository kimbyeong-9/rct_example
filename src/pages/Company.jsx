import React, { useEffect } from 'react';
import styled from 'styled-components';

const CompanyContainer = styled.div`
  max-width: 1200px;
  margin: 120px auto 50px;
  padding: 0 20px;
`;

const Section = styled.section`
  margin-bottom: 80px;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #444444;
  text-align: center;
  margin-bottom: 30px;
  font-family: 'Jalnan', sans-serif;
  
  &.about-us {
    color: #C2869C;
    font-family: 'Pinyon Script', cursive;
    font-size: 42px;
    margin-bottom: 15px;
  }
`;

const ImagePlaceholder = styled.div`
  width: 100%;
  height: 300px;
  background-color: #f5f5f5;
  margin: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #666;
  border-radius: 12px;
  background-image: ${props => props.bgImage ? `url(${props.bgImage})` : 'none'};
  background-size: cover;
  background-position: center;
`;

const TopTitleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px;
  margin: 50px 0;
  flex-wrap: wrap;
`;

const TitlePart = styled.div`
  font-size: 32px;
  color: #444444;
  text-align: center;
  font-family: 'Jalnan', sans-serif;
  position: relative;

  &:nth-child(2) {
    color: #1B4B54;
    font-size: 36px;
  }

  &:not(:last-child)::after {
    content: '·';
    position: absolute;
    right: -35px;
    color: #888;
  }
`;

const LetterContainer = styled.div`
  max-width: 800px;
  margin: 50px auto;
  background: linear-gradient(145deg, #e8f0f1 0%, #f1f1f1 100%);
  padding: 45px;
  border-radius: 20px;
  box-shadow: 0 15px 35px rgba(27, 75, 84, 0.12);
  position: relative;
  border: 1px solid rgba(27, 75, 84, 0.15);
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 45px;
    background: linear-gradient(45deg, #1B4B54, #2d6b77);
    border-radius: 20px 20px 0 0;
    opacity: 0.95;
  }
`;

const LetterContent = styled.div`
  text-align: center;
  padding: 25px 30px;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  margin-top: 20px;
  box-shadow: 0 5px 15px rgba(27, 75, 84, 0.08);
`;

const LetterTitle = styled.h2`
  font-size: 26px;
  color: #444444;
  margin-bottom: 25px;
  font-family: 'Jalnan', sans-serif;
  text-align: center;
`;

const ServiceList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  margin: 25px 0;
`;

const ServiceItem = styled.div`
  text-align: center;
  
  h3 {
    color: #555;
    font-size: 22px;
    font-family: 'Gaegu', cursive;
    margin: 8px 0;
  }
`;

const WelcomeMessage = styled.div`
  margin-top: 40px;
  text-align: center;
  padding-top: 35px;
  border-top: 1px dashed rgba(27, 75, 84, 0.4);

  h3 {
    color: #1B4B54;
    font-size: 44px;
    margin-bottom: 20px;
    font-family: 'Pinyon Script', cursive;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  p {
    color: #444;
    font-size: 24px;
    line-height: 1.6;
    font-family: 'Jalnan', sans-serif;
    margin: 5px 0;

    &:first-of-type {
      font-size: 30px;
      color: #333;
      margin-bottom: 15px;
    }
  }
`;

const CompanyInfo = styled.div`
  text-align: center;
  margin-top: 50px;
  padding: 30px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const MapSection = styled.section`
  width: 100%;
  margin-top: 80px;
  padding: 0 20px;
`;

const MapContainer = styled.div`
  width: 100%;
  height: 400px;
  background-color: #f5f5f5;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  max-width: 1000px;
`;

const MapTitle = styled.h2`
  font-size: 24px;
  color: #444444;
  text-align: center;
  margin-bottom: 20px;
  font-family: 'Jalnan', sans-serif;
`;

const MapPlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e9e9e9;
  border-radius: 12px;
  color: #666;
  font-size: 16px;
`;

const Company = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <CompanyContainer>
      <Section>
        <TopTitleContainer>
          <TitlePart>각종 후드 · 닥트</TitlePart>
          <TitlePart>Perfect 시공</TitlePart>
          <TitlePart>합리적인 금액</TitlePart>
        </TopTitleContainer>
        <ImagePlaceholder bgImage="/images/company/main-banner.jpg">
          이미지 삽입 영역
        </ImagePlaceholder>
      </Section>

      <Section>
        <SectionTitle className="about-us">ABOUT US</SectionTitle>
        <SectionTitle>업체 소개</SectionTitle>
        <ImagePlaceholder bgImage="/images/company/about-us.jpg">
          업체 소개 이미지
        </ImagePlaceholder>
      </Section>

      <Section>
        <LetterContainer>
          <LetterContent>
            <LetterTitle>후드 · 닥트 공사, 닥트 시공 전문 업체</LetterTitle>
            <ServiceList>
              <ServiceItem>
                <h3>급식실 닥트</h3>
              </ServiceItem>
              <ServiceItem>
                <h3>급배기 닥트</h3>
              </ServiceItem>
              <ServiceItem>
                <h3>상/하향식 닥트</h3>
              </ServiceItem>
              <ServiceItem>
                <h3>각종건설닥트</h3>
              </ServiceItem>
            </ServiceList>
            <WelcomeMessage>
              <h3>Welcome to</h3>
              <p>진우 ENG</p>
              <p>찾아주신 여러분께 감사인사 드립니다</p>
            </WelcomeMessage>
          </LetterContent>
        </LetterContainer>
      </Section>

      <MapSection>
        <MapTitle>찾아오시는 길</MapTitle>
        <MapContainer>
          <MapPlaceholder>
            지도가 곧 추가될 예정입니다
          </MapPlaceholder>
        </MapContainer>
      </MapSection>
    </CompanyContainer>
  );
};

export default Company; 