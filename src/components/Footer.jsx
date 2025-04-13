import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  width: 100%;
  background-color: #2A8191;
  color: white;
  text-align: center;
  padding: 20px 0;
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

const FooterContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const FooterTitle = styled.h3`
  margin: 0 20px 0 0;
  font-size: 22px;
`;

const FooterText = styled.p`
  margin: 0 15px;
  font-size: 16px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterTitle>진우ENG</FooterTitle>
        <FooterText>서울특별시 성동구 하왕십리동 0000-00</FooterText>
        <FooterText>|</FooterText>
        <FooterText>Tel: 010-0000-0000</FooterText>
        <FooterText>|</FooterText>
        <FooterText>대표: 김영훈</FooterText>
        <FooterText>|</FooterText>
        <FooterText>© 2025 진우ENG</FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 