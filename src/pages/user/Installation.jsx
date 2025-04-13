import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaTools, FaTruck, FaBuilding, FaIndustry, FaWrench } from 'react-icons/fa';
import useInstallationPosts from '../../services/PostsService';

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #DCE3E2;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 80px 10px 10px;
`;

const CategoryBox = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 50px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
`;

const CategoryTitle = styled.h1`
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  font-size: 24px;
`;

const CategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 15px;
`;

const CategoryItem = styled.div`
  padding: 15px;
  background-color: #2A8191;
  border-radius: 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  border: ${props => props.selected ? '2px solid #fff' : 'none'};
  position: relative;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #1f6a77;
  }

  &:active {
    transform: translateY(0);
  }
`;

const CategoryName = styled.h3`
  margin: 0;
  color: #fff;
  font-size: 16px;
`;

const SubCategoryBox = styled.div`
  height: auto;
  min-height: 300px;
  margin-top: 20px;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${props => props.isVisible ? 'block' : 'none'};
`;

const SubCategoryTitle = styled.h2`
  text-align: center;
  margin-bottom: 15px;
  color: #333;
  font-size: 20px;
`;

const SubCategoryList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
`;

const SubCategoryItem = styled(Link)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.div`
  width: 100%;
  height: 150px;
  background-color: #e9ecef;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  padding: 15px;
  text-align: center;
`;

const ProductName = styled.h3`
  font-size: 16px;
  margin-bottom: 8px;
  color: #333;
  text-align: center;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #666;
  text-align: center;
  margin-top: 8px;
`;

const NoSubcategories = styled.div`
  text-align: center;
  padding: 30px;
  color: #666;
  font-size: 16px;
`;

const Installation = () => {
  const { categories: adminCategories } = useInstallationPosts();
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isSubCategoryVisible, setIsSubCategoryVisible] = useState(false);
  const [categories, setCategories] = useState([
    { 
      id: 'upsidedown', 
      name: '상/하향식닥트',
      icon: <FaHome />,
      adminCategoryId: 'upsidedown',
      subCategories: []
    },
    { 
      id: 'ventilation', 
      name: '급배기닥트',
      icon: <FaTools />,
      adminCategoryId: 'ventilation',
      subCategories: []
    },
    { 
      id: 'cafeteria', 
      name: '급식실닥트',
      icon: <FaTruck />,
      adminCategoryId: 'cafeteria',
      subCategories: []
    },
    { 
      id: 'collector', 
      name: '집진기설치',
      icon: <FaBuilding />,
      adminCategoryId: 'collector',
      subCategories: []
    },
    { 
      id: 'construction', 
      name: '각종건설닥트',
      icon: <FaIndustry />,
      adminCategoryId: 'construction',
      subCategories: []
    }
  ]);

  // adminCategories가 변경될 때 각 카테고리의 서브카테고리를 업데이트
  useEffect(() => {
    if (adminCategories && adminCategories.length > 0) {
      const updatedCategories = categories.map(category => {
        const adminCategory = adminCategories.find(c => c.id === category.adminCategoryId);
        
        if (adminCategory && adminCategory.posts) {
          return {
            ...category,
            subCategories: adminCategory.posts.map(post => ({
              id: `post-${post.id}`,
              name: post.title,
              description: post.content,
              image: post.images && post.images.length > 0 
                ? (post.images[0].url || post.images[0].base64) 
                : `/images/default-image.jpg`,
              post: post
            }))
          };
        }
        return {...category, subCategories: []};
      });
      
      setCategories(updatedCategories);
      
      // 선택된 카테고리가 있다면 그 카테고리의 업데이트된 정보로 갱신
      if (selectedCategory) {
        const updatedSelectedCategory = updatedCategories.find(
          cat => cat.id === selectedCategory.id
        );
        if (updatedSelectedCategory) {
          setSelectedCategory(updatedSelectedCategory);
        }
      }
    }
  }, [adminCategories]);

  const handleCategoryClick = (category) => {
    if (selectedCategory && selectedCategory.id === category.id) {
      // 같은 카테고리를 다시 클릭하면 서브카테고리 숨김
      setSelectedCategory(null);
      setIsSubCategoryVisible(false);
    } else {
      // 다른 카테고리 선택 시 해당 카테고리 표시
      const categoryToSelect = categories.find(cat => cat.id === category.id);
      setSelectedCategory(categoryToSelect);
      setIsSubCategoryVisible(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <CategoryBox>
        <CategoryList>
          {categories.map((category) => (
            <CategoryItem 
              key={category.id} 
              selected={selectedCategory && selectedCategory.id === category.id}
              onClick={() => handleCategoryClick(category)}
            >
              <CategoryName>{category.name}</CategoryName>
            </CategoryItem>
          ))}
        </CategoryList>
        
        <SubCategoryBox isVisible={isSubCategoryVisible && selectedCategory}>
          {selectedCategory && (
            <>
              <SubCategoryTitle>{selectedCategory.name} 서브 카테고리</SubCategoryTitle>
              {selectedCategory.subCategories && selectedCategory.subCategories.length > 0 ? (
                <SubCategoryList>
                  {selectedCategory.subCategories.map((subcategory) => (
                    <SubCategoryItem
                      key={subcategory.id}
                      to={`/installation/${selectedCategory.id}/${subcategory.id}`}
                    >
                      <ProductImage>
                        <img 
                          src={subcategory.image} 
                          alt={subcategory.name} 
                          onError={(e) => {
                            e.target.src = '/images/default-image.jpg';
                          }}
                        />
                      </ProductImage>
                      <ProductInfo>
                        <ProductName>{subcategory.name}</ProductName>
                        <ProductDescription>
                          {subcategory.description && subcategory.description.length > 50
                            ? `${subcategory.description.slice(0, 50)}...`
                            : subcategory.description}
                        </ProductDescription>
                      </ProductInfo>
                    </SubCategoryItem>
                  ))}
                </SubCategoryList>
              ) : (
                <NoSubcategories>
                  현재 등록된 서브 카테고리가 없습니다.
                </NoSubcategories>
              )}
            </>
          )}
        </SubCategoryBox>
      </CategoryBox>
    </Container>
  );
};

export default Installation; 