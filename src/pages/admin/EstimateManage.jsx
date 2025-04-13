import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useEstimates from '../../services/EstimateService';

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

const EstimatesTable = styled.table`
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

const StatusBadge = styled.span`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background-color: ${props => 
    props.status === '대기중' ? '#ffc107' : 
    props.status === '처리중' ? '#17a2b8' : 
    props.status === '완료' ? '#28a745' : '#6c757d'};
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

const EstimateDetailItem = styled.div`
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
  
  &:last-child {
    border-bottom: none;
  }
`;

const EstimateDetailLabel = styled.h4`
  margin: 0;
  color: #666;
  font-size: 14px;
  font-weight: 600;
`;

const EstimateDetailValue = styled.p`
  margin: 5px 0 0;
  color: #333;
  font-size: 16px;
`;

const MODAL_TYPES = {
  VIEW: 'view',
  REPLY: 'reply',
  DELETE: 'delete',
  DELETE_COMPLETE: 'delete_complete'
};

const EstimateManage = () => {
  const { 
    estimates, 
    updateEstimate, 
    deleteEstimate 
  } = useEstimates();
  
  const [filteredEstimates, setFilteredEstimates] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeStatus, setActiveStatus] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [selectedEstimate, setSelectedEstimate] = useState(null);
  const [modalType, setModalType] = useState(MODAL_TYPES.VIEW);
  const [estimateToDelete, setEstimateToDelete] = useState(null);
  
  // 답변 상태
  const [replyStatus, setReplyStatus] = useState('처리중');
  const [replyContent, setReplyContent] = useState('');
  
  // 페이지당 아이템 수
  const itemsPerPage = 10;

  // 상태 필터 옵션
  const statusOptions = [
    { id: 'all', name: '전체' },
    { id: '대기중', name: '대기중' },
    { id: '처리중', name: '처리중' },
    { id: '완료', name: '완료' }
  ];
  
  // 페이지 진입 시 스크롤 위치를 상단으로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // 견적문의 필터링 및 정렬
  useEffect(() => {
    let filtered = [...estimates];
    
    // 상태로 필터링
    if (activeStatus !== 'all') {
      filtered = filtered.filter(e => e.status === activeStatus);
    }
    
    // 검색어로 필터링
    if (searchTerm) {
      filtered = filtered.filter(e => 
        e.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.phone.includes(searchTerm) ||
        e.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.details.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // 날짜별 내림차순 정렬
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    setFilteredEstimates(filtered);
    
    // 페이지 조정
    const maxPage = Math.ceil(filtered.length / itemsPerPage);
    if (currentPage > maxPage && maxPage > 0) {
      setCurrentPage(maxPage);
    }
  }, [estimates, searchTerm, activeStatus, currentPage]);
  
  // 현재 페이지의 견적문의
  const currentEstimates = filteredEstimates.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // 총 페이지 수
  const totalPages = Math.ceil(filteredEstimates.length / itemsPerPage);
  
  // 견적문의 클릭 핸들러
  const handleEstimateClick = (estimate) => {
    setSelectedEstimate(estimate);
    setReplyStatus(estimate.status);
    setReplyContent(estimate.reply);
    setModalType(MODAL_TYPES.VIEW);
    setShowModal(true);
  };
  
  // 답변 모달 열기
  const handleReplyClick = (estimate, e) => {
    e.stopPropagation();
    setSelectedEstimate(estimate);
    setReplyStatus(estimate.status);
    setReplyContent(estimate.reply);
    setModalType(MODAL_TYPES.REPLY);
    setShowModal(true);
  };
  
  // 삭제 확인 모달 열기
  const handleDeleteClick = (estimate, e) => {
    e.stopPropagation();
    setEstimateToDelete(estimate);
    setShowConfirmModal(true);
  };
  
  // 견적문의 삭제 실행
  const confirmDelete = () => {
    if (estimateToDelete) {
      deleteEstimate(estimateToDelete.id);
      setShowConfirmModal(false);
      setEstimateToDelete(null);
    }
  };
  
  // 답변 저장
  const saveReply = () => {
    if (selectedEstimate) {
      updateEstimate(selectedEstimate.id, {
        status: replyStatus,
        reply: replyContent
      });
      setShowModal(false);
    }
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
  
  // 상태 필터 변경
  const handleStatusChange = (statusId) => {
    setActiveStatus(statusId);
    setCurrentPage(1);
  };
  
  // 모달 닫기
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEstimate(null);
  };
  
  // 날짜 포맷 함수
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  
  return (
    <Container>
      <PageTitle>견적문의 관리</PageTitle>
      
      <Header>
        <FilterSection>
          {statusOptions.map(status => (
            <FilterButton
              key={status.id}
              active={activeStatus === status.id}
              onClick={() => handleStatusChange(status.id)}
            >
              {status.name}
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
        <EstimatesTable>
          <TableHeader>
            <tr>
              <TableHeaderCell width="5%">번호</TableHeaderCell>
              <TableHeaderCell width="10%">이름</TableHeaderCell>
              <TableHeaderCell width="15%">연락처</TableHeaderCell>
              <TableHeaderCell width="15%">서비스</TableHeaderCell>
              <TableHeaderCell width="15%">위치</TableHeaderCell>
              <TableHeaderCell width="10%">날짜</TableHeaderCell>
              <TableHeaderCell width="10%">상태</TableHeaderCell>
              <TableHeaderCell width="20%">관리</TableHeaderCell>
            </tr>
          </TableHeader>
          <TableBody>
            {currentEstimates.length > 0 ? (
              currentEstimates.map((estimate, index) => (
                <TableRow 
                  key={estimate.id} 
                  onClick={() => handleEstimateClick(estimate)}
                >
                  <TableCell>{estimate.id}</TableCell>
                  <TableCell>{estimate.name}</TableCell>
                  <TableCell>{estimate.phone}</TableCell>
                  <TableCell>{estimate.service}</TableCell>
                  <TableCell>{estimate.location}</TableCell>
                  <TableCell>{formatDate(estimate.date)}</TableCell>
                  <TableCell>
                    <StatusBadge status={estimate.status}>
                      {estimate.status}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <Button primary onClick={(e) => handleReplyClick(estimate, e)}>
                      답변
                    </Button>
                    <Button danger onClick={(e) => handleDeleteClick(estimate, e)}>
                      삭제
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <tr>
                <td colSpan="8">
                  <NoResults>
                    {searchTerm || activeStatus !== 'all' 
                      ? '검색 결과가 없습니다.' 
                      : '등록된 견적문의가 없습니다.'}
                  </NoResults>
                </td>
              </tr>
            )}
          </TableBody>
        </EstimatesTable>
        
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
      </ContentSection>
      
      {/* 견적문의 상세/답변 모달 */}
      {showModal && selectedEstimate && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            <ModalTitle>
              {modalType === MODAL_TYPES.VIEW ? '견적문의 상세' : '답변 작성'}
            </ModalTitle>
            
            <EstimateDetailItem>
              <EstimateDetailLabel>이름</EstimateDetailLabel>
              <EstimateDetailValue>{selectedEstimate.name}</EstimateDetailValue>
            </EstimateDetailItem>
            
            <EstimateDetailItem>
              <EstimateDetailLabel>연락처</EstimateDetailLabel>
              <EstimateDetailValue>{selectedEstimate.phone}</EstimateDetailValue>
            </EstimateDetailItem>
            
            {selectedEstimate.email && (
              <EstimateDetailItem>
                <EstimateDetailLabel>이메일</EstimateDetailLabel>
                <EstimateDetailValue>{selectedEstimate.email}</EstimateDetailValue>
              </EstimateDetailItem>
            )}
            
            <EstimateDetailItem>
              <EstimateDetailLabel>서비스 종류</EstimateDetailLabel>
              <EstimateDetailValue>{selectedEstimate.service}</EstimateDetailValue>
            </EstimateDetailItem>
            
            <EstimateDetailItem>
              <EstimateDetailLabel>설치 위치</EstimateDetailLabel>
              <EstimateDetailValue>{selectedEstimate.location}</EstimateDetailValue>
            </EstimateDetailItem>
            
            <EstimateDetailItem>
              <EstimateDetailLabel>상세 내용</EstimateDetailLabel>
              <EstimateDetailValue>{selectedEstimate.details}</EstimateDetailValue>
            </EstimateDetailItem>
            
            <EstimateDetailItem>
              <EstimateDetailLabel>접수일</EstimateDetailLabel>
              <EstimateDetailValue>{formatDate(selectedEstimate.date)}</EstimateDetailValue>
            </EstimateDetailItem>
            
            {modalType === MODAL_TYPES.VIEW ? (
              <>
                <EstimateDetailItem>
                  <EstimateDetailLabel>상태</EstimateDetailLabel>
                  <EstimateDetailValue>
                    <StatusBadge status={selectedEstimate.status}>
                      {selectedEstimate.status}
                    </StatusBadge>
                  </EstimateDetailValue>
                </EstimateDetailItem>
                
                {selectedEstimate.reply && (
                  <EstimateDetailItem>
                    <EstimateDetailLabel>답변</EstimateDetailLabel>
                    <EstimateDetailValue>{selectedEstimate.reply}</EstimateDetailValue>
                  </EstimateDetailItem>
                )}
                
                <ButtonGroup>
                  <Button primary onClick={() => setModalType(MODAL_TYPES.REPLY)}>
                    답변 작성
                  </Button>
                  <Button onClick={handleCloseModal}>
                    닫기
                  </Button>
                </ButtonGroup>
              </>
            ) : (
              <>
                <FormGroup>
                  <Label htmlFor="status">상태</Label>
                  <Select 
                    id="status" 
                    value={replyStatus} 
                    onChange={(e) => setReplyStatus(e.target.value)}
                  >
                    <option value="대기중">대기중</option>
                    <option value="처리중">처리중</option>
                    <option value="완료">완료</option>
                  </Select>
                </FormGroup>
                
                <FormGroup>
                  <Label htmlFor="reply">답변 내용</Label>
                  <TextArea 
                    id="reply" 
                    value={replyContent} 
                    onChange={(e) => setReplyContent(e.target.value)} 
                    placeholder="고객에게 전달할 답변을 작성하세요"
                  />
                </FormGroup>
                
                <ButtonGroup>
                  <Button primary onClick={saveReply}>
                    저장
                  </Button>
                  <Button onClick={handleCloseModal}>
                    취소
                  </Button>
                </ButtonGroup>
              </>
            )}
          </ModalContainer>
        </ModalOverlay>
      )}
      
      {/* 삭제 확인 모달 */}
      {showConfirmModal && (
        <ConfirmModal>
          <ConfirmContent>
            <ConfirmText>
              정말 이 견적문의를 삭제하시겠습니까?
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

export default EstimateManage; 