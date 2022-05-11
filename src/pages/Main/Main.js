import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Influencer from './Influencer';

const Main = () => {
  const [checkList, setCheckList] = useState([]);

  const [filterValues, setFilterValues] = useState({
    category: categoryList[0],
    keyword: '',
    sort_by: 'follow',
    sort_option: 'down',
  });
  const [keyword, setKeyword] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryUrl = `${
      filterValues.category ? `?category_name=${filterValues.category}` : ``
    }${filterValues.keyword ? `?search=${filterValues.keyword}` : ``}
    ${
      (filterValues.category && filterValues.sort_by) ||
      (filterValues.keyword && filterValues.sort_by)
        ? `&sort_by=${filterValues.sort_by}&sort_option=${filterValues.sort_option}`
        : ``
    }`;

    navigate(queryUrl.replace(/ /g, '').replace(/(\r\n|\n|\r)/g, ''));
  }, [filterValues, navigate]);

  const filteringCategory = name => {
    setFilterValues({ ...filterValues, category: name, keyword: '' });
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
    setFilterValues({
      ...filterValues,
      keyword: keyword.replace(/ /g, '').replace(/#/g, ''),
      category: '',
    });
    alert(filterValues.keyword);
  };

  const enterEvent = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <MainWrap>
      <CategoryWrap>
        <P>카테고리</P>
        <CategoryList>
          {categoryList.map((category_name, idx) => (
            <Category
              key={idx}
              onClick={() => filteringCategory(category_name)}
              color={
                filterValues.category === category_name ? '#E6A225' : '#212121'
              }
            >
              {category_name}
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
          {influencerList.map(influencer => (
            <Influencer
              key={influencer.id}
              influencer={influencer}
              checkList={checkList}
              handleCheck={handleCheck}
            />
          ))}
        </tbody>
      </Table>
      <SearchBtnWrap>
        <SendBtn>메세지보내기</SendBtn>
      </SearchBtnWrap>
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
  margin-top: 20px;
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

export default Main;

const categoryList = [
  '스포츠',
  '음식',
  '뷰티',
  '여행',
  '패션',
  '반려동물',
  '교육',
  '음악',
  '전자기기',
  '영화',
  '자동차',
  '게임',
];

const Cols_Width = [
  '50px',
  '150px',
  '90px',
  '90px',
  '70px',
  '70px',
  '100px',
  '110px',
  '110px',
  '110px',
];
const thList = ['프로필 사진', '인스타 ID', '카테고리', '태그', '성별'];

const sortList = [
  { title: '팔로워', name: 'follow' },
  { title: '게시글 수', name: 'post' },
  { title: '평균 좋아요', name: 'like' },
  { title: '평균 댓글', name: 'comment' },
];

const influencerList = [
  {
    image: '/images/down.png',
    id: 'qwe123_as',
    categories: ['스포츠', '음식'],
    tags: ['축구', '농구', '요리', '맛집'],
    gender: 'M',
    follow: '300000',
    post: '200',
    like: '10000',
    comment: '2000',
  },
  {
    image: '/images/down.png',
    id: 'qwe124_as',
    categories: ['스포츠', '음식'],
    tags: ['축구', '농구', '요리', '맛집'],
    gender: 'M',
    follow: '300000',
    post: '200',
    like: '10000',
    comment: '2000',
  },
  {
    image: '/images/down.png',
    id: 'qwe125_as',
    categories: ['스포츠', '음식'],
    tags: ['축구', '농구', '요리', '맛집'],
    gender: 'M',
    follow: '300000',
    post: '200',
    like: '10000',
    comment: '2000',
  },
  {
    image: '/images/down.png',
    id: 'qwe126_as',
    categories: ['스포츠', '음식'],
    tags: ['축구', '농구', '요리', '맛집'],
    gender: 'M',
    follow: '300000',
    post: '200',
    like: '10000',
    comment: '2000',
  },
  {
    image: '/images/down.png',
    id: 'qwe127_as',
    categories: ['스포츠', '음식'],
    tags: ['축구', '농구', '요리', '맛집'],
    gender: 'M',
    follow: '300000',
    post: '200',
    like: '10000',
    comment: '2000',
  },
];
