import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #DCE3E2;
  position: relative;
`;

const HomeButton = styled(Link)`
  position: absolute;
  top: 20px;
  left: 20px;
  background-color: #2A8191;
  color: white;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 5px;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #236d7a;
    transform: translateY(-2px);
  }
`;

const LoginBox = styled.div`
  width: 400px;
  padding: 40px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  color: #2A8191;
  font-family: 'Jalnan', sans-serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: #2A8191;
  }
`;

const LoginButton = styled.button`
  background-color: #2A8191;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 14px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
  
  &:hover {
    background-color: #236d7a;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const ResetButton = styled(Link)`
  display: block;
  text-align: center;
  margin-top: 20px;
  color: #2A8191;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
  
  &:hover {
    color: #236d7a;
    text-decoration: underline;
  }
`;

const ErrorMessage = styled.div`
  color: #e74c3c;
  margin-bottom: 15px;
  text-align: center;
  font-size: 14px;
  background-color: #fdeaea;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #f8d7da;
  display: ${props => props.show ? 'block' : 'none'};
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #2A8191;
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 14px;
`;

const StyledLink = styled(Link)`
  color: #555;
  text-decoration: none;
  
  &:hover {
    text-decoration: underline;
    color: #000;
  }
`;

const TestLink = styled(Link)`
  color: #2A8191;
  text-decoration: none;
  font-weight: bold;
  
  &:hover {
    text-decoration: underline;
    color: #236d7a;
  }
`;

const PasswordToggleButton = styled.button`
  position: absolute;
  right: 10px;
  top: calc(50% + 12px);
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: #777;
  font-size: 14px;
  padding: 5px;
  z-index: 2;
  
  &:hover {
    color: #2A8191;
  }
`;

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();
  
  // 로그인 처리 함수
  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    // 간단한 관리자 인증 로직
    // 실제 운영 환경에서는 서버측 인증을 사용해야 합니다
    setTimeout(() => {
      if (username === '0000' && password === '1111') {
        // 로그인 성공 시 세션 스토리지에 인증 정보 저장
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        navigate('/admin');
      } else {
        setError('아이디 또는 비밀번호가 올바르지 않습니다.');
      }
      setLoading(false);
    }, 1000);
  };
  
  // 이미 로그인되어 있으면 관리자 페이지로 리디렉션
  useEffect(() => {
    const isLoggedIn = sessionStorage.getItem('isAdminLoggedIn') === 'true';
    if (isLoggedIn) {
      navigate('/admin');
    }
  }, [navigate]);

  return (
    <Container>
      <HomeButton to="/">메인페이지</HomeButton>
      <LoginBox>
        <Logo>진우 ENG</Logo>
        <Title>관리자 로그인</Title>
        
        <ErrorMessage show={error !== ''}>{error}</ErrorMessage>
        
        <Form onSubmit={handleLogin}>
          <InputGroup>
            <Label htmlFor="username">아이디</Label>
            <Input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordToggleButton 
              type="button" 
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "숨기기" : "보기"}
            </PasswordToggleButton>
          </InputGroup>
          
          <LoginButton type="submit" disabled={loading}>
            {loading ? '로그인 중...' : '로그인'}
          </LoginButton>
        </Form>
        
        <LinkContainer>
          <StyledLink to="/admin/reset-credentials">비밀번호 재설정</StyledLink>
          <TestLink to="/admin/direct-password-change">비밀번호변경페이지작업</TestLink>
        </LinkContainer>
      </LoginBox>
    </Container>
  );
};

export default AdminLogin; 