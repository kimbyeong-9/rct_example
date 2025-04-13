import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useNotices from '../../services/NoticeService';

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

const NoticeTable = styled.table`
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
  background-color: ${props => props.isPinned ? '#f0f8ff' : 'transparent'};
  
  &:hover {
    background-color: ${props => props.isPinned ? '#e1f0ff' : '#f9f9f9'};
  }
`;

const TableCell = styled.td`
  padding: 15px 10px;
  text-align: ${props => props.align || 'center'};
  vertical-align: middle;
  
  &.title {
    text-align: left;
    font-weight: ${props => props.isPinned ? 'bold' : 'normal'};
  }
`;

const PinIcon = styled.span`
  margin-right: 8px;
  color: #f44336;
`;

const ActionButton = styled.button`
  padding: 6px 12px;
  background-color: ${props => 
    props.edit ? '#4A90A7' : 
    props.delete ? '#dc3545' : 
    props.pin ? '#ffc107' : '#6c757d'};
  color: white;
  border: none;
  border-radius: 4px;
  margin: 0 3px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s;
  
  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }
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

const Modal = styled.div`
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

const ModalContent = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  width: 600px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 20px;
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
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #4A90A7;
    box-shadow: 0 0 0 2px rgba(74, 144, 167, 0.25);
  }
`;

const Checkbox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  
  input {
    margin: 0;
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
  background-color: ${props => props.primary ? '#4A90A7' : props.danger ? '#dc3545' : '#6c757d'};
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  
  &:hover {
    opacity: 0.9;
  }
`;

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

