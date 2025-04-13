import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 120px 20px 80px;
  min-height: 100vh;
  background-color: #DCE3E2;
  display: flex;
  justify-content: center;
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
  font-size: 32px;
  margin-bottom: 20px;
  color: #2A8191;
  text-align: center;
  font-weight: 700;
  font-family: 'Jalnan', sans-serif;
`;

const SubTitle = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
`;

const FormGroup = styled.div`
  margin-bottom: 25px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #2A8191;
    outline: none;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  min-height: 150px;
  resize: vertical;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #2A8191;
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background-color: white;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #2A8191;
    outline: none;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const SubmitButton = styled.button`
  background-color: #2A8191;
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: #236d7a;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const Estimate = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    location: '',
    details: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 폼 제출 로직을 추가할 수 있습니다.
    console.log('Form submitted:', formData);
    setSubmitted(true);
    
    // 폼 초기화
    setFormData({
      name: '',
      phone: '',
      email: '',
      service: '',
      location: '',
      details: ''
    });
    
    // 3초 후 메시지 숨기기
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };
  
  // 페이지 진입 시 스크롤 위치를 상단으로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Container>
      <ContentBox>
        <Title>견적문의</Title>
        <SubTitle>진우ENG의 전문 상담원이 친절하게 도와드립니다</SubTitle>
        
        {submitted && (
          <div style={{ 
            backgroundColor: '#d4edda', 
            color: '#155724', 
            padding: '12px 15px', 
            borderRadius: '4px', 
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            견적 문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="name">이름 *</Label>
            <Input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              required 
              placeholder="이름을 입력해주세요"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="phone">연락처 *</Label>
            <Input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange} 
              required 
              placeholder="연락 가능한 전화번호를 입력해주세요"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="email">이메일</Label>
            <Input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="이메일 주소를 입력해주세요 (선택사항)"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="service">서비스 종류 *</Label>
            <Select 
              id="service" 
              name="service" 
              value={formData.service} 
              onChange={handleChange}
              required
            >
              <option value="">서비스를 선택해주세요</option>
              <option value="에어컨 설치">에어컨 설치</option>
              <option value="냉난방기 설치">냉난방기 설치</option>
              <option value="공조 설비">공조 설비</option>
              <option value="보일러 설치">보일러 설치</option>
              <option value="덕트 설치">덕트 설치</option>
              <option value="기타">기타</option>
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="location">설치 위치 *</Label>
            <Input 
              type="text" 
              id="location" 
              name="location" 
              value={formData.location} 
              onChange={handleChange} 
              required 
              placeholder="설치가 필요한 장소의 주소를 입력해주세요"
            />
          </FormGroup>
          
          <FormGroup>
            <Label htmlFor="details">상세 내용</Label>
            <TextArea 
              id="details" 
              name="details" 
              value={formData.details} 
              onChange={handleChange} 
              placeholder="설치 환경이나 요구사항 등 상세 내용을 입력해주세요"
            />
          </FormGroup>
          
          <ButtonContainer>
            <SubmitButton type="submit">
              견적 문의하기
            </SubmitButton>
          </ButtonContainer>
        </form>
      </ContentBox>
    </Container>
  );
};

export default Estimate; 