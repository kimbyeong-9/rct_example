import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useFaqQuestions from '../../services/QuestionsService';

const Container = styled.div`
  padding: 120px 20px 80px;
  min-height: 100vh;
  background-color: #DCE3E2;
  display: flex;
  justify-content: center;
`;

const ContentBox = styled.div`
  max-width: 1000px;
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

const Subtitle = styled.p`
  font-size: 16px;
  color: #666;
  text-align: center;
  margin-bottom: 40px;
`;

const CategorySection = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
`;

const CategoryButton = styled.button`
  padding: 10px 20px;
  background-color: ${props => props.active ? '#2A8191' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#2A8191' : '#ddd'};
  border-radius: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#236b77' : '#f5f5f5'};
  }
`;

const QuestionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 30px;
`;

const QuestionItem = styled.div`
  border: 1px solid #e9ecef;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
`;

const QuestionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  background-color: ${props => props.isOpen ? '#f0f7f9' : '#f8f9fa'};
  cursor: pointer;
  
  &:hover {
    background-color: #e9ecef;
  }
`;

const QuestionTitle = styled.h3`
  font-size: 17px;
  color: ${props => props.isOpen ? '#2A8191' : '#333'};
  font-weight: ${props => props.isOpen ? '600' : '500'};
`;

const ToggleIcon = styled.span`
  font-size: 18px;
  transition: transform 0.3s ease;
  transform: ${props => props.isOpen ? 'rotate(180deg)' : 'rotate(0)'};
  color: ${props => props.isOpen ? '#2A8191' : '#666'};
`;

const AnswerContent = styled.div`
  padding: ${props => props.isOpen ? '25px 20px' : '0 20px'};
  max-height: ${props => props.isOpen ? '500px' : '0'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease;
  background-color: white;
  overflow: hidden;
  
  p {
    font-size: 16px;
    line-height: 1.8;
    color: #555;
    margin: 0;
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 12px;
  margin-right: 10px;
  font-weight: 500;
  background-color: ${props => 
    props.category === '설치' ? '#4A90A7' : 
    props.category === '유지보수' ? '#28A745' : '#6C757D'};
  color: white;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-size: 18px;
`;

const Questions = () => {
  const { questions, categories } = useFaqQuestions();
  const [openQuestions, setOpenQuestions] = useState({});
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  
  // 카테고리 변경 핸들러
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
  };
  
  // 질문 필터링
  useEffect(() => {
    let filtered = [...questions];
    
    if (activeCategory !== 'all') {
      filtered = filtered.filter(q => q.category === activeCategory);
    }
    
    // 카테고리별 정렬 후 order 기준 정렬
    filtered.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.order - b.order;
    });
    
    setFilteredQuestions(filtered);
  }, [questions, activeCategory]);
  
  const toggleQuestion = (id) => {
    setOpenQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };
  
  return (
    <Container>
      <ContentBox>
        <Title>자주 묻는 질문</Title>
        <Subtitle>진우ENG의 덕트 설치 관련 질문과 답변입니다</Subtitle>
        
        <CategorySection>
          {categories.map(category => (
            <CategoryButton 
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </CategoryButton>
          ))}
        </CategorySection>
        
        <QuestionList>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map(faq => (
              <QuestionItem key={faq.id}>
                <QuestionHeader 
                  onClick={() => toggleQuestion(faq.id)}
                  isOpen={openQuestions[faq.id]}
                >
                  <QuestionTitle isOpen={openQuestions[faq.id]}>
                    <CategoryBadge category={faq.category}>{faq.category}</CategoryBadge>
                    {faq.question}
                  </QuestionTitle>
                  <ToggleIcon isOpen={openQuestions[faq.id]}>▼</ToggleIcon>
                </QuestionHeader>
                <AnswerContent isOpen={openQuestions[faq.id]}>
                  <p>{faq.answer}</p>
                </AnswerContent>
              </QuestionItem>
            ))
          ) : (
            <NoResults>
              {activeCategory !== 'all' 
                ? '해당 카테고리에 등록된 질문이 없습니다.' 
                : '등록된 질문이 없습니다.'}
            </NoResults>
          )}
        </QuestionList>
      </ContentBox>
    </Container>
  );
};

export default Questions; 