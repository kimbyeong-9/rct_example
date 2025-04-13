import { useState, useEffect } from 'react';

// localStorage에서 데이터를 불러오는 함수
const loadFromStorage = () => {
  try {
    const postsData = localStorage.getItem('installationPosts');
    return postsData ? JSON.parse(postsData) : null;
  } catch (error) {
    console.error('Error loading data from localStorage:', error);
    return null;
  }
};

// localStorage에 데이터를 저장하는 함수
const saveToStorage = (data) => {
  try {
    localStorage.setItem('installationPosts', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data to localStorage:', error);
  }
};

// 초기 설치시공 카테고리 및 게시물 데이터
const initialCategories = [
  {
    id: 'upsidedown',
    name: '상/하향식닥트', 
    expanded: false,
    posts: [
      { id: 1, title: '상향식 닥트 시공 사례', content: '상향식 닥트 시공 사례에 대한 상세 내용입니다.', images: [] },
      { id: 2, title: '하향식 닥트 설치 안내', content: '하향식 닥트 설치 안내에 대한 상세 내용입니다.', images: [] }
    ]
  },
  {
    id: 'ventilation',
    name: '급배기닥트', 
    expanded: false,
    posts: [
      { id: 3, title: '급배기 닥트 설치 사례', content: '급배기 닥트 설치 사례에 대한 상세 내용입니다.', images: [] },
      { id: 4, title: '배기 닥트 유지보수 방법', content: '배기 닥트 유지보수 방법에 대한 상세 내용입니다.', images: [] }
    ]
  },
  {
    id: 'cafeteria',
    name: '급식실닥트', 
    expanded: false,
    posts: [
      { id: 5, title: '학교 급식실 닥트 시공', content: '학교 급식실 닥트 시공에 대한 상세 내용입니다.', images: [] }
    ]
  },
  {
    id: 'collector',
    name: '집진기설치', 
    expanded: false,
    posts: [
      { id: 6, title: '집진기 전문 설치', content: '집진기 전문 설치에 대한 상세 내용입니다.', images: [] }
    ]
  },
  {
    id: 'construction',
    name: '각종건설닥트', 
    expanded: false,
    posts: [
      { id: 7, title: '건설현장 닥트 시공', content: '건설현장 닥트 시공에 대한 상세 내용입니다.', images: [] }
    ]
  }
];

// 카테고리와 게시물을 관리하는 함수
export const useInstallationPosts = () => {
  const [categories, setCategories] = useState(() => {
    const storedData = loadFromStorage();
    return storedData || initialCategories;
  });

  // 카테고리 데이터가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    saveToStorage(categories);
  }, [categories]);

  // 게시물 목록 가져오기
  const getAllPosts = () => categories;

  // 특정 카테고리의 게시물 가져오기
  const getPostsByCategory = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.posts : [];
  };

  // 특정 게시물 가져오기
  const getPostById = (categoryId, postId) => {
    const category = categories.find(cat => cat.id === categoryId);
    if (!category) return null;
    
    return category.posts.find(post => post.id === postId) || null;
  };

  // 게시물 추가
  const addPost = (categoryId, post) => {
    setCategories(prevCategories => {
      const newCategories = [...prevCategories];
      const categoryIndex = newCategories.findIndex(cat => cat.id === categoryId);
      
      if (categoryIndex !== -1) {
        const newPostId = Math.max(...newCategories[categoryIndex].posts.map(p => p.id), 0) + 1;
        newCategories[categoryIndex].posts.push({
          ...post,
          id: newPostId
        });
      }
      
      return newCategories;
    });
  };

  // 게시물 수정
  const updatePost = (categoryId, postId, updatedPost) => {
    setCategories(prevCategories => {
      const newCategories = [...prevCategories];
      const categoryIndex = newCategories.findIndex(cat => cat.id === categoryId);
      
      if (categoryIndex !== -1) {
        const postIndex = newCategories[categoryIndex].posts.findIndex(p => p.id === postId);
        
        if (postIndex !== -1) {
          newCategories[categoryIndex].posts[postIndex] = {
            ...newCategories[categoryIndex].posts[postIndex],
            ...updatedPost,
            id: postId
          };
        }
      }
      
      return newCategories;
    });
  };

  // 게시물 삭제
  const deletePost = (categoryId, postId) => {
    setCategories(prevCategories => {
      const newCategories = [...prevCategories];
      const categoryIndex = newCategories.findIndex(cat => cat.id === categoryId);
      
      if (categoryIndex !== -1) {
        newCategories[categoryIndex].posts = newCategories[categoryIndex].posts.filter(
          p => p.id !== postId
        );
      }
      
      return newCategories;
    });
  };

  // 전체 데이터 업데이트
  const updateCategories = (newCategories) => {
    setCategories(newCategories);
  };

  return {
    categories,
    getAllPosts,
    getPostsByCategory,
    getPostById,
    addPost,
    updatePost,
    deletePost,
    updateCategories
  };
};

// 이미지 파일을 Base64로 변환하는 유틸리티 함수
export const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

export default useInstallationPosts; 