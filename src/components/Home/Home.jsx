import {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, ColumnCenter, RowCenter} from 'styles/CommonStyles';
import theme from 'styles/theme';
import {AGE_OPTIONS, DEFAULT_IMAGE, DEFAULT_TIME_FORMAT, GENDER_OPTIONS} from 'utils/defaultValue';
import {Link} from 'react-router-dom';
import {getPollsWithNotExpired} from 'api/polls';
import {useQuery} from '@tanstack/react-query';
import {BarLoader} from 'react-spinners';
import {getItems} from 'api/items';
import moment from 'moment/moment';
import {FaRegCalendarAlt} from 'react-icons/fa';
import Select from 'react-select';

const Home = () => {
  const {isLoading: isLoadingPolls, data: pollsData} = useQuery({
    queryKey: ['polls'],
    queryFn: getPollsWithNotExpired,
    select: polls => polls.sort((a, b) => a.dueDate.seconds - b.dueDate.seconds),
  });
  const {isLoading: isLoadingItems, data: itemsData} = useQuery({queryKey: ['items'], queryFn: getItems});

  const [hotItems, setHotItems] = useState([]);
  const [allPolls, setAllPolls] = useState([]);
  const [randomPolls, setRandomPolls] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  const handleSearch = () => {
    if (searchKeyword === '') {
      setAllPolls(pollsData);
    } else {
      const filteredAllPolls = pollsData.filter(poll => poll.title.includes(searchKeyword));
      setAllPolls(filteredAllPolls);
    }
  };

  useEffect(() => {
    if (pollsData) {
      setRandomPolls([...pollsData].sort(() => Math.random() - Math.random()).slice(0, 4));
    }
  }, [pollsData]);

  useEffect(() => {
    if (itemsData) {
      setHotItems([...itemsData].sort((a, b) => b.sales - a.sales).slice(0, 5));
    }
  }, [itemsData]);

  useEffect(() => {
    if (!pollsData) return;

    let filteredPolls = pollsData;
    const ages = selectedAges.map(age => age.value);
    const genders = selectedGenders.map(gender => gender.value);

    if (selectedAges.length > 0) {
      filteredPolls = filteredPolls.filter(poll => ages.includes(poll.age));
    }
    if (selectedGenders.length > 0) {
      filteredPolls = filteredPolls.filter(poll => genders.includes(poll.gender));
    }
    setAllPolls(filteredPolls);
  }, [pollsData, selectedAges, selectedGenders]);

  if (isLoadingPolls || isLoadingItems) return <BarLoader color={theme.COLOR.pink} height={10} width={300} />;
  return (
    <>
      <StMainBox>
        <StTitleBox>
          <h1>오늘의 발견💡</h1>
        </StTitleBox>
        <StPickBox>
          {randomPolls.map((poll, index) => (
            <Link to={`/poll/${poll.id}`} key={index}>
              <StPickCard>
                <StPickImg src={poll.thumbnail ?? DEFAULT_IMAGE} />
                <StPickId> {poll.nickname}</StPickId>
                <StPickTitle>{poll.title}</StPickTitle>
                <StDueDate>
                  <FaRegCalendarAlt />
                  마감 기한: {moment.unix(poll.dueDate?.seconds).format(DEFAULT_TIME_FORMAT)}
                </StDueDate>
                <StPickPoint>{poll.point}p</StPickPoint>
              </StPickCard>
            </Link>
          ))}
        </StPickBox>
        <StTitleBox>
          <h1>인기 상품 🎁</h1>
        </StTitleBox>
        <StShopBox>
          {hotItems.map((item, index) => (
            <Link to="/shop" key={index}>
              <StShopCard>
                <StBestBox>
                  <span>{index + 1}위</span>
                </StBestBox>
                <StShopImg src={item.imageUrl} />
                <StShopTitle>{item.name}</StShopTitle>
                <StShopPrice>{item.point}p</StShopPrice>
              </StShopCard>
            </Link>
          ))}
        </StShopBox>
        <StSearchBarBox>
          <StyledSelect
            options={AGE_OPTIONS.slice(1).map(option => ({
              value: option.value,
              label: option.text,
            }))}
            isMulti
            value={selectedAges}
            onChange={setSelectedAges}
            placeholder="나이를 선택하세요"
          />
          <StyledSelect
            options={GENDER_OPTIONS.slice(1).map(option => ({
              value: option.value,
              label: option.text,
              color: option.color,
            }))}
            isMulti
            value={selectedGenders}
            onChange={setSelectedGenders}
            placeholder="성별을 선택하세요"
          />
          <StSearchBar>
            <input
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchKeyword}
              onChange={e => setSearchKeyword(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
            <button onClick={handleSearch}>검색</button>
          </StSearchBar>
        </StSearchBarBox>
        {allPolls?.map((poll, index) => (
          <Link to={`/poll/${poll.id}`} key={index} state={{poll}}>
            <StSurveyCard>
              <StSurveyTitleWrapper>
                <StSurveyTitle>{poll.title}</StSurveyTitle>
              </StSurveyTitleWrapper>
              <StSurveyBottom>
                <p>질문 개수 {poll.questions.length}개</p>
                <p>{poll.age === 0 ? '연령대 상관없음' : `연령대 ${poll.age}대`}</p>
                <p>{poll.gender === 'none' ? '성별 상관없음' : `성별 ${poll.gender === 'male' ? '남성' : '여성'} `}</p>
                <p>
                  <FaRegCalendarAlt />
                  마감 기한: {moment.unix(poll.dueDate?.seconds).format(DEFAULT_TIME_FORMAT)}
                </p>
                <StSurveyPoint>{poll.point}p</StSurveyPoint>
              </StSurveyBottom>
            </StSurveyCard>
          </Link>
        ))}
        <StButtonBox>
          <Button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>TOP</Button>
        </StButtonBox>
      </StMainBox>
    </>
  );
};

export default Home;

const StMainBox = styled.div`
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
  -webkit-line-clamp: 1;
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
  border-radius: 10px;
  padding: 10px;
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

  p {
    ${RowCenter};
    & svg {
      margin-right: 5px;
    }
  }
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

const StDueDate = styled.div`
  ${RowCenter};
  font-size: ${theme.FONT_SIZE.sm};
  font-weight: bold;
  color: #4f4f4f;
  margin-bottom: 10px;

  & svg {
    margin-right: 5px;
  }
`;
const StSearchBar = styled.div`
  ${RowCenter};
  margin-top: 50px;
  margin-bottom: 50px;

  input {
    width: 330px;
    height: 40px;
    border: 1px solid #bdbdbd;
    border-radius: 10px;
    padding: 15px;
    margin-right: 10px;
    font-size: 15px;
    font-weight: bold;
    border: 2px solid ${theme.COLOR.pink};
  }

  button {
    width: 100px;
    height: 40px;
    border: none;
    border-radius: 10px;
    background-color: ${theme.COLOR.pink};
    color: white;
    font-size: 15px;
    font-weight: bold;
    cursor: pointer;
  }
  @media (max-width: 1000px) {
    input {
      width: 250px;
    }
    button {
      width: 50px;
    }
  }

  @media (max-width: 768px) {
    input {
      width: 150px;
    }
    button {
      width: 50px;
    }
  }

  @media (max-width: 600px) {
    margin-top: 12px;
    input {
      width: 200px;
      margin: 0 auto;
    }
    button {
      display: none;
    }
  }
`;

const StSearchBarBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  width: 900px;

  @media (max-width: 1000px) {
    width: 700px;
  }

  @media (max-width: 768px) {
    width: 600px;
  }

  @media (max-width: 600px) {
    width: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const StyledSelect = styled(Select)`
  width: 400px;
  margin: 10px;
  border-radius: 10px;
  color: black;
  font-weight: bold;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;
  background-color: white;
  cursor: pointer;

  .css-13cymwt-control {
    border: 2px solid ${theme.COLOR.pink};
    border-radius: 10px;
  }

  .css-wsp0cs-MultiValueGeneric {
    background-color: ${theme.COLOR.pink};
    color: white;
    border-radius: 0;
  }

  .css-12a83d4-MultiValueRemove {
    background-color: ${theme.COLOR.pink};
    color: white;
    border-radius: 0;
  }

  @media (max-width: 768px) {
    width: 280px;
  }

  @media (max-width: 600px) {
    width: 200px;
  }
`;

const StBestBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: bold;
  color: white;
  background-color: ${theme.COLOR.pink};
  padding: 7px;
  border-radius: 100px;
`;

const StButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-bottom: 50px;
  width: 100%;
  height: 100%;
  position: sticky;
  bottom: 20px;
  margin-left: 120px;
`;
