import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import useNotices from '../../services/NoticeService';

const Container = styled.div`
  padding: 120px 20px 80px;
  min-height: 100vh;
  background-color: #DCE3E2;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const TitleIcon = styled.div`
  margin-right: 15px;
  font-size: 28px;
`;

const Title = styled.h1`
  font-size: 32px;
  color: #2A8191;
  font-weight: bold;
`;

const ContentBox = styled.div`
  max-width: 1000px;
  width: 100%;
  background-color: white;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const NoticeContainer = styled.div`
  margin-top: 20px;
`;

const SearchBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
`;

const SearchInput = styled.input`
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 30px;
  font-size: 16px;
  width: 300px;
  
  &:focus {
    outline: none;
    border-color: #2A8191;
    box-shadow: 0 0 0 2px rgba(42, 129, 145, 0.1);
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #2A8191;
  color: white;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  font-size: 16px;
  margin-left: 10px;
  
  &:hover {
    background-color: #1f6a77;
  }
`;

const NoticeList = styled.ul`
  list-style: none;
  padding: 0;
`;

const NoticeItem = styled.li`
  padding: 20px;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const PinnedNotice = styled(NoticeItem)`
  background-color: #f0f8ff;
  border-left: 4px solid #2A8191;
  
  &:hover {
    background-color: #e6f2ff;
  }
`;

const NoticeTitle = styled.div`
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: ${props => props.isPinned ? 'bold' : 'normal'};
  margin-bottom: 10px;
`;

const PinIcon = styled.span`
  margin-right: 10px;
  color: #f44336;
`;

const NoticeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #888;
`;

const NoticeDate = styled.span``;

const NoticeViews = styled.span``;

const NoticeDetail = styled.div`
  margin-top: 15px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 10px;
  white-space: pre-wrap;
  display: ${props => props.isOpen ? 'block' : 'none'};
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const PageButton = styled.button`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  border: 1px solid ${props => props.active ? '#2A8191' : '#ddd'};
  background-color: ${props => props.active ? '#2A8191' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.active ? '#2A8191' : '#f1f1f1'};
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const NoNotices = styled.div`
  text-align: center;
  padding: 50px 0;
  color: #888;
  font-size: 18px;
`;

const Notice = () => {
  const { notices, increaseViews } = useNotices();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredNotices, setFilteredNotices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [openNoticeId, setOpenNoticeId] = useState(null);
  
  const itemsPerPage = 5;
  
  // 페이지 진입 시 스크롤 위치를 상단으로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // 공지사항 필터링 및 정렬
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
  }, [notices, searchTerm]);
  
  // 현재 페이지의 공지사항
  const currentNotices = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // 총 페이지 수
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  
  // 공지사항 클릭 핸들러
  const handleNoticeClick = (noticeId) => {
    if (openNoticeId === noticeId) {
      setOpenNoticeId(null);
    } else {
      setOpenNoticeId(noticeId);
      increaseViews(noticeId);
    }
  };
  
  // 검색 핸들러
  const handleSearch = () => {
    setCurrentPage(1);
  };
  
  // 검색어 입력 핸들러
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // 검색어 엔터키 핸들러
  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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
      <TitleContainer>
        <TitleIcon>
          <span role="img" aria-label="공지사항">📋</span>
        </TitleIcon>
        <Title>공지사항</Title>
      </TitleContainer>
      
      <ContentBox>
        <NoticeContainer>
          <SearchBar>
            <div>
              <SearchInput 
                type="text" 
                placeholder="검색어를 입력하세요" 
                value={searchTerm}
                onChange={handleSearchChange}
                onKeyPress={handleSearchKeyPress}
              />
              <SearchButton onClick={handleSearch}>검색</SearchButton>
            </div>
          </SearchBar>
          
          {filteredNotices.length > 0 ? (
            <NoticeList>
              {currentNotices.map(notice => (
                notice.isPinned ? (
                  <PinnedNotice 
                    key={notice.id} 
                    onClick={() => handleNoticeClick(notice.id)}
                  >
                    <NoticeTitle isPinned={notice.isPinned}>
                      <PinIcon>📌</PinIcon>
                      {notice.title}
                    </NoticeTitle>
                    
                    <NoticeInfo>
                      <NoticeDate>{formatDate(notice.date)}</NoticeDate>
                      <NoticeViews>조회수: {notice.views}</NoticeViews>
                    </NoticeInfo>
                    
                    <NoticeDetail isOpen={openNoticeId === notice.id}>
                      {notice.content}
                    </NoticeDetail>
                  </PinnedNotice>
                ) : (
                  <NoticeItem 
                    key={notice.id} 
                    onClick={() => handleNoticeClick(notice.id)}
                  >
                    <NoticeTitle>
                      {notice.title}
                    </NoticeTitle>
                    
                    <NoticeInfo>
                      <NoticeDate>{formatDate(notice.date)}</NoticeDate>
                      <NoticeViews>조회수: {notice.views}</NoticeViews>
                    </NoticeInfo>
                    
                    <NoticeDetail isOpen={openNoticeId === notice.id}>
                      {notice.content}
                    </NoticeDetail>
                  </NoticeItem>
                )
              ))}
            </NoticeList>
          ) : (
            <NoNotices>
              {searchTerm ? '검색 결과가 없습니다.' : '등록된 공지사항이 없습니다.'}
            </NoNotices>
          )}
          
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
        </NoticeContainer>
      </ContentBox>
    </Container>
  );
};

export default Notice; 