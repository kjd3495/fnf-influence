import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Influencer from './Influencer';
import MessageModal from './MessageModal';

const Main = () => {
  const [categories, setCategories] = useState([]);
  const [influencerList, setInfluencerList] = useState([]);
  const [checkList, setCheckList] = useState([]);
  const [filterValues, setFilterValues] = useState({
    categoryId: 1,
    keyword: '',
    sort_by: 'influencer_follower',
    sort_option: 'down',
  });
  const [pagenation, setPagenation] = useState({
    limit: 5,
    offset: 0,
  });
  const [pageList, setPageList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [openModal, setOpenModal] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://172.2.0.189:8000/filter/category-list', {
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setCategories(data.result);
      });
  }, []);

  useEffect(() => {
    const queryUrl = `${
      filterValues.categoryId ? `?categoryId=${filterValues.categoryId}` : ``
    }${
      filterValues.keyword
        ? `?key=${filterValues.keyword.replace(/ /g, '').replace(/#/g, '')}`
        : ``
    }
    ${
      (filterValues.categoryId && filterValues.sort_by) ||
      (filterValues.keyword && filterValues.sort_by)
        ? `&sort_by=${filterValues.sort_by}&sort_option=${filterValues.sort_option}`
        : ``
    }${`&limit=${pagenation.limit}&offset=${pagenation.offset}`}`;

    const decodeUrl = decodeURIComponent(queryUrl);
    navigate(decodeUrl.replace(/ /g, '').replace(/(\r\n|\n|\r)/g, ''));
  }, [filterValues, pagenation, navigate]);

  useEffect(() => {
    async function fetchData() {
      if (location.search.includes('key')) {
        const ListRes = await fetch(
          `http://172.2.0.189:8000/search${location.search}`,
          {
            headers: {
              Authorization: localStorage.getItem('access_token'),
            },
          }
        );
        if (ListRes.status === 200) {
          const List = await ListRes.json();
          const length = Math.ceil(List.influencerList[1] / 5);
          const newPageList = [];
          for (let i = 0; i < length; i++) {
            newPageList.push(i + 1);
          }
          setInfluencerList(List.influencerList[0]);
          setPageList(newPageList);
        }
      } else {
        const ListRes = await fetch(
          `http://172.2.0.189:8000/filter/category-influencer-list${location.search}`,
          {
            headers: {
              Authorization: localStorage.getItem('access_token'),
            },
          }
        );
        if (ListRes.status === 200) {
          const List = await ListRes.json();
          const length = Math.ceil(List.result[1] / 5);
          const newPageList = [];
          for (let i = 0; i < length; i++) {
            newPageList.push(i + 1);
          }
          setInfluencerList(List.result[0]);
          setPageList(newPageList);
        }
      }
    }
    fetchData();
  }, [location.search]);

  const filteringCategory = id => {
    setFilterValues({ ...filterValues, categoryId: id, keyword: '' });
    setKeyword('');
    setPagenation({ ...pagenation, offset: 0 });
  };

  const handleSorting = name => {
    if (filterValues.sort_by !== name) {
      setFilterValues({ ...filterValues, sort_by: name, sort_option: 'down' });
    } else if (filterValues.sort_option === 'down') {
      setFilterValues({ ...filterValues, sort_by: name, sort_option: 'up' });
    } else {
      setFilterValues({ ...filterValues, sort_by: name, sort_option: 'down' });
    }
  };

  const handleCheck = (e, id) => {
    if (e.target.checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter(check_id => check_id !== id));
    }
  };

  const handleKeyword = e => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSearch = () => {
    if (keyword === '') {
      alert('검색어를 입력해주세요');
    } else {
      setFilterValues({
        ...filterValues,
        keyword: keyword,
        categoryId: 0,
      });
      setPagenation({ ...pagenation, offset: 0 });
    }
  };

  const enterEvent = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handlePage = num => {
    setPagenation({ ...pagenation, offset: (num - 1) * 5 });
  };
  return (
    <MainWrap>
      <CategoryWrap>
        <P>카테고리</P>
        <CategoryList>
          {categories.length !== 0 &&
            categories.map(category => (
              <Category
                key={category.id}
                onClick={() => filteringCategory(category.id)}
                color={
                  filterValues.categoryId === category.id
                    ? '#E6A225'
                    : '#212121'
                }
              >
                {category.category_name}
              </Category>
            ))}
        </CategoryList>
      </CategoryWrap>
      <Search>
        <HashTag>#</HashTag>
        <Input
          type="text"
          placeholder="검색"
          value={keyword}
          onChange={handleKeyword}
          onKeyUp={enterEvent}
        />
        <SearchBtn type="button" onClick={handleSearch} />
      </Search>
      <Table>
        <colgroup>
          {Cols_Width.map((col, idx) => (
            <col key={idx} width={col} />
          ))}
        </colgroup>
        <thead>
          <tr>
            <Th />
            {thList.map((th, idx) => (
              <Th key={idx}>
                <Span>{th}</Span>
              </Th>
            ))}
            {sortList.map((sortTh, idx) => (
              <Th key={idx} style={{ cursor: 'pointer' }}>
                <SortDiv
                  color={
                    filterValues.sort_by === sortTh.name ? '#E6A225' : '#212121'
                  }
                  onClick={() => handleSorting(sortTh.name)}
                >
                  <Span>{sortTh.title}</Span>
                  <SortImg
                    imgUrl={
                      filterValues.sort_by === sortTh.name
                        ? filterValues.sort_option === 'down'
                          ? '/images/down.png'
                          : '/images/up.png'
                        : '/images/sort.png'
                    }
                  />
                </SortDiv>
              </Th>
            ))}
          </tr>
        </thead>
        <tbody>
          {influencerList.length !== 0 ? (
            influencerList.map(influencer => (
              <Influencer
                key={influencer.id}
                influencer={influencer}
                checkList={checkList}
                handleCheck={handleCheck}
              />
            ))
          ) : (
            <tr>
              <Td colSpan={10}>
                <span>검색결과가 없습니다</span>
              </Td>
            </tr>
          )}
        </tbody>
      </Table>
      <SearchBtnWrap>
        <SendBtn onClick={() => setOpenModal(true)}>메세지보내기</SendBtn>
      </SearchBtnWrap>
      <MessageModal openModal={openModal} setOpenModal={setOpenModal} />
      <Pagenation>
        {pageList.length !== 0 &&
          pageList.map(num => (
            <Num
              key={num}
              onClick={() => handlePage(num)}
              color={pagenation.offset / 5 + 1 === num ? '#E6A225' : '#212121'}
            >
              {num}
            </Num>
          ))}
      </Pagenation>
    </MainWrap>
  );
};

const MainWrap = styled.div``;

const CategoryWrap = styled.div`
  width: 860px;
  margin: 0 auto;
  margin-top: 40px;
`;

const P = styled.p`
  margin-left: 20px;
  margin-bottom: 30px;
  font-size: 20px;
  font-weight: bold;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;

const Category = styled.div`
  ${props => props.theme.flex('center', 'center')};
  width: 120px;
  height: 80px;
  margin-left: 20px;
  margin-bottom: 15px;
  border: 1px solid ${props => props.color};
  border-radius: 8px;
  color: ${props => props.color};
  font-size: 18px;
  font-weight: bold;
  &:hover {
    transform: scale(1.1);
  }
  cursor: pointer;
`;

const Search = styled.div`
  ${props => props.theme.flex('center', 'center')}
  width: 400px;
  height: 30px;
  margin: 0 auto;
  margin-top: 30px;
  border: 1px solid black;
  border-radius: 10px;
`;

const HashTag = styled.div`
  width: 55px;
  height: 25px;
  border-right: 1px solid gray;
  line-height: 1.2;
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`;

const Input = styled.input`
  width: 300px;
  height: 25px;
  margin-left: 10px;
  font-size: 15px;
  border: none;
`;

const SearchBtn = styled.button`
  width: 18px;
  height: 20px;
  border: none;
  background-image: url('/images/search.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-color: inherit;
  cursor: pointer;
  &:hover {
    transform: scale(1.1);
  }
`;

const Table = styled.table`
  width: 1200px;
  margin: 0 auto;
  margin-top: 40px;
`;

const Th = styled.th`
  height: 60px;
  border-bottom: 2px solid black;
  font-size: 15px;
  font-weight: bold;
  vertical-align: middle;
`;

const SortDiv = styled.div`
  ${props => props.theme.flex('center', 'center')}
  color: ${props => props.color}
`;

const Span = styled.span`
  display: inline-block;
`;

const SortImg = styled.div`
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 5px;
  background-image: url(${props => props.imgUrl});
  background-size: contain;
  background-repeat: no-repeat;
  background-color: inherit;
`;

const SearchBtnWrap = styled.div`
  ${props => props.theme.flex('flex-end')}
  width: 1200px;
  margin: 0 auto;
  margin-top: 30px;
`;
const SendBtn = styled.button`
  padding: 10px;
  margin-right: 10px;
`;

const Pagenation = styled.div`
  ${props => props.theme.flex('center', 'center')};
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 50px;
`;

const Num = styled.div`
  width: 100px;
  color: ${props => props.color};
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
  }
`;

const Td = styled.td`
  height: 300px;
  border-bottom: 2px solid black;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
`;

export default Main;

const Cols_Width = [
  '50px',
  '150px',
  '90px',
  '90px',
  '90px',
  '70px',
  '90px',
  '100px',
  '110px',
  '110px',
];
const thList = ['프로필 사진', '인스타 ID', '카테고리', '태그', '성별'];

const sortList = [
  { title: '팔로워', name: 'influencer_follower' },
  { title: '게시글 수', name: 'influencer_posting' },
  { title: '평균 좋아요', name: 'influencer_average_like' },
  { title: '평균 댓글', name: 'influencer_average_comment' },
];