const NoticeManage = () => {
  const { 
    notices, 
    addNotice, 
    updateNotice, 
    deleteNotice, 
    togglePin 
  } = useNotices();
  
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentNotice, setCurrentNotice] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [noticeToDelete, setNoticeToDelete] = useState(null);
  
  // 페이지당 아이템 수
  const itemsPerPage = 10;
  
  // 폼 상태
  const [formState, setFormState] = useState({
    title: '',
    content: '',
    isPinned: false,
    date: new Date().toISOString().split('T')[0]
  });
  
  // 공지사항 필터링 및 페이지네이션
  useEffect(() => {
    let filtered = [...notices];
    
    // 검색어로 필터링
    if (searchTerm) {
      filtered = filtered.filter(notice => 
        notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 고정 공지를 맨 위로 정렬하고, 나머지는 날짜 내림차순 정렬
    filtered.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.date) - new Date(a.date);
    });
    
    setFilteredNotices(filtered);
    
    // 페이지 조정
    const maxPage = Math.ceil(filtered.length / itemsPerPage);
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
    }
  }, [notices, searchTerm, currentPage]);
  
  // 현재 페이지의 공지사항
  const currentNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // 페이지네이션 버튼
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  
  // 공지사항 추가 모달 열기
  const handleAddClick = () => {
    setIsEditing(false);
    setFormState({
      title: '',
      content: '',
      isPinned: false,
      date: new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };
  
  // 공지사항 수정 모달 열기
  const handleEditClick = (notice, e) => {
    e.stopPropagation();
    setIsEditing(true);
    setCurrentNotice(notice);
    setFormState({
      title: notice.title,
      content: notice.content,
      isPinned: notice.isPinned,
      date: notice.date
    });
    setShowModal(true);
  };
  
  // 공지사항 삭제 확인 모달 열기
  const handleDeleteClick = (notice, e) => {
    e.stopPropagation();
    setNoticeToDelete(notice);
    setShowConfirmModal(true);
  };
  
  // 공지사항 삭제 실행
  const confirmDelete = () => {
    if (noticeToDelete) {
      deleteNotice(noticeToDelete.id);
      setShowConfirmModal(false);
      setNoticeToDelete(null);
    }
  };
  
  // 공지사항 핀 토글
  const handlePinClick = (notice, e) => {
    e.stopPropagation();
    togglePin(notice.id);
  };
  
  // 공지사항 상세 모달 열기
  const handleRowClick = (notice) => {
    setCurrentNotice(notice);
    setFormState({
      title: notice.title,
      content: notice.content,
      isPinned: notice.isPinned,
      date: notice.date
    });
    setIsEditing(false); // 읽기 모드로 설정
    setShowModal(true);
  };
  
  // 폼 입력 처리
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState({
      ...formState,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // 폼 제출 처리
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing && currentNotice) {
      // 수정
      updateNotice(currentNotice.id, formState);
    } else {
      // 추가
      addNotice(formState);
    }
    
    setShowModal(false);
  };
  
  // 검색 처리
  const handleSearch = () => {
    setCurrentPage(1); // 검색 시 첫 페이지로 리셋
  };
  
  // 검색어 입력 처리
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // 검색어 입력 엔터키 이벤트
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Container>
      <PageTitle>공지사항 관리</PageTitle>
      
      <Header>
        <SearchSection>
          <SearchInput 
            type="text" 
            placeholder="검색어를 입력하세요" 
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyPress={handleSearchKeyPress}
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchSection>
        <BackButton to="/admin">이전</BackButton>
      </Header>
      
      <ContentSection>
        <NoticeTable>
          <TableHeader>
            <tr>
              <TableHeaderCell width="10%">번호</TableHeaderCell>
              <TableHeaderCell width="50%">제목</TableHeaderCell>
              <TableHeaderCell width="15%">등록일</TableHeaderCell>
              <TableHeaderCell width="10%">조회수</TableHeaderCell>
              <TableHeaderCell width="15%">관리</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {currentNotices.length > 0 ? (
              currentNotices.map(notice => (
                <TableRow key={notice.id} isPinned={notice.isPinned} onClick={() => handleRowClick(notice)}>
                  <TableCell>
                    {notice.isPinned ? (
                      <PinIcon>📌</PinIcon>
                    ) : (
                      notice.id
                    )}
                  </TableCell>
                  <TableCell className="title" isPinned={notice.isPinned} align="left">
                    {notice.title}
                  </TableCell>
                  <TableCell>{notice.date}</TableCell>
                  <TableCell>{notice.views}</TableCell>
                  <TableCell>
                    <ActionButton edit onClick={(e) => handleEditClick(notice, e)}>
                      수정
                    </ActionButton>
                    <ActionButton delete onClick={(e) => handleDeleteClick(notice, e)}>
                      삭제
                    </ActionButton>
                    <ActionButton pin onClick={(e) => handlePinClick(notice, e)}>
                      {notice.isPinned ? '고정해제' : '고정'}
                    </ActionButton>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <td colSpan="5">
                  <NoResults>
                    {searchTerm ? '검색 결과가 없습니다.' : '등록된 공지사항이 없습니다.'}
                  </NoResults>
                </td>
              </tr>
            )}
          </TableBody>
        </NoticeTable>
        
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
          + 새 공지사항 작성
        </AddButton>
      </ContentSection>
      
      {/* 공지사항 추가/수정/조회 모달 */}
      {showModal && (
        <Modal onClick={() => setShowModal(false)}>
          <ModalContent onClick={e => e.stopPropagation()}>
            <ModalTitle>
              {isEditing ? '공지사항 수정' : currentNotice ? '공지사항 상세' : '새 공지사항 작성'}
            </ModalTitle>
            
            <form onSubmit={handleSubmit}>
              <FormGroup>
                <Label htmlFor="title">제목</Label>
                <Input 
                  type="text" 
                  id="title" 
                  name="title" 
                  value={formState.title} 
                  onChange={handleInputChange}
                  readOnly={!isEditing && currentNotice}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="content">내용</Label>
                <TextArea 
                  id="content" 
                  name="content" 
                  value={formState.content} 
                  onChange={handleInputChange}
                  readOnly={!isEditing && currentNotice}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="date">등록일</Label>
                <Input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={formState.date} 
                  onChange={handleInputChange}
                  readOnly={!isEditing && currentNotice}
                />
              </FormGroup>
              
              <Checkbox>
                <input 
                  type="checkbox" 
                  id="isPinned" 
                  name="isPinned" 
                  checked={formState.isPinned} 
                  onChange={handleInputChange}
                  disabled={!isEditing && currentNotice}
                />
                <Label htmlFor="isPinned" style={{ marginBottom: 0 }}>
                  상단 고정
                </Label>
              </Checkbox>
              
              <ButtonGroup>
                {isEditing || !currentNotice ? (
                  <>
                    <Button type="submit" primary>
                      {isEditing ? '수정 완료' : '등록하기'}
                    </Button>
                    <Button type="button" onClick={() => setShowModal(false)}>
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
                      setShowModal(false);
                      handleDeleteClick(currentNotice, { stopPropagation: () => {} });
                    }}>
                      삭제하기
                    </Button>
                    <Button type="button" onClick={() => setShowModal(false)}>
                      닫기
                    </Button>
                  </>
                )}
              </ButtonGroup>
            </form>
          </ModalContent>
        </Modal>
      )}
      
      {/* 삭제 확인 모달 */}
      {showConfirmModal && (
        <ConfirmModal>
          <ConfirmContent>
            <ConfirmText>
              정말 이 공지사항을 삭제하시겠습니까?
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

export default NoticeManage; 