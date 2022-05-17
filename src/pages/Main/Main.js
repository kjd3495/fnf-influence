import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import MainTable from './MainTable';
import MessageModal from './MessageModal';
import DetailModal from './DetailModal';
import { API } from '../../config';

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
  const [openModal, setOpenModal] = useState({
    messageModal: false,
    detailModal: false,
  });
  const [campaignList, setCampaignList] = useState([]);
  const [influencerInfo, setInfluencerInfo] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const categoryRes = await fetch(`${API.category}`, {
        headers: {
          Authorization: localStorage.getItem('access_token'),
        },
      });
      const categoriesData = await categoryRes.json();
      setCategories(categoriesData.result);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (token !== null) {
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
    }
  }, [filterValues, pagenation, navigate]);

  useEffect(() => {
    async function fetchData() {
      if (location.search.includes('key')) {
        const ListRes = await fetch(`${API.search}${location.search}`, {
          headers: {
            Authorization: localStorage.getItem('access_token'),
          },
        });
        if (ListRes.status === 200) {
          const List = await ListRes.json();
          const length = Math.ceil(List.count / 5);
          const newPageList = [];
          for (let i = 0; i < length; i++) {
            newPageList.push(i + 1);
          }
          setInfluencerList(List.result);
          setPageList(newPageList);
        }
      } else if (!location.search) {
        const ListRes = await fetch(`${API.main}`);
        if (ListRes.status === 200) {
          const List = await ListRes.json();
          const length = Math.ceil(List.count / 5);
          const newPageList = [];
          for (let i = 0; i < length; i++) {
            newPageList.push(i + 1);
          }
          setInfluencerList(List.result);
          setPageList(newPageList);
          setFilterValues({
            categoryId: 1,
            keyword: '',
            sort_by: 'influencer_follower',
            sort_option: 'down',
          });
          setCheckList([]);
        }
      } else {
        const ListRes = await fetch(`${API.influencerList}${location.search}`, {
          headers: {
            Authorization: localStorage.getItem('access_token'),
          },
        });
        if (ListRes.status === 200) {
          const List = await ListRes.json();
          const length = Math.ceil(List.count / 5);
          const newPageList = [];
          for (let i = 0; i < length; i++) {
            newPageList.push(i + 1);
          }
          setInfluencerList(List.result);
          setPageList(newPageList);
        } else if (ListRes.status === 501) {
          alert('로그인 후 사용해주세요');
        }
      }
    }
    fetchData();
  }, [location.search]);

  const filteringCategory = id => {
    const token = localStorage.getItem('access_token');
    if (token !== null) {
      setFilterValues({ ...filterValues, categoryId: id, keyword: '' });
      setKeyword('');
      setPagenation({ ...pagenation, offset: 0 });
      setCheckList([]);
    } else {
      alert('로그인 후 이용해주세요');
    }
  };

  const handleKeyword = e => {
    const { value } = e.target;
    setKeyword(value);
  };

  const handleSearch = () => {
    const token = localStorage.getItem('access_token');
    if (token !== null) {
      if (keyword === '') {
        alert('검색어를 입력해주세요');
      } else {
        setFilterValues({
          ...filterValues,
          keyword: keyword,
          categoryId: 0,
        });
        setPagenation({ ...pagenation, offset: 0 });
        setCheckList([]);
      }
    } else {
      alert('로그인 후 이용해주세요');
    }
  };

  const enterEvent = e => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleMessageBtn = () => {
    const token = localStorage.getItem('access_token');
    if (token === null) {
      alert('로그인 후 이용해주세요');
    } else if (campaignList.length === 0) {
      alert('마이페이지에서 캠페인을 먼저 생성해주세요');
    } else if (checkList.length === 0) {
      alert('인플루언서를 선택해주세요');
    } else {
      setOpenModal({ ...openModal, messageModal: true });
    }
  };

  const handlePage = num => {
    const token = localStorage.getItem('access_token');
    if (token !== null) {
      setPagenation({ ...pagenation, offset: (num - 1) * 5 });
    } else {
      alert('로그인 후 이용해주세요');
    }
  };
  return (
    <MainWrap>
      <Top>
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
      </Top>
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
      <SendBtnWrap>
        <SendBtn onClick={handleMessageBtn}>메세지보내기</SendBtn>
      </SendBtnWrap>
      <MessageModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        checkList={checkList}
        setCheckList={setCheckList}
        campaignList={campaignList}
        setCampaignList={setCampaignList}
      />
      <TableWrap>
        <MainTable
          filterValues={filterValues}
          setFilterValues={setFilterValues}
          influencerList={influencerList}
          checkList={checkList}
          setCheckList={setCheckList}
          openModal={openModal}
          setOpenModal={setOpenModal}
          setInfluencerInfo={setInfluencerInfo}
        />
        <DetailModal
          openModal={openModal}
          setOpenModal={setOpenModal}
          influencerId={influencerInfo.id}
        />
        <Pagenation>
          {pageList.length !== 0 &&
            pageList.map(num => (
              <Num
                key={num}
                onClick={() => handlePage(num)}
                color={
                  pagenation.offset / 5 + 1 === num ? '#E6A225' : '#212121'
                }
              >
                {num}
              </Num>
            ))}
        </Pagenation>
      </TableWrap>
    </MainWrap>
  );
};

const MainWrap = styled.div`
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: ${props => props.theme.lightGray};
`;
const Top = styled.div`
  width: 1100px;
  padding: 20px;
  margin: 0 auto;
  border-radius: 8px;
  background-color: ${props => props.theme.white};
`;
const CategoryWrap = styled.div`
  width: 840px;
  margin: 0 auto;
`;

const P = styled.p`
  width: 100%;
  margin-bottom: 30px;
  margin-left: 10px;
  padding-top: 20px;
  font-size: 20px;
  font-weight: bold;
`;

const CategoryList = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 840px;
`;

const Category = styled.div`
  ${props => props.theme.flex('center', 'center')};
  width: 120px;
  height: 80px;
  margin-left: 10px;
  margin-right: 10px;
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
  margin-top: 40px;
  border: 1px solid black;
  border-radius: 10px;
  background-color: ${props => props.theme.white};
`;

const HashTag = styled.div`
  width: 55px;
  height: 25px;
  border-right: 1px solid gray;
  font-size: 25px;
  font-weight: bold;
  line-height: 1.1;
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

const TableWrap = styled.div`
  width: 1100px;
  padding: 40px;
  margin: 0 auto;
  margin-top: 20px;
  border-radius: 8px;
  background-color: ${props => props.theme.white};
`;

const SendBtnWrap = styled.div`
  ${props => props.theme.flex('flex-end')}
  width: 1100px;
  margin: 0 auto;
  margin-top: 10px;
`;
const SendBtn = styled.button`
  padding: 10px;
  margin-right: 10px;
  border-radius: 8px;
  border: 1px solid ${props => props.theme.selectColor};
  background-color: ${props => props.theme.selectColor};
  color: ${props => props.theme.white};
  cursor: pointer;
`;

const Pagenation = styled.div`
  ${props => props.theme.flex('center', 'center')};
  margin: 0 auto;
  margin-top: 50px;
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

export default Main;
