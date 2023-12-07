import React from 'react';
import styled from 'styled-components';
import {ColumnCenter, RowCenter} from 'styles/CommonStyles';
import theme from 'styles/theme';
import {DEFAULT_IMAGE} from 'utils/defaultValue';
import {Link} from 'react-router-dom';
import {getPolls} from 'api/polls';
import {useQuery} from '@tanstack/react-query';
import {BarLoader} from 'react-spinners';
import {getItems} from 'api/items';

const Home = () => {
  const {isLoading: isLoadingPolls, data: pollsData} = useQuery({queryKey: ['polls'], queryFn: getPolls});
  const {isLoading: isLoadingItems, data: itemsData} = useQuery({queryKey: ['items'], queryFn: getItems});

  if (isLoadingPolls || isLoadingItems) return <BarLoader color={theme.COLOR.pink} height={10} width={300} />;
  return (
    <>
      <StMainBox>
        <StTitleBox>
          <h1>오늘의 PICK📌</h1>
        </StTitleBox>
        {/* 포인트 많은 순서대로 구현예정 */}
        <StPickBox>
          {pollsData.map((poll, index) => (
            <Link to={`/poll/${poll.id}`} key={index}>
              <StPickCard>
                <StPickImg src={poll.thumbnail ?? DEFAULT_IMAGE} />
                {/* 이메일 뒤에 두글자 빼고 보여주기 구현예정  */}
                <StPickId> {poll.writer}</StPickId>
                <StPickTitle>{poll.title}</StPickTitle>
                <StPickPoint>{poll.point}p</StPickPoint>
              </StPickCard>
            </Link>
          ))}
        </StPickBox>
        <StTitleBox>
          <h1>SHOP RANKING🔥</h1>
        </StTitleBox>
        {/* 데이터 부를 시 5개만 불러오기, 팔린 순서대로 구현예정 */}
        <StShopBox>
          {itemsData.map((item, index) => (
            <StShopCard key={index}>
              <StShopImg src={item.imageUrl} />
              <StShopTitle>{item.name}</StShopTitle>
              <StShopPrice>{item.point}p</StShopPrice>
            </StShopCard>
          ))}
        </StShopBox>
        {pollsData.map((poll, index) => (
          <Link to={`/poll/${poll.id}`} key={index} state={{poll}}>
            <StSurveyCard>
              <StSurveyTitleWrapper>
                <StSurveyTitle>{poll.title}</StSurveyTitle>
              </StSurveyTitleWrapper>
              <StSurveyBottom>
                <p>질문 개수 {poll.questions.length}개</p>
                <StSurveyPoint>{poll.point}p</StSurveyPoint>
              </StSurveyBottom>
            </StSurveyCard>
          </Link>
        ))}
      </StMainBox>
    </>
  );
};

export default Home;

const StMainBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 1400px;
  margin: 0 auto;

  @media (max-width: 1600px) {
    width: 100%;
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StTitleBox = styled.div`
  ${() => RowCenter}

  h1 {
    font-size: 35px;
    font-weight: 700;
    padding: 20px;
    margin-top: 50px;
  }
`;

const StPickBox = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  overflow: auto;
  white-space: nowrap;
  margin-top: 50px;
  height: 100%;
  justify-content: center;

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.COLOR.purple};
    border-radius: 10px;
    width: 10px;
  }

  @media (max-width: 1000px) {
    justify-content: flex-start;
  }
`;

const StPickCard = styled.div`
  ${() => ColumnCenter}
  width: 250px;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 20px;
  margin: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const StPickImg = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  margin-bottom: 10px;
`;

const StPickId = styled.div`
  font-size: 13px;
  color: #828282;
  margin-bottom: 10px;
`;

const StPickTitle = styled.div`
  font-size: 15px;
  font-weight: 700;
  color: #4f4f4f;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: wrap;
  margin-bottom: 10px;
  text-align: center;
  line-height: 1.5;
  word-break: break-all;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const StPickPoint = styled.div`
  font-size: 12px;
  font-weight: bold;
  padding: 3px;
  border: 2px solid ${theme.COLOR.pink};
  border-radius: 10px;
  color: ${theme.COLOR.pink};
  text-align: center;
  line-height: 1.5;
  width: 35%;
`;

const StShopBox = styled.div`
  display: flex;
  flex-direction: row;
  overflow: auto;
  margin-top: 50px;
  width: 100%;
  white-space: nowrap;
  height: 100%;
  justify-content: center;

  &::-webkit-scrollbar-thumb {
    background-color: ${theme.COLOR.purple};
    border-radius: 10px;
    width: 10px;
  }

  @media (max-width: 1000px) {
    justify-content: flex-start;
  }
`;

const StShopCard = styled.div`
  ${() => ColumnCenter}
  width: 230px;
  border-radius: 200px;
  padding: 20px;
  margin: 20px 20px 50px 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: ${theme.COLOR.purple};
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }
`;

const StShopImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 500px;
  margin-bottom: 20px;
`;

const StShopTitle = styled.div`
  font-size: 15px;
  font-weight: bold;
  color: #4f4f4f;
  margin-bottom: 10px;
  text-align: center;
`;

const StShopPrice = styled.button`
  font-size: 15px;
  font-weight: 700;
  color: #4f4f4f;
  text-align: center;
  line-height: 1.5;
  border: none;
  border-radius: 10px;
  color: white;
  background-color: ${theme.COLOR.purple};
`;

const StSurveyCard = styled.div`
  ${() => ColumnCenter}
  width: 900px;
  border-radius: 10px;
  border: 5px solid ${theme.COLOR.purple};
  padding: 20px;
  margin: 30px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    transition: 0.3s;
  }

  @media (max-width: 1000px) {
    width: 700px;
  }

  @media (max-width: 768px) {
    width: 400px;
  }
`;

const StSurveyTitleWrapper = styled.div`
  border-bottom: 1px dotted ${theme.COLOR.purple};
  width: 100%;
`;

const StSurveyTitle = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: #4f4f4f;
  overflow: hidden;
  margin-bottom: 10px;
  text-align: center;
  line-height: 1.5;
`;

const StSurveyBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin-top: 20px;
`;

const StSurveyPoint = styled.div`
  font-size: 12px;
  font-weight: bold;
  padding: 3px;
  border: 3px solid ${theme.COLOR.pink};
  border-radius: 10px;
  color: ${theme.COLOR.pink};
  text-align: center;
  line-height: 1.5;
  width: 50px;
`;
