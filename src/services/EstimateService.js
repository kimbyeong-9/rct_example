import { useState, useEffect } from 'react';

// localStorage에서 데이터를 불러오는 함수
const loadFromStorage = () => {
  try {
    const estimatesData = localStorage.getItem('estimates');
    return estimatesData ? JSON.parse(estimatesData) : null;
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return null;
  }
};

// localStorage에 데이터를 저장하는 함수
const saveToStorage = (data) => {
  try {
    localStorage.setItem('estimates', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// 초기 견적문의 데이터
const initialEstimates = [
  {
    id: 1,
    name: '김철수',
    phone: '010-1234-5678',
    email: 'kim@example.com',
    service: '덕트 설치',
    location: '서울시 강남구',
    details: '신축 건물에 덕트 설치가 필요합니다. 빠른 견적 부탁드립니다.',
    date: '2023-12-01',
    status: '대기중', // '대기중', '처리중', '완료'
    reply: ''
  },
  {
    id: 2,
    name: '이영희',
    phone: '010-9876-5432',
    email: 'lee@example.com',
    service: '냉난방기 설치',
    location: '경기도 수원시',
    details: '사무실 냉난방기 설치 문의드립니다. 약 30평 규모입니다.',
    date: '2023-12-05',
    status: '처리중',
    reply: '안녕하세요. 견적 검토 중입니다. 내일 중으로 연락드리겠습니다.'
  },
  {
    id: 3,
    name: '박지민',
    phone: '010-5555-7777',
    email: 'park@example.com',
    service: '에어컨 설치',
    location: '인천시 계양구',
    details: '가정용 벽걸이 에어컨 2대 설치 문의합니다.',
    date: '2023-12-10',
    status: '완료',
    reply: '견적 확인 후 설치 일정 잡았습니다. 감사합니다.'
  }
];

// 견적문의를 관리하는 훅
export const useEstimates = () => {
  const [estimates, setEstimates] = useState(() => {
    const storedData = loadFromStorage();
    return storedData || initialEstimates;
  });

  // 견적문의 데이터가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    saveToStorage(estimates);
  }, [estimates]);

  // 모든 견적문의 가져오기
  const getAllEstimates = () => estimates;

  // 특정 견적문의 가져오기
  const getEstimateById = (id) => {
    return estimates.find(est => est.id === id) || null;
  };

  // 견적문의 추가
  const addEstimate = (estimate) => {
    setEstimates(prevEstimates => {
      const newId = Math.max(0, ...prevEstimates.map(e => e.id)) + 1;
      const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
      
      const newEstimate = {
        ...estimate,
        id: newId,
        date: today,
        status: '대기중',
        reply: ''
      };
      
      return [...prevEstimates, newEstimate];
    });
  };

  // 견적문의 상태 및 답변 업데이트
  const updateEstimate = (id, { status, reply }) => {
    setEstimates(prevEstimates => 
      prevEstimates.map(est => 
        est.id === id ? { ...est, status, reply } : est
      )
    );
  };

  // 견적문의 삭제
  const deleteEstimate = (id) => {
    setEstimates(prevEstimates => 
      prevEstimates.filter(est => est.id !== id)
    );
  };

  return {
    estimates,
    getAllEstimates,
    getEstimateById,
    addEstimate,
    updateEstimate,
    deleteEstimate
  };
};

export default useEstimates; 