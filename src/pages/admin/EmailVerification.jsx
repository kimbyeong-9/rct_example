import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const VerificationContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #DCE3E2;
  padding: 20px;
`;

const VerificationForm = styled.form`
  width: 100%;
  max-width: 400px;
  padding: 30px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  text-align: center;
  color: #2A8191;
  font-family: 'Jalnan', sans-serif;
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  position: relative;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #2A8191;
  }
`;

const VerificationButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #2A8191;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
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

const VerificationCodeButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 15px;

  &:hover {
    background-color: #357abD;
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const BackButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #f0f0f0;
  color: #333;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0e0e0;
  }
`;

const ErrorMessage = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #fae3e3;
  color: #d32f2f;
  border-radius: 4px;
  border: 1px solid #ffc0c0;
  text-align: center;
`;

const SuccessMessage = styled.div`
  margin-top: 15px;
  padding: 10px;
  background-color: #e3f2fd;
  color: #0d47a1;
  border-radius: 4px;
  border: 1px solid #bbdefb;
  text-align: center;
`;

const Logo = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 28px;
  font-weight: bold;
  color: #2A8191;
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

const EmailVerification = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mockCode, setMockCode] = useState('');
  const [showVerificationCode, setShowVerificationCode] = useState(false);
  const navigate = useNavigate();

  const handleVerify = () => {
    setError('');
    setSuccess('');
    setIsLoading(true);
    
    // 입력 검증
    if (!verificationCode.trim()) {
      setError('인증 코드를 입력해주세요.');
      setIsLoading(false);
      return;
    }
    
    // API 호출을 시뮬레이션하기 위한 타임아웃
    setTimeout(() => {
      // 이메일 코드 검증 로직 - 실제로는 서버에서 검증해야 합니다
      if (verificationCode === mockCode) {
        setSuccess('인증이 완료되었습니다. 비밀번호 변경 페이지로 이동합니다.');
        
        // 인증 상태를 세션 스토리지에 저장
        sessionStorage.setItem('emailVerified', 'true');
        sessionStorage.setItem('verifiedEmail', email);
        
        // 2초 후 비밀번호 변경 페이지로 바로 이동
        setTimeout(() => {
          navigate('/admin/direct-password-change');
        }, 2000);
      } else {
        setError('인증 코드가 일치하지 않습니다. 다시 확인해주세요.');
      }
      
      setIsLoading(false);
    }, 1500);
  };

  const handleSendVerificationCode = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setIsLoading(true);

    if (!email) {
      setError('이메일을 입력해주세요.');
      setIsLoading(false);
      return;
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      setIsLoading(false);
      return;
    }
    
    // 인증 가능한 이메일 확인
    if (email !== '3333@naver.com') {
      setError('등록되지 않은 이메일입니다.');
      setIsLoading(false);
      return;
    }

    // 6자리 인증 코드 생성
    const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
    setMockCode(generatedCode);

    // 여기에 인증 코드 전송 API 호출 로직이 추가될 예정입니다.
    // 임시로 타이머를 사용하여 API 호출을 시뮬레이션합니다.
    setTimeout(() => {
      setIsCodeSent(true);
      setSuccess(`인증 코드가 이메일로 전송되었습니다. (테스트용 코드: ${generatedCode})`);
      setIsLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    navigate('/admin/login');
  };

  return (
    <VerificationContainer>
      <VerificationForm onSubmit={isCodeSent ? handleVerify : handleSendVerificationCode}>
        <Logo>진우 ENG</Logo>
        <Title>이메일 본인인증</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        <FormGroup>
          <Label>이메일</Label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isCodeSent}
            required
          />
        </FormGroup>
        
        {!isCodeSent ? (
          <VerificationCodeButton 
            type="submit" 
            disabled={isLoading}
          >
            {isLoading ? '처리 중...' : '인증 코드 전송'}
          </VerificationCodeButton>
        ) : (
          <>
            <FormGroup>
              <Label>인증 코드</Label>
              <Input
                type={showVerificationCode ? "text" : "password"}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                required
              />
              <PasswordToggleButton 
                type="button" 
                onClick={() => setShowVerificationCode(!showVerificationCode)}
              >
                {showVerificationCode ? "숨기기" : "보기"}
              </PasswordToggleButton>
            </FormGroup>
            
            <VerificationButton 
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? '인증 중...' : '인증 확인'}
            </VerificationButton>
          </>
        )}
        
        <BackButton type="button" onClick={handleBack}>뒤로 가기</BackButton>
      </VerificationForm>
    </VerificationContainer>
  );
};

export default EmailVerification; 