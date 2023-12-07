import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {ColumnCenter} from 'styles/CommonStyles';
import theme from 'styles/theme';
import {BarLoader} from 'react-spinners';
import {useQuery} from '@tanstack/react-query';
import {getItems} from 'api/items';
import Modal from 'react-modal';

const CATEGORIES = ['전체', '편의점', '카페', '치킨', '영화'];

const Shop = () => {
  const {isLoading, data: itemsData} = useQuery({queryKey: ['items'], queryFn: getItems});

  const [buyItem, setBuyItem] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCategory, setSeletedCategory] = useState(CATEGORIES[0]);
  const [selectedItems, setSelectedItems] = useState(itemsData);

  const clickedItemButton = item => {
    setBuyItem(item);
    setModalIsOpen(true);
  };

  useEffect(() => {
    if (!itemsData) return;
    if (selectedCategory === CATEGORIES[0]) {
      setSelectedItems(itemsData);
    } else {
      setSelectedItems(itemsData.filter(item => item.category === selectedCategory));
    }
  }, [selectedCategory, itemsData]);

  if (isLoading || !selectedItems) return <BarLoader color={theme.COLOR.pink} height={10} width={300} />;
  return (
    <StItemContainer>
      <StBanner
        onClick={() => {
          setSeletedCategory(CATEGORIES[0]);
        }}
      >
        <div>
          <h1>POINT SHOP</h1>
          <h2>포인트를 사용하여 상품을 구매해보세요! 🎉</h2>
        </div>
        <div>
          {/* 정보 불러올 예정 */}
          <p>으랏차차님😊 안녕하세요!</p>
          <p>포인트 : 1000p </p>
        </div>
      </StBanner>
      <StCategoryListBox>
        {CATEGORIES.map((category, index) => {
          return (
            <StCategoryList
              key={index}
              onClick={() => {
                setSeletedCategory(category);
              }}
              $isClicked={selectedCategory === category}
            >
              {category}
            </StCategoryList>
          );
        })}
      </StCategoryListBox>
      <StCategoryTitle>{selectedCategory}</StCategoryTitle>
      <StItemBox>
        {selectedItems.map((item, index) => (
          <StItemCard onClick={() => clickedItemButton(item)} key={index} item={item}>
            <StItemImage src={item.imageUrl} />
            <StItemCategory>{item.category}</StItemCategory>
            <StItemTitle>{item.name}</StItemTitle>
            <StItemPoint>{item.point}p</StItemPoint>
          </StItemCard>
        ))}
      </StItemBox>
      <Modal style={modalStyle} isOpen={modalIsOpen} ariaHideApp={false} onRequestClose={() => setModalIsOpen(false)}>
        <StModalInnerBox>
          <h1>포인트 결제</h1>
          <StModalItemImage src={buyItem?.imageUrl} />
          <StItemCategory>{buyItem?.category}</StItemCategory>
          <StItemTitle>{buyItem?.name}</StItemTitle>
          <StModalItemPoint>{buyItem?.point}p</StModalItemPoint>
          {/* 정보 불러올 예정 */}
          <p>잔액포인트 : 100p </p>
          <StModalButton>나에게 선물하기</StModalButton>
        </StModalInnerBox>
      </Modal>
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
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: baseline;
  cursor: pointer;

  h1 {
    font-size: 35px;
    font-weight: 700;
    padding: 20px;
    color: #fcfafa;
    margin-left: 100px;
    margin: 35px 0 0 100px;
    letter-spacing: 2px;
  }

  h2 {
    font-size: 20px;
    font-weight: 700;
    padding: 20px;
    color: white;
    margin-left: 100px;
    letter-spacing: 2px;
  }

  p {
    font-size: 20px;
    font-weight: 700;
    padding: 10px;
    color: white;
    margin-right: 100px;
    letter-spacing: 2px;
    text-align: center;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 30px;
      margin-left: 50px;
    }
    p {
      font-size: 15px;
      margin-left: 50px;
    }
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
  margin-right: 20px;
  cursor: pointer;
  color: ${props => (props.$isClicked ? theme.COLOR.purple : 'black')};

  &:hover {
    color: ${theme.COLOR.purple};
  }
`;

const modalStyle = {
  overlay: {
    backgroundColor: ' rgba(0, 0, 0, 0.4)',
    width: '100%',
    height: '100vh',
    zIndex: '10',
    position: 'fixed',
    top: '0',
    left: '0',
  },
  content: {
    width: '370px',
    height: '420px',
    zIndex: '150',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
    boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)',
    backgroundColor: 'white',
    justifyContent: 'center',
    overflow: 'auto',
  },
};

const StModalInnerBox = styled.div`
  ${() => ColumnCenter}

  h1 {
    font-size: 28px;
    font-weight: 700;
    margin-bottom: 20px;
    letter-spacing: 3px;
    margin-top: 10px;
  }

  p {
    font-size: 15px;
    margin: 5px 0 5px 0;
  }
`;

const StModalButton = styled.button`
  background-color: ${theme.COLOR.purple};
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 15px;
  font-weight: bold;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  letter-spacing: 2px;
`;

const StModalItemImage = styled.div`
  width: 140px;
  height: 140px;
  border-radius: 10px;
  margin-bottom: 10px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`;

const StModalItemPoint = styled.div`
  font-size: 17px;
  font-weight: 700;
  color: ${theme.COLOR.pink};
  margin: 15px 0 10px 0;
  cursor: pointer;
`;
