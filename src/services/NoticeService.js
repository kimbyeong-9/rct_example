import { useState, useEffect } from 'react';

// localStorage에서 데이터를 불러오는 함수
const loadFromStorage = () => {
  try {
    const noticeData = localStorage.getItem('noticeItems');
    return noticeData ? JSON.parse(noticeData) : null;
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return null;
  }
};

// localStorage에 데이터를 저장하는 함수
const saveToStorage = (data) => {
  try {
    localStorage.setItem('noticeItems', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// 초기 공지사항 데이터
const initialNotices = [
  {
    id: 1,
    title: '홈페이지가 오픈되었습니다',
    content: '진우ENG의 홈페이지가 새롭게 오픈되었습니다. 다양한 서비스를 이용해 보세요.',
    date: '2023-05-15',
    isPinned: true,
    views: 128
  },
  {
    id: 2,
    title: '여름맞이 닥트 설치 할인 이벤트',
    content: '여름을 맞아 닥트 설치 할인 이벤트를 진행합니다. 자세한 내용은 문의 바랍니다.',
    date: '2023-06-01',
    isPinned: false,
    views: 92
  },
  {
    id: 3,
    title: '추석 연휴 휴무 안내',
    content: '추석 연휴 기간(9월 28일 ~ 10월 2일)에는 휴무입니다. 긴급 문의는 연락처로 남겨주세요.',
    date: '2023-09-20',
    isPinned: false,
    views: 75
  }
];

// 공지사항을 관리하는 함수
export const useNotices = () => {
  const [notices, setNotices] = useState(() => {
    const storedData = loadFromStorage();
    return storedData || initialNotices;
  });

  // 공지사항 데이터가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    saveToStorage(notices);
  }, [notices]);

  // 모든 공지사항 가져오기
  const getAllNotices = () => notices;

  // 특정 공지사항 가져오기
  const getNoticeById = (id) => {
    return notices.find(notice => notice.id === id) || null;
  };

  // 공지사항 추가
  const addNotice = (notice) => {
    setNotices(prevNotices => {
      const newId = Math.max(0, ...prevNotices.map(n => n.id)) + 1;
      const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식
      
      const newNotice = {
        ...notice,
        id: newId,
        date: notice.date || currentDate,
        views: 0
      };
      
      return [...prevNotices, newNotice];
    });
  };

  // 공지사항 수정
  const updateNotice = (id, updatedNotice) => {
    setNotices(prevNotices => 
      prevNotices.map(notice => 
        notice.id === id ? { ...notice, ...updatedNotice } : notice
      )
    );
  };

  // 공지사항 삭제
  const deleteNotice = (id) => {
    setNotices(prevNotices => 
      prevNotices.filter(notice => notice.id !== id)
    );
  };

  // 공지사항 고정/고정해제
  const togglePin = (id) => {
    setNotices(prevNotices => {
      // 이미 고정된 공지사항이 있는지 확인
      const hasPinned = prevNotices.some(notice => notice.id !== id && notice.isPinned);
      
      return prevNotices.map(notice => {
        if (notice.id === id) {
          // 선택한 공지사항의 고정 상태 전환
          return { ...notice, isPinned: !notice.isPinned };
        }
        return notice;
      });
    });
  };

  // 조회수 증가
  const increaseViews = (id) => {
    setNotices(prevNotices =>
      prevNotices.map(notice =>
        notice.id === id ? { ...notice, views: (notice.views || 0) + 1 } : notice
      )
    );
  };

  return {
    notices,
    getAllNotices,
    getNoticeById,
    addNotice,
    updateNotice,
    deleteNotice,
    togglePin,
    increaseViews
  };
};

export default useNotices; 