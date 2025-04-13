import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useParams, Link } from 'react-router-dom';
import useInstallationPosts from '../../services/PostsService';

const Container = styled.div`
  padding: 80px 20px 20px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #DCE3E2;
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
  font-size: 28px;
  margin-bottom: 30px;
  color: #333;
  text-align: center;
`;

const ImageSection = styled.div`
  margin: 30px 0;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const WorkImage = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  height: 400px;
  background-color: #f8f9fa;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Description = styled.div`
  max-width: 700px;
  margin: 30px auto 0;
  
  p {
    font-size: 16px;
    line-height: 1.8;
    color: #555;
    margin-bottom: 15px;
    text-align: center;
  }
  
  p:last-child {
    margin-bottom: 0;
  }
`;

const BackButton = styled(Link)`
  display: block;
  width: 150px;
  text-align: center;
  margin: 30px auto 0;
  padding: 10px 15px;
  background-color: #2A8191;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: #1f6a77;
  }
`;

const NoImageMessage = styled.div`
  text-align: center;
  padding: 50px 0;
  color: #888;
  font-style: italic;
`;

const InstallationDetail = () => {
  const { category, subcategory } = useParams();
  const { getPostsByCategory } = useInstallationPosts();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // post-123 형식에서 ID 추출
    const postId = subcategory.startsWith('post-') 
      ? parseInt(subcategory.replace('post-', ''), 10)
      : null;
    
    if (postId) {
      const categoryPosts = getPostsByCategory(category);
      const foundPost = categoryPosts.find(p => p.id === postId);
      setPost(foundPost);
    }
    
    setLoading(false);
  }, [category, subcategory, getPostsByCategory]);

  // 페이지 진입 시 스크롤 위치를 상단으로 초기화
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) {
    return (
      <Container>
        <ContentBox>
          <Title>로딩 중...</Title>
        </ContentBox>
      </Container>
    );
  }

  if (!post) {
    return (
      <Container>
        <ContentBox>
          <Title>게시물을 찾을 수 없습니다</Title>
          <Description>
            <p>요청하신 게시물을 찾을 수 없습니다. 다른 게시물을 확인해주세요.</p>
          </Description>
          <BackButton to="/installation">목록으로 돌아가기</BackButton>
        </ContentBox>
      </Container>
    );
  }

  return (
    <Container>
      <ContentBox>
        <Title>{post.title}</Title>
        
        <ImageSection>
          {post.images && post.images.length > 0 ? (
            post.images.map((image, index) => (
              <WorkImage key={index}>
                <img src={image.url || image.base64} alt={`${post.title} ${index + 1}`} />
              </WorkImage>
            ))
          ) : (
            <NoImageMessage>등록된 이미지가 없습니다</NoImageMessage>
          )}
        </ImageSection>
        
        <Description>
          <p>{post.content}</p>
          <p>
            더 자세한 정보나 견적이 필요하시다면 견적문의 페이지를 통해 
            문의해 주시기 바랍니다.
          </p>
        </Description>
        
        <BackButton to="/installation">목록으로 돌아가기</BackButton>
      </ContentBox>
    </Container>
  );
};

export default InstallationDetail; 