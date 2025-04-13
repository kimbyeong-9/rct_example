import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ResetContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #DCE3E2;
  padding: 20px;
`;

const ResetForm = styled.form`
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
  
  &:disabled {
    background-color: #f5f5f5;
    cursor: not-allowed;
  }
`;

const SubmitButton = styled.button`
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

const VerifyButton = styled.button`
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

const InfoMessage = styled.div`
  margin: 15px 0;
  padding: 10px;
  background-color: #f5f5f5;
  border-radius: 4px;
  font-size: 14px;
  color: #555;
  text-align: center;
`;

const InputGroup = styled.div`
  position: relative;
  margin-bottom: 15px;
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

const CredentialsReset = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleVerify = () => {
    navigate('/admin/verify-email');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // 새 비밀번호 유효성 검사
    if (!newUsername.trim()) {
      setError('새 아이디를 입력해주세요.');
      setLoading(false);
      return;
    }

    if (!newPassword) {
      setError('새 비밀번호를 입력해주세요.');
      setLoading(false);
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.');
      setLoading(false);
      return;
    }

    // 비밀번호 복잡성 검사 (예시: 8자 이상)
    if (newPassword.length < 8) {
      setError('비밀번호는 8자 이상이어야 합니다.');
      setLoading(false);
      return;
    }

    // 여기서 실제 업데이트 로직을 구현합니다.
    // 예시: API 호출을 통해 새 자격 증명으로 업데이트
    
    // 임시로 타이머를 사용하여 API 호출을 시뮬레이션합니다.
    setTimeout(() => {
      // 성공 시 메시지 표시 (실제 구현에서는 API 응답에 따라 처리)
      setSuccess('자격 증명이 성공적으로 업데이트되었습니다.');
      
      // 잠시 후 로그인 페이지로 리디렉션
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
      
      setLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    navigate('/admin/login');
  };

  // 이 함수는 실제 구현에서는 사용자가 이메일 인증을 완료하고 돌아왔을 때 자동으로 호출되어야 합니다.
  // 현재는 페이지 로드 시 sessionStorage를 확인하는 방식으로 시뮬레이션합니다.
  useEffect(() => {
    // direct-password-change 경로로 접근한 경우 이메일 인증 없이 바로 비밀번호 변경 폼 표시
    if (location.pathname === '/admin/direct-password-change') {
      setIsVerified(true);
    } else {
      // 기존 방식: sessionStorage에서 이메일 인증 상태 확인
      const verificationStatus = sessionStorage.getItem('emailVerified');
      if (verificationStatus === 'true') {
        setIsVerified(true);
        // 인증된 이메일 표시를 위해 sessionStorage에서 가져오기
        const email = sessionStorage.getItem('verifiedEmail');
        if (email) {
          setVerifiedEmail(email);
        }
      }
    }
  }, [location.pathname]);

  return (
    <ResetContainer>
      <ResetForm onSubmit={handleSubmit}>
        <Logo>진우 ENG</Logo>
        <Title>관리자 자격 증명 변경</Title>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        {success && <SuccessMessage>{success}</SuccessMessage>}
        
        {!isVerified ? (
          <>
            <InfoMessage>
              아이디 또는 비밀번호를 변경하려면 이메일 인증이 필요합니다.
            </InfoMessage>
            <VerifyButton type="button" onClick={handleVerify}>
              이메일 인증하기
            </VerifyButton>
          </>
        ) : (
          <>
            {verifiedEmail && location.pathname !== '/admin/direct-password-change' && (
              <SuccessMessage>
                {`${verifiedEmail} 이메일로 인증이 완료되었습니다. 새 자격 증명을 설정하세요.`}
              </SuccessMessage>
            )}
            {location.pathname === '/admin/direct-password-change' && (
              <InfoMessage>
                새 관리자 자격 증명을 설정하세요.
              </InfoMessage>
            )}
            <FormGroup>
              <Label>새 아이디</Label>
              <Input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                required
              />
            </FormGroup>
            
            <InputGroup>
              <Label>새 비밀번호</Label>
              <Input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <PasswordToggleButton 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "숨기기" : "보기"}
              </PasswordToggleButton>
            </InputGroup>
            
            <InputGroup>
              <Label>새 비밀번호 확인</Label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <PasswordToggleButton 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? "숨기기" : "보기"}
              </PasswordToggleButton>
            </InputGroup>
            
            <SubmitButton 
              type="submit" 
              disabled={loading}
            >
              {loading ? '처리 중...' : '변경 확인'}
            </SubmitButton>
          </>
        )}
        
        <BackButton type="button" onClick={handleBack}>뒤로 가기</BackButton>
      </ResetForm>
    </ResetContainer>
  );
};

export default CredentialsReset; 