import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useFaqQuestions from '../../services/QuestionsService';

const Container = styled.div`
  padding: 100px 20px 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-bottom: 20px;
  margin-top: 30px;
`;

const SearchSection = styled.div`
  display: flex;
  gap: 10px;
`;

const SearchInput = styled.input`
  width: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background-color: #444;
  }
`;

const FilterSection = styled.div`
  display: flex;
  gap: 10px;
`;

const FilterButton = styled.button`
  padding: 10px 15px;
  background-color: ${props => props.active ? '#4A90A7' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#333'};
  border: 1px solid ${props => props.active ? '#4A90A7' : '#ddd'};
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;

  &:hover {
    background-color: ${props => props.active ? '#357A8F' : '#e9ecef'};
  }
`;

const BackButton = styled(Link)`
  padding: 8px 16px;
  background-color: #4A90A7;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 10px;

  &:hover {
    background-color: #357A8F;
  }
`;

const ContentSection = styled.div`
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
`;

const PageTitle = styled.h1`
  font-size: 24px;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
  font-weight: bold;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  margin-top: 0;
`;

const QuestionsTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableHeader = styled.thead`
  background-color: #f8f9fa;
  border-top: 2px solid #333;
  border-bottom: 1px solid #ddd;
`;

const TableHeaderCell = styled.th`
  padding: 15px 10px;
  text-align: center;
  font-weight: bold;
  color: #333;
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const TableCell = styled.td`
  padding: 15px 10px;
  text-align: ${props => props.align || 'center'};
  vertical-align: middle;
  
  &.title {
    text-align: left;
  }
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => 
    props.category === '설치' ? '#4A90A7' : 
    props.category === '유지보수' ? '#28A745' : 
    props.category === '제품' ? '#6C757D' : '#FFC107'};
  color: white;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  border: 1px solid ${props => props.active ? '#4A90A7' : '#ddd'};
  background-color: ${props => props.active ? '#4A90A7' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#4A90A7' : '#f1f1f1'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 40px 0;
  color: #666;
  font-size: 18px;
`;

const AddButton = styled.button`
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background-color: #218838;
  }
`;

// 모달 관련 스타일 컴포넌트
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const ModalContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #4A90A7;
    box-shadow: 0 0 0 2px rgba(74, 144, 167, 0.25);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 15px;
  min-height: 150px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4A90A7;
    box-shadow: 0 0 0 2px rgba(74, 144, 167, 0.25);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #4A90A7;
    box-shadow: 0 0 0 2px rgba(74, 144, 167, 0.25);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: ${props => 
    props.primary ? '#4A90A7' : 
    props.danger ? '#dc3545' : '#e9ecef'};
  color: ${props => props.primary || props.danger ? 'white' : '#333'};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    background-color: ${props => 
      props.primary ? '#357A8F' : 
      props.danger ? '#bd2130' : '#dee2e6'};
  }
`;

// 삭제 확인 모달 스타일
const ConfirmModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 150;
`;

const ConfirmContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 400px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ConfirmText = styled.p`
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
`;

const QuestionsManage = () => {
  const { 
    questions, 
    categories, 
    addQuestion, 
    updateQuestion, 
    deleteQuestion 
  } = useFaqQuestions();
  
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState(null);
  
  // 페이지당 아이템 수
  const itemsPerPage = 10;
  
  // 폼 상태
  const [formState, setFormState] = useState({
    question: '',
    answer: '',
    category: '설치'
  });
  
  // 필터링 및 정렬
  useEffect(() => {
    let filtered = [...questions];
    
    // 카테고리로 필터링
    if (activeCategory !== 'all') {
      filtered = filtered.filter(q => q.category === activeCategory);
    }
    
    // 검색어로 필터링
    if (searchTerm) {
      filtered = filtered.filter(q => 
        q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        q.answer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 카테고리별 정렬 후 order별 정렬
    filtered.sort((a, b) => {
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.order - b.order;
    });
    
    setFilteredQuestions(filtered);
    
    // 페이지 조정
    const maxPage = Math.ceil(filtered.length / itemsPerPage);
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
    }
  }, [questions, searchTerm, activeCategory, currentPage]);
  
  // 현재 페이지의 질문
  const currentQuestions = filteredQuestions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // 총 페이지 수
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  
  // 질문 추가 모달 열기
  const handleAddClick = () => {
    setIsEditing(false);
    setFormState({
      question: '',
      answer: '',
      category: '설치'
    });
    setShowModal(true);
  };
  
  // 질문 수정 모달 열기
  const handleEditClick = (question, e) => {
    e.stopPropagation();
    setIsEditing(true);
    setSelectedQuestion(question);
    setFormState({
      question: question.question,
      answer: question.answer,
      category: question.category
    });
    setShowModal(true);
  };
  
  // 질문 삭제 확인 모달 열기
  const handleDeleteClick = (question, e) => {
    e.stopPropagation();
    setQuestionToDelete(question);
    setShowConfirmModal(true);
  };
  
  // 질문 삭제 실행
  const confirmDelete = () => {
    if (questionToDelete) {
      deleteQuestion(questionToDelete.id);
      setShowConfirmModal(false);
      setQuestionToDelete(null);
    }
  };
  
  // 질문 상세 모달 열기
  const handleQuestionClick = (question) => {
    setSelectedQuestion(question);
    setFormState({
      question: question.question,
      answer: question.answer,
      category: question.category
    });
    setIsEditing(false); // 읽기 모드로 설정
    setShowModal(true);
  };
  
  // 폼 입력 처리
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value
    });
  };
  
  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing && selectedQuestion) {
      // 수정
      updateQuestion(selectedQuestion.id, formState);
    } else {
      // 추가
      addQuestion(formState);
    }
    
    setShowModal(false);
  };
  
  // 검색 처리
  const handleSearch = () => {
    setCurrentPage(1);
  };
  
  // 검색어 변경 처리
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // 검색어 엔터키 처리
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };
  
  // 카테고리 필터 변경
  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };
  
  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQuestion(null);
  };
  
  // 페이지 진입 시 스크롤 위치를 상단으로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <Container>
      <PageTitle>자주 묻는 질문 관리</PageTitle>
      
      <Header>
        <FilterSection>
          {categories.map(category => (
            <FilterButton
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </FilterButton>
          ))}
        </FilterSection>
        
        <SearchSection>
          <SearchInput 
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
          <BackButton to="/admin">이전</BackButton>
        </SearchSection>
      </Header>
      
      <ContentSection>
        <QuestionsTable>
          <TableHeader>
            <tr>
              <TableHeaderCell width="5%">번호</TableHeaderCell>
              <TableHeaderCell width="15%">카테고리</TableHeaderCell>
              <TableHeaderCell width="35%">질문</TableHeaderCell>
              <TableHeaderCell width="30%">답변 미리보기</TableHeaderCell>
              <TableHeaderCell width="15%">관리</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {currentQuestions.length > 0 ? (
              currentQuestions.map((question, index) => (
                <TableRow 
                  key={question.id} 
                  onClick={() => handleQuestionClick(question)}
                >
                  <TableCell>{question.id}</TableCell>
                  <TableCell>
                    <CategoryBadge category={question.category}>
                      {question.category}
                    </CategoryBadge>
                  </TableCell>
                  <TableCell className="title" align="left">
                    {question.question}
                  </TableCell>
                  <TableCell align="left">
                    {question.answer.length > 50 
                      ? `${question.answer.substring(0, 50)}...` 
                      : question.answer}
                  </TableCell>
                  <TableCell>
                    <Button primary onClick={(e) => handleEditClick(question, e)}>
                      수정
                    </Button>
                    <Button danger onClick={(e) => handleDeleteClick(question, e)}>
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <NoResults>
                    {searchTerm || activeCategory !== 'all' 
                      ? '검색 결과가 없습니다.' 
                      : '등록된 질문이 없습니다.'}
                  </NoResults>
                </td>
              </tr>
            )}
          </TableBody>
        </QuestionsTable>
        
        {totalPages > 1 && (
          <Pagination>
            <PageButton 
              onClick={() => setCurrentPage(1)} 
              disabled={currentPage === 1}
            >
              &laquo;
            </PageButton>
            
            <PageButton 
              onClick={() => setCurrentPage(curr => Math.max(curr - 1, 1))} 
              disabled={currentPage === 1}
            >
              &lt;
            </PageButton>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = currentPage > 3 ? 
                (currentPage + i > totalPages ? totalPages - 4 + i : currentPage - 2 + i) : 
                i + 1;
              
              if (pageNum > 0 && pageNum <= totalPages) {
                return (
                  <PageButton 
                    key={pageNum} 
                    active={pageNum === currentPage}
                    onClick={() => setCurrentPage(pageNum)}
                  >
                    {pageNum}
                  </PageButton>
                );
              }
              return null;
            })}
            
            <PageButton 
              onClick={() => setCurrentPage(curr => Math.min(curr + 1, totalPages))} 
              disabled={currentPage === totalPages}
            >
              &gt;
            </PageButton>
            
            <PageButton 
              onClick={() => setCurrentPage(totalPages)} 
              disabled={currentPage === totalPages}
            >
              &raquo;
            </PageButton>
          </Pagination>
        )}
        
        <AddButton onClick={handleAddClick}>
          + 새 질문 추가
        </AddButton>
      </ContentSection>
      
      {/* 질문 추가/수정/조회 모달 */}
      {showModal && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              {isEditing ? '질문 수정' : selectedQuestion ? '질문 상세' : '새 질문 추가'}
            </ModalTitle>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="category">카테고리</Label>
                <Select 
                  id="category" 
                  name="category" 
                  value={formState.category} 
                  onChange={handleInputChange}
                  disabled={!isEditing && selectedQuestion}
                >
                  {categories.filter(c => c.id !== 'all').map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Select>
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="question">질문</Label>
                <Input 
                  type="text" 
                  id="question" 
                  name="question" 
                  value={formState.question} 
                  onChange={handleInputChange}
                  readOnly={!isEditing && selectedQuestion}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="answer">답변</Label>
                <TextArea 
                  id="answer" 
                  name="answer" 
                  value={formState.answer} 
                  onChange={handleInputChange}
                  readOnly={!isEditing && selectedQuestion}
                  required
                />
              </FormGroup>
              
              <ButtonGroup>
                {isEditing || !selectedQuestion ? (
                  <>
                    <Button type="submit" primary>
                      {isEditing ? '수정 완료' : '등록하기'}
                    </Button>
                    <Button type="button" onClick={handleCloseModal}>
                      취소
                    </Button>
                  </>
                ) : (
                  <>
                    <Button type="button" primary onClick={() => {
                      setIsEditing(true);
                    }}>
                      수정하기
                    </Button>
                    <Button type="button" danger onClick={() => {
                      handleCloseModal();
                      handleDeleteClick(selectedQuestion, { stopPropagation: () => {} });
                    }}>
                      삭제하기
                    </Button>
                    <Button type="button" onClick={handleCloseModal}>
                      닫기
                    </Button>
                  </>
                )}
              </ButtonGroup>
            </form>
          </ModalContainer>
        </ModalOverlay>
      )}
      
      {/* 삭제 확인 모달 */}
      {showConfirmModal && (
        <ConfirmModal>
          <ConfirmContent>
            <ConfirmText>
              정말 이 질문을 삭제하시겠습니까?
            </ConfirmText>
            <ButtonGroup style={{ justifyContent: 'center' }}>
              <Button danger onClick={confirmDelete}>삭제</Button>
              <Button onClick={() => setShowConfirmModal(false)}>취소</Button>
            </ButtonGroup>
          </ConfirmContent>
        </ConfirmModal>
      )}
    </Container>
  );
};

export default QuestionsManage; 