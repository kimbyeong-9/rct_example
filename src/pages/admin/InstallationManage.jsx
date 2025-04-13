import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useInstallationPosts, { fileToBase64 } from '../../services/PostsService';

const Container = styled.div`
  padding: 100px 20px 20px;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Header = styled.div`
  display: flex;
  justify-content: flex-end;
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
  width: 400px;
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
  background-color: #999;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  padding: 20px;
`;

const CategoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const CategoryItem = styled.li`
  border-bottom: 1px solid #eee;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  background-color: white;
  position: relative;

  &:first-child {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
  }

  &:last-child {
    border-bottom: none;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  &:before {
    content: "●";
    color: #333;
    margin-right: 10px;
  }
`;

const ExpandButton = styled.button`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #444;
  }
`;

const SaveButton = styled.button`
  padding: 10px 20px;
  background-color: #4A90A7;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  float: right;

  &:hover {
    background-color: #357A8F;
  }
`;

const ExpandedContent = styled.div`
  background-color: #f8f8f8;
  padding: 15px;
  border-bottom-left-radius: ${props => props.isLast ? '10px' : '0'};
  border-bottom-right-radius: ${props => props.isLast ? '10px' : '0'};
  display: ${props => props.expanded ? 'block' : 'none'};
`;

const PostList = styled.ul`
  list-style: none;
  padding: 0;
`;

const PostItem = styled.li`
  padding: 10px;
  background-color: white;
  margin-bottom: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostTitle = styled.span`
  font-weight: ${props => props.isEditing ? 'normal' : 'bold'};
`;

const PostInput = styled.input`
  width: 60%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
`;

const PostTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
  min-height: 100px;
`;

const ImageUploadSection = styled.div`
  margin-top: 15px;
  border: 1px dashed #ccc;
  padding: 15px;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const ImageUploadLabel = styled.label`
  display: inline-block;
  padding: 8px 15px;
  background-color: #4A90A7;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-right: 10px;
  
  &:hover {
    background-color: #357A8F;
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 15px;
`;

const ImagePreview = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: hidden;
`;

const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  width: 20px;
  height: 20px;
  background-color: rgba(220, 53, 69, 0.8);
  color: white;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 12px;
  
  &:hover {
    background-color: rgba(220, 53, 69, 1);
  }
`;

const NoPreviousImages = styled.div`
  color: #777;
  font-style: italic;
  margin-top: 5px;
`;

const PostActions = styled.div`
  display: flex;
  gap: 5px;
`;

const ActionButton = styled.button`
  padding: 5px 10px;
  background-color: ${props => props.color || '#333'};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`;

const AddPostButton = styled.button`
  padding: 8px 15px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 5px;
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    background-color: #218838;
  }
`;

const EditModeButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
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
  width: 400px;
  max-width: 90%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 20px;
  color: #333;
  font-size: 18px;
  text-align: center;
`;

const ModalButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-top: 20px;
`;

const ModalButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  font-size: 14px;
  cursor: pointer;
  background-color: ${props => props.primary ? '#4A90A7' : '#e9ecef'};
  color: ${props => props.primary ? 'white' : '#333'};
  
  &:hover {
    background-color: ${props => props.primary ? '#357A8F' : '#dee2e6'};
  }
`;

// 모달 타입 상수
const MODAL_TYPES = {
  SAVE: 'save',
  DELETE: 'delete',
  DELETE_COMPLETE: 'delete_complete'
};

const InstallationManage = () => {
  const { 
    categories, 
    updateCategories, 
    addPost, 
    updatePost, 
    deletePost 
  } = useInstallationPosts();
  
  const [localCategories, setLocalCategories] = useState(categories);
  const [editMode, setEditMode] = useState(false);
  const [editPostId, setEditPostId] = useState(null);
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editPostContent, setEditPostContent] = useState('');
  const [editPostTitle, setEditPostTitle] = useState('');
  const [editPostImages, setEditPostImages] = useState([]);
  const contentRef = useRef(null);
  
  // 모달 관련 상태
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [pendingSaveIndex, setPendingSaveIndex] = useState(null);
  const [pendingDeleteInfo, setPendingDeleteInfo] = useState(null); // categoryIndex, postId 저장
  
  // 페이지 진입 시 스크롤 위치를 상단으로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // 카테고리 데이터가 변경될 때 localCategories 업데이트
  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  // 다른 곳을 클릭했을 때 열린 카테고리 닫기
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        const newCategories = [...localCategories];
        let changed = false;
        
        newCategories.forEach(category => {
          if (category.expanded) {
            category.expanded = false;
            changed = true;
          }
        });
        
        if (changed) {
          setLocalCategories(newCategories);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [localCategories]);

  const toggleExpand = (index, event) => {
    // 버튼 클릭 시에는 토글하지 않음
    if (
      event.target.closest('button') && 
      (event.target.closest('button').textContent.includes('저장') ||
       event.target.closest('button').textContent.includes('취소') ||
       event.target.closest('button').textContent.includes('수정') ||
       event.target.closest('button').textContent.includes('삭제') ||
       event.target.closest('button').textContent.includes('새 게시물 추가'))
    ) {
      event.stopPropagation();
      return;
    }
    
    event.stopPropagation();
    const newCategories = [...localCategories];
    
    // 다른 카테고리들 닫기
    newCategories.forEach((cat, idx) => {
      if (idx !== index) {
        newCategories[idx].expanded = false;
      }
    });
    
    // 선택한 카테고리 토글
    newCategories[index].expanded = !newCategories[index].expanded;
    setLocalCategories(newCategories);
  };

  const startEditing = (categoryIndex, postId, event) => {
    event.stopPropagation();
    
    // 먼저 카테고리를 열린 상태로 유지
    keepCategoryOpen(categoryIndex);
    
    const category = localCategories[categoryIndex];
    const post = category.posts.find(p => p.id === postId);
    
    setEditCategoryId(category.id);
    setEditPostId(postId);
    setEditPostTitle(post.title);
    setEditPostContent(post.content);
    setEditPostImages(post.images || []);
    setEditMode(true);
  };

  const confirmSave = (categoryIndex, event) => {
    event.stopPropagation();
    
    // 먼저 카테고리를 열린 상태로 유지
    keepCategoryOpen(categoryIndex);
    
    // 저장 확인 모달 표시
    setPendingSaveIndex(categoryIndex);
    setModalType(MODAL_TYPES.SAVE);
    setShowModal(true);
  };

  const confirmDelete = (categoryIndex, postId, event) => {
    event.stopPropagation();
    
    // 먼저 카테고리를 열린 상태로 유지
    keepCategoryOpen(categoryIndex);
    
    // 삭제 확인 모달 표시
    setPendingDeleteInfo({ categoryIndex, postId });
    setModalType(MODAL_TYPES.DELETE);
    setShowModal(true);
  };

  const saveEdit = async () => {
    const categoryIndex = pendingSaveIndex;
    const category = localCategories[categoryIndex];
    
    // 이미지 처리: File 객체를 Base64 문자열로 변환
    const processedImages = await Promise.all(
      editPostImages.map(async (img) => {
        if (img.file && !img.base64) {
          const base64 = await fileToBase64(img.file);
          return { ...img, base64, file: null };
        }
        return img;
      })
    );
    
    // 게시물 업데이트
    updatePost(category.id, editPostId, {
      title: editPostTitle,
      content: editPostContent,
      images: processedImages
    });
    
    // 상태 초기화
    setEditMode(false);
    setEditPostId(null);
    setEditCategoryId(null);
    setShowModal(false);
    setPendingSaveIndex(null);
  };

  const executeDelete = () => {
    const { categoryIndex, postId } = pendingDeleteInfo;
    const category = localCategories[categoryIndex];
    
    // 게시물 삭제 실행
    deletePost(category.id, postId);
    
    // 삭제 확인 모달에서 삭제 완료 모달로 변경
    setModalType(MODAL_TYPES.DELETE_COMPLETE);
    
    // 5초 뒤에 모달 자동 닫기
    setTimeout(() => {
      setShowModal(false);
      setPendingDeleteInfo(null);
    }, 2000);
  };

  const cancelEdit = (event) => {
    if (event) event.stopPropagation();
    setEditMode(false);
    setEditPostId(null);
    setEditCategoryId(null);
    setEditPostImages([]);
    setShowModal(false);
    setPendingSaveIndex(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setPendingSaveIndex(null);
    setPendingDeleteInfo(null);
  };

  const addNewPost = (categoryIndex, event) => {
    event.preventDefault(); // 이벤트 기본 동작 방지
    event.stopPropagation();
    
    // 먼저 카테고리를 열린 상태로 유지
    keepCategoryOpen(categoryIndex);
    
    const category = localCategories[categoryIndex];
    
    // 게시물 추가
    addPost(category.id, {
      title: '새 게시물',
      content: '내용을 입력하세요.',
      images: []
    });
  };

  const handleImageUpload = (event) => {
    event.stopPropagation();
    
    const files = Array.from(event.target.files);
    
    if (files.length > 0) {
      const newImages = files.map(file => ({
        id: Date.now() + Math.random().toString(36).substring(2, 9),
        file,
        url: URL.createObjectURL(file),
        name: file.name
      }));
      
      setEditPostImages([...editPostImages, ...newImages]);
    }
    
    // 파일 선택 창이 같은 파일을 다시 선택할 수 있도록 value 초기화
    event.target.value = '';
  };
  
  const removeImage = (imageId, event) => {
    event.stopPropagation();
    const updatedImages = editPostImages.filter(image => image.id !== imageId);
    setEditPostImages(updatedImages);
  };

  // 모달 내용 렌더링 함수
  const renderModalContent = () => {
    switch (modalType) {
      case MODAL_TYPES.SAVE:
        return (
          <>
            <ModalTitle>저장하시겠습니까?</ModalTitle>
            <ModalButtons>
              <ModalButton primary onClick={saveEdit}>확인</ModalButton>
              <ModalButton onClick={cancelEdit}>취소</ModalButton>
            </ModalButtons>
          </>
        );
      case MODAL_TYPES.DELETE:
        return (
          <>
            <ModalTitle>이 게시물을 삭제하시겠습니까?</ModalTitle>
            <ModalText>삭제 후 다시 볼 수 없습니다.</ModalText>
            <ModalButtons>
              <ModalButton primary color="#dc3545" onClick={executeDelete}>삭제</ModalButton>
              <ModalButton onClick={closeModal}>취소</ModalButton>
            </ModalButtons>
          </>
        );
      case MODAL_TYPES.DELETE_COMPLETE:
        return (
          <>
            <ModalTitle>게시물이 삭제되었습니다</ModalTitle>
          </>
        );
      default:
        return null;
    }
  };

  // 특정 카테고리를 열린 상태로 유지하는 함수
  const keepCategoryOpen = (index) => {
    console.log('keepCategoryOpen called for index:', index);
    const newCategories = [...localCategories];
    
    // 모든 카테고리 닫기
    newCategories.forEach((cat, idx) => {
      if (idx !== index) {
        newCategories[idx].expanded = false;
      }
    });
    
    // 지정된 카테고리는 항상 열기
    newCategories[index].expanded = true;
    
    // 로컬 상태 업데이트
    setLocalCategories(newCategories);
  };

  return (
    <Container>
      <PageTitle>관리자 페이지</PageTitle>
      
      <Header>
        <SearchSection>
          <SearchInput type="text" placeholder="검색어를 입력하세요" />
          <SearchButton>검색</SearchButton>
        </SearchSection>
        <BackButton to="/admin">이전</BackButton>
      </Header>

      <ContentSection ref={contentRef}>
        <CategoryList>
          {localCategories.map((category, index) => (
            <React.Fragment key={index}>
              <CategoryItem onClick={(e) => toggleExpand(index, e)}>
                {category.name}
                <ExpandButton 
                  className="expand-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    // 토글 확장 로직 직접 구현
                    const newCategories = [...localCategories];
                    
                    // 다른 카테고리들 닫기
                    newCategories.forEach((cat, idx) => {
                      if (idx !== index) {
                        newCategories[idx].expanded = false;
                      }
                    });
                    
                    // 현재 카테고리 토글
                    newCategories[index].expanded = !newCategories[index].expanded;
                    setLocalCategories(newCategories);
                  }}
                >
                  {category.expanded ? '▲' : '▼'}
                </ExpandButton>
              </CategoryItem>
              
              <ExpandedContent expanded={category.expanded} isLast={index === localCategories.length - 1 && category.expanded}>
                <PostList>
                  {category.posts.map((post) => (
                    <PostItem key={post.id} onClick={(e) => e.stopPropagation()}>
                      {editMode && editPostId === post.id ? (
                        <>
                          <PostInput 
                            value={editPostTitle} 
                            onChange={(e) => setEditPostTitle(e.target.value)} 
                            placeholder="제목"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <PostActions>
                            <ActionButton color="#28a745" onClick={(e) => confirmSave(index, e)}>저장</ActionButton>
                            <ActionButton color="#dc3545" onClick={(e) => cancelEdit(e)}>취소</ActionButton>
                          </PostActions>
                        </>
                      ) : (
                        <>
                          <PostTitle>{post.title}</PostTitle>
                          <PostActions>
                            <ActionButton color="#4A90A7" onClick={(e) => startEditing(index, post.id, e)}>수정</ActionButton>
                            <ActionButton color="#dc3545" onClick={(e) => confirmDelete(index, post.id, e)}>삭제</ActionButton>
                          </PostActions>
                        </>
                      )}
                    </PostItem>
                  ))}
                  
                  {editMode && editPostId !== null && 
                    localCategories[index].posts.some(p => p.id === editPostId) && (
                      <>
                        <PostTextArea 
                          value={editPostContent} 
                          onChange={(e) => setEditPostContent(e.target.value)} 
                          placeholder="내용을 입력하세요"
                          onClick={(e) => e.stopPropagation()}
                        />
                        
                        <ImageUploadSection onClick={(e) => e.stopPropagation()}>
                          <ImageUploadLabel>
                            이미지 첨부
                            <ImageUploadInput 
                              type="file" 
                              accept="image/*" 
                              multiple 
                              onChange={handleImageUpload}
                              onClick={(e) => e.stopPropagation()}
                            />
                          </ImageUploadLabel>
                          <span>이미지는 여러개 선택 가능합니다</span>
                          
                          {editPostImages.length > 0 ? (
                            <ImagePreviewContainer>
                              {editPostImages.map(image => (
                                <ImagePreview key={image.id}>
                                  <PreviewImage src={image.url || image.base64} alt={image.name} />
                                  <RemoveImageButton onClick={(e) => removeImage(image.id, e)}>×</RemoveImageButton>
                                </ImagePreview>
                              ))}
                            </ImagePreviewContainer>
                          ) : (
                            <NoPreviousImages>첨부된 이미지가 없습니다.</NoPreviousImages>
                          )}
                        </ImageUploadSection>
                      </>
                    )
                  }
                </PostList>
                
                <AddPostButton onClick={(e) => addNewPost(index, e)}>
                  + 새 게시물 추가
                </AddPostButton>
              </ExpandedContent>
            </React.Fragment>
          ))}
        </CategoryList>
      </ContentSection>

      {/* 모달 */}
      {showModal && (
        <ModalOverlay onClick={modalType !== MODAL_TYPES.DELETE_COMPLETE ? closeModal : null}>
          <ModalContainer onClick={(e) => e.stopPropagation()}>
            {renderModalContent()}
          </ModalContainer>
        </ModalOverlay>
      )}
    </Container>
  );
};

// 모달 텍스트 스타일 추가
const ModalText = styled.p`
  text-align: center;
  color: #666;
  margin-bottom: 20px;
`;

export default InstallationManage; 