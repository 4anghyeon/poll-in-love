import React from 'react';
import styled from 'styled-components';
import {ColumnCenter} from 'styles/CommonStyles';
import theme from 'styles/theme';
import BarLoader from '../../../node_modules/react-spinners/BarLoader';
import {useQuery} from '@tanstack/react-query';
import {getItems} from 'api/items';

const Shop = () => {
  const {isLoading, data: itemsData} = useQuery({queryKey: ['items'], queryFn: getItems});

  if (isLoading) return <BarLoader color={theme.COLOR.pink} height={10} width={300} />;
  return (
    <StItemContainer>
      <StBanner>
        <h1>POINT SHOP</h1>
        <p>포인트를 사용하여 상품을 구매해보세요! 🎉</p>
      </StBanner>
      {/* seletedCategory 구현예정 */}
      <StCategoryListBox>
        <StCategoryList>전체</StCategoryList>
        <StCategoryList>편의점</StCategoryList>
        <StCategoryList>카페</StCategoryList>
        <StCategoryList>치킨</StCategoryList>
        <StCategoryList>영화</StCategoryList>
      </StCategoryListBox>
      <StCategoryTitle>편의점</StCategoryTitle>
      <StItemBox>
        {itemsData.map((item, index) => (
          <StItemCard key={index}>
            <StItemImage src={item.imageUrl} />
            <StItemCategory>{item.category}</StItemCategory>
            <StItemTitle>{item.name}</StItemTitle>
            <StItemPoint>{item.point}p</StItemPoint>
          </StItemCard>
        ))}
      </StItemBox>
    </StItemContainer>
  );
};

export default Shop;

const StItemContainer = styled.div`
  ${() => ColumnCenter}
  width: 1400px;
  margin: 0 auto;

  @media (max-width: 1600px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StBanner = styled.div`
  width: 100%;
  height: 200px;
  background-color: ${theme.COLOR.pink};
  border-radius: 10px;
  margin: 50px 0 1rem 0;

  h1 {
    font-size: 35px;
    font-weight: 700;
    padding: 20px;
    color: #fcfafa;
    margin-left: 100px;
    margin: 35px 0 0 100px;
  }
  p {
    font-size: 20px;
    font-weight: 700;
    padding: 20px;
    color: white;
    margin-left: 100px;
  }
`;

const StItemBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
  margin-top: 30px;
  height: 100%;

  @media (max-width: 1000px) {
    width: 85%;

    @media (max-width: 768px) {
      width: 80%;
    }

    @media (max-width: 500px) {
      justify-content: flex-start;
      width: 65%;
    }
  }
`;

const StItemCard = styled.div`
  ${() => ColumnCenter}
  width: 300px;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const StItemImage = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

const StItemCategory = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
  color: ${theme.COLOR.purple};
`;

const StItemTitle = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
`;

const StItemPoint = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: ${theme.COLOR.pink};
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 100px;
  cursor: pointer;
`;

const StCategoryTitle = styled.div`
  font-size: 40px;
  font-weight: 700;
  margin-top: 20px;
  color: ${theme.COLOR.purple};
`;

const StCategoryListBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  margin-top: 30px;
  height: 100%;
  justify-content: flex-end;

  @media (max-width: 1000px) {
    justify-content: center;
  }
`;

const StCategoryList = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 10px;
  color: black;
  margin-right: 20px;
  cursor: pointer;

  &:hover {
    color: ${theme.COLOR.purple};
  }
`;
