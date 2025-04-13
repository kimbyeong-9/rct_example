import { useState, useEffect } from 'react';

// localStorage에서 데이터를 불러오는 함수
const loadFromStorage = () => {
  try {
    const questionsData = localStorage.getItem('faqQuestions');
    return questionsData ? JSON.parse(questionsData) : null;
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return null;
  }
};

// localStorage에 데이터를 저장하는 함수
const saveToStorage = (data) => {
  try {
    localStorage.setItem('faqQuestions', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// 초기 FAQ 데이터
const initialQuestions = [
  {
    id: 1,
    question: '에어컨 설치는 얼마나 걸리나요?',
    answer: '에어컨 설치는 일반적으로 제품 종류와 설치 환경에 따라 1~3시간 정도 소요됩니다. 벽걸이형은 약 1시간, 스탠드형은 약 1.5시간, 시스템 에어컨은 2~3시간 정도 예상하시면 됩니다.',
    category: '설치',
    order: 1
  },
  {
    id: 2,
    question: '덕트 설치 시 주의해야 할 점이 있나요?',
    answer: '덕트 설치 시에는 공기 흐름과 단열이 중요합니다. 누기나 열손실이 없도록 설치해야 하며, 소음과 진동을 최소화하는 것이 중요합니다. 또한 정기적인 필터 청소를 위한 접근성도 고려해야 합니다.',
    category: '설치',
    order: 2
  },
  {
    id: 3,
    question: '덕트형 에어컨과 벽걸이형의 차이점은 무엇인가요?',
    answer: '덕트형 에어컨은 천장 속에 설치되어 덕트를 통해 여러 공간에 공기를 공급하는 시스템입니다. 벽걸이형과 달리 천장에 매립되어 시야에 보이지 않고, 넓은 공간의 냉방에 효과적입니다. 또한 필터링 성능이 뛰어나 공기질 관리에도 유리하지만, 설치 비용과 공사 기간이 더 많이 소요됩니다.',
    category: '제품',
    order: 1
  },
  {
    id: 4,
    question: '덕트 설비의 수명은 얼마나 되나요?',
    answer: '잘 설치된 덕트 설비는 적절한 유지보수를 통해 15~20년 이상 사용할 수 있습니다. 하지만 주기적인 청소와 점검이 필요하며, 약 5년마다 전문가의 종합 점검을 받는 것이 좋습니다. 덕트 내부에 먼지나 오염물이 쌓이면 공기질 저하와 화재 위험이 있으므로 정기적인 관리가 중요합니다.',
    category: '유지보수',
    order: 1
  },
  {
    id: 5,
    question: '덕트 청소는 얼마나 자주 해야 하나요?',
    answer: '일반 가정용 덕트는 3~5년마다, 상업용이나 산업용은 1~3년마다 전문 청소를 권장합니다. 하지만 사용 환경에 따라 달라질 수 있으며, 알레르기나 호흡기 질환자가 있는 가정은 더 자주 청소하는 것이 좋습니다. 덕트 그릴에 먼지가 쌓이거나, 공기 배출구에서 냄새가 나는 경우 청소가 필요한 신호입니다.',
    category: '유지보수',
    order: 2
  },
  {
    id: 6,
    question: '닥트 설치 시 소요되는 시간은 얼마나 되나요?',
    answer: '닥트 설치 시간은 공간의 크기와 복잡도에 따라 다르지만, 일반적으로 소규모 공간은 1-2일, 중규모 공간은 2-3일, 대규모 공간은 3-5일 정도 소요됩니다. 정확한 시간은 현장 방문 후 안내해드립니다.',
    category: '설치',
    order: 3
  },
  {
    id: 7,
    question: '닥트 설치 후 유지보수는 어떻게 하나요?',
    answer: '정기적인 점검을 통해 닥트의 상태를 확인하고, 필요한 경우 부분 보수나 청소를 진행합니다. 당사는 설치 후 1년간 무상 점검 서비스를 제공하며, 이후에는 유상 서비스로 전환됩니다.',
    category: '유지보수',
    order: 3
  },
  {
    id: 8,
    question: '기존 건물에도 닥트 설치가 가능한가요?',
    answer: '네, 가능합니다. 다만 건물의 구조와 상황에 따라 설치 방법과 비용이 달라질 수 있습니다. 현장 방문을 통해 최적의 설치 방안을 제안해드립니다.',
    category: '설치',
    order: 4
  },
  {
    id: 9,
    question: '닥트의 수명은 얼마나 되나요?',
    answer: '적절한 유지보수를 통해 관리할 경우, 일반적으로 15-20년 정도 사용이 가능합니다. 단, 사용 환경과 관리 상태에 따라 수명이 달라질 수 있습니다.',
    category: '유지보수',
    order: 4
  }
];

// 카테고리 목록
const categories = [
  { id: 'all', name: '전체' },
  { id: '설치', name: '설치' },
  { id: '유지보수', name: '유지보수' },
  { id: '제품', name: '제품' }
];

// FAQ 질문을 관리하는 함수
export const useFaqQuestions = () => {
  const [questions, setQuestions] = useState(() => {
    const storedData = loadFromStorage();
    return storedData || initialQuestions;
  });

  // 질문 데이터가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    saveToStorage(questions);
  }, [questions]);

  // 모든 질문 가져오기
  const getAllQuestions = () => questions;
  
  // 카테고리별 질문 가져오기
  const getQuestionsByCategory = (category) => {
    if (category === 'all') return questions;
    return questions.filter(q => q.category === category);
  };

  // 특정 질문 가져오기
  const getQuestionById = (id) => {
    return questions.find(q => q.id === id) || null;
  };

  // 질문 추가
  const addQuestion = (question) => {
    setQuestions(prevQuestions => {
      const newId = Math.max(0, ...prevQuestions.map(q => q.id)) + 1;
      const categoryQuestions = prevQuestions.filter(q => q.category === question.category);
      const newOrder = categoryQuestions.length > 0 ? 
        Math.max(...categoryQuestions.map(q => q.order)) + 1 : 1;
      
      const newQuestion = {
        ...question,
        id: newId,
        order: question.order || newOrder
      };
      
      return [...prevQuestions, newQuestion];
    });
  };

  // 질문 수정
  const updateQuestion = (id, updatedQuestion) => {
    setQuestions(prevQuestions => 
      prevQuestions.map(question => 
        question.id === id ? { ...question, ...updatedQuestion } : question
      )
    );
  };

  // 질문 삭제
  const deleteQuestion = (id) => {
    setQuestions(prevQuestions => 
      prevQuestions.filter(question => question.id !== id)
    );
  };
  
  // 질문 순서 변경
  const reorderQuestions = (categoryId, newOrder) => {
    setQuestions(prevQuestions => {
      const categoryQuestions = prevQuestions.filter(q => q.category === categoryId);
      const otherQuestions = prevQuestions.filter(q => q.category !== categoryId);
      
      const updatedCategoryQuestions = newOrder.map((id, index) => {
        const question = categoryQuestions.find(q => q.id === id);
        return { ...question, order: index + 1 };
      });
      
      return [...otherQuestions, ...updatedCategoryQuestions];
    });
  };

  return {
    questions,
    categories,
    getAllQuestions,
    getQuestionsByCategory,
    getQuestionById,
    addQuestion,
    updateQuestion,
    deleteQuestion,
    reorderQuestions
  };
};

export default useFaqQuestions; 