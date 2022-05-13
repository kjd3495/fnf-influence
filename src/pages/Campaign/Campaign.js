import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import InfluencerTable from './InfluencerTable';
import CampaignTable from './CampaignTable';
import DropDown from './DropDown';

const Campaign = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [filterValues, setFilterValues] = useState({
    sort_by: 'influencer_follower',
    sort_option: 'down',
    sort_status_by: 1,
  });

  const [tableInfo, setTableInfo] = useState([]);

  const [pagenation, setPagenation] = useState({
    limit: 5,
    offset: 0,
  });

  const [checkList, setCheckList] = useState([]);

  useEffect(() => {
    const queryUrl = `${
      filterValues.sort_by && filterValues.sort_option
        ? `?sort_by=${filterValues.sort_by}&sort_option=${filterValues.sort_option}`
        : ``
    }${`&sort_status_by=${filterValues.sort_status_by}`}${`&limit=${pagenation.limit}&offset=${pagenation.offset}`}&campaignId=${
      params.id
    }`;
    navigate(queryUrl.replace(/ /g, '').replace(/(\r\n|\n|\r)/g, ''));

    fetch(
      `http://172.2.0.189:8000/filter/campaign-status-influencer-list${queryUrl}`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: localStorage.getItem('access_token'),
        },
      }
    )
      .then(res => res.json())
      .then(data => setTableInfo(data.result));
  }, [filterValues, pagenation, navigate, params.id]);

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

  const sortHandler = value => {
    if (value === '모두보기') {
      setFilterValues({ ...filterValues, sort_status_by: 'all' });
    } else if (value === '수락') {
      setFilterValues({ ...filterValues, sort_status_by: 1 });
    } else if (value === '대기') {
      setFilterValues({ ...filterValues, sort_status_by: 2 });
    } else if (value === '거절') {
      setFilterValues({ ...filterValues, sort_status_by: 3 });
    }
  };

  return (
    <CampaignWrap>
      <TableWrap>
        <CampaignTable />
        <DropDown sortHandler={sortHandler} />
      </TableWrap>
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
            <Th>상태</Th>
          </tr>
        </thead>
        <tbody>
          {tableInfo[0] &&
            tableInfo.map(data => (
              <InfluencerTable
                key={data.id}
                data={data}
                checkList={checkList}
                handleCheck={handleCheck}
              />
            ))}
        </tbody>
      </Table>
      <DeleteBtnWrap>
        <DeleteBtn>선택 삭제</DeleteBtn>
      </DeleteBtnWrap>
    </CampaignWrap>
  );
};

export default Campaign;

const Cols_Width = [
  '30px',
  '120px',
  '70px',
  '70px',
  '70px',
  '70px',
  '70px',
  '70px',
  '70px',
  '70px',
  '70px',
];

const thList = ['프로필 사진', '인스타 ID', '카테고리', '태그', '성별'];

const sortList = [
  { title: '팔로워', name: 'influencer_follower' },
  { title: '게시글 수', name: 'influencer_posting' },
  { title: '평균 좋아요', name: 'linfluencer_average_like' },
  { title: '평균 댓글', name: 'influencer_average_comment' },
];

const CampaignWrap = styled.div``;

const TableWrap = styled.div`
  ${({ theme }) => theme.flex('center', 'center')};
`;

const Table = styled.table`
  width: 1100px;
  margin: 0 auto;
  margin-top: 40px;
`;
const Th = styled.th`
  height: 60px;
  border-bottom: 2px solid black;
  font-size: 13px;
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

const DeleteBtnWrap = styled.div`
  ${props => props.theme.flex('flex-start')}
  width: 1200px;
  margin: 30px 0;
`;

const DeleteBtn = styled.button`
  padding: 10px;
  border: 1px solid black;
  border-radius: 5px;
  margin-left: 80px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #e6a225;
    color: white;
    border: 1px solid white;
  }
`;

const influencerList = [
  {
    image: '/images/down.png',
    id: '123_as',
    categories: ['스포츠', '음식'],
    tags: ['축구', '농구', '요리', '맛집'],
    gender: 'M',
    follow: '3000',
    post: '20',
    like: '100',
    comment: '130',
    status: '수락',
  },
  {
    image: '/images/down.png',
    id: 'qwe124_as',
    categories: ['스포츠', '음식'],
    tags: ['축구', '농구', '요리', '맛집'],
    gender: 'M',
    follow: '280000',
    post: '190',
    like: '3000',
    comment: '200',
    status: '수락',
  },
  {
    image: '/images/down.png',
    id: 'qwe125_as',
    categories: ['스포츠', '음식'],
    tags: ['축구', '농구', '요리', '맛집'],
    gender: 'M',
    follow: '330000',
    post: '760',
    like: '72000',
    comment: '13000',
    status: '수락',
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
    status: '대기',
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
    status: '거절',
  },
];
