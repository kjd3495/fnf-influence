import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import InfluencerTable from './InfluencerTable';
import CampaignTable from './CampaignTable';
import DropDown from './DropDown';
import { API } from '../../config';

const Campaign = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [filterValues, setFilterValues] = useState({
    sort_by: 'influencer_follower',
    sort_option: 'down',
    sort_status_by: 1,
  });
  const [tableInfo, setTableInfo] = useState([]);
  const [totalInfo, setTotalInfo] = useState([]);
  const [isShowAll, setIsShowAll] = useState(true);
  const [pagenation, setPagenation] = useState({
    limit: 5,
    offset: 0,
  });
  const [checkList, setCheckList] = useState([]);
  const [summaryInfo, setSummaryInfo] = useState({});
  const [buttonIndex, setButtonIndex] = useState(1);

  useEffect(() => {
    const queryUrl = `${
      filterValues.sort_by && filterValues.sort_option
        ? `?sort_by=${filterValues.sort_by}&sort_option=${filterValues.sort_option}`
        : ``
    }${`&sort_status_by=${filterValues.sort_status_by}`}${`&limit=${pagenation.limit}&offset=${pagenation.offset}`}&campaignId=${
      params.id
    }`;
    navigate(queryUrl.replace(/ /g, '').replace(/(\r\n|\n|\r)/g, ''));

    fetch(`${API.campaignInfluencerList}${queryUrl}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => setTableInfo(data.result));
  }, [filterValues, pagenation, navigate, params.id]);

  useEffect(() => {
    const queryUrl = `${
      filterValues.sort_by && filterValues.sort_option
        ? `?sort_by=${filterValues.sort_by}&sort_option=${filterValues.sort_option}`
        : ``
    }${`&limit=${pagenation.limit}&offset=${pagenation.offset}`}&campaignId=${
      params.id
    }`;
    navigate(queryUrl.replace(/ /g, '').replace(/(\r\n|\n|\r)/g, ''));

    fetch(`${API.campaignTotalInfluencerList}${queryUrl}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => setTotalInfo(data.result));
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
      setIsShowAll(true);
    } else if (value === '대기') {
      setIsShowAll(false);
      setFilterValues({ ...filterValues, sort_status_by: 1 });
    } else if (value === '수락') {
      setIsShowAll(false);
      setFilterValues({ ...filterValues, sort_status_by: 2 });
    } else if (value === '거절') {
      setIsShowAll(false);
      setFilterValues({ ...filterValues, sort_status_by: 3 });
    }
  };

  const deleteInfluencer = () => {
    const queryUrl = `${
      filterValues.sort_by && filterValues.sort_option
        ? `?sort_by=${filterValues.sort_by}&sort_option=${filterValues.sort_option}`
        : ``
    }${`&limit=${pagenation.limit}&offset=${pagenation.offset}`}&campaignId=${
      params.id
    }`;

    fetch(`${API.campaignDeleteInfluencer}`, {
      method: 'Delete',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({ campaignId: params.id, influencerId: checkList }),
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'Success') {
          fetch(`${API.campaignInfluencerList}${queryUrl}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: localStorage.getItem('access_token'),
            },
          })
            .then(res => res.json())
            .then(data => setTableInfo(data.result));
          fetch(`${API.campaignTotalInfluencerList}${queryUrl}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: localStorage.getItem('access_token'),
            },
          })
            .then(res => res.json())
            .then(data => setTotalInfo(data.result));
          fetch(`${API.campaignTable}/${params.id}`, {
            method: 'GET',
            headers: {
              'Content-type': 'application/json',
              Authorization: localStorage.getItem('access_token'),
            },
          })
            .then(res => res.json())
            .then(data => {
              setSummaryInfo(data.result);
            });
        }
      });
  };

  const buttonLength =
    summaryInfo.totalCount && Math.ceil(summaryInfo.totalCount / 5);

  const buttonLengthArr = Array(buttonLength)
    .fill()
    .map((arr, i) => {
      return i + 1;
    });

  return (
    <CampaignWrap>
      <Button onClick={() => navigate('/mypage')} type="button">
        뒤로가기
      </Button>
      <TableWrap>
        <CampaignTable
          id={params.id}
          summaryInfo={summaryInfo}
          setSummaryInfo={setSummaryInfo}
        />
        <DropDown sortHandler={sortHandler} />
      </TableWrap>
      <BodyTableWrap>
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
                      filterValues.sort_by === sortTh.name
                        ? '#E6A225'
                        : '#212121'
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
            {isShowAll
              ? totalInfo[0] &&
                totalInfo.map(data => (
                  <InfluencerTable
                    key={data.id}
                    data={data}
                    checkList={checkList}
                    handleCheck={handleCheck}
                  />
                ))
              : tableInfo[0] &&
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
      </BodyTableWrap>
      <DeleteBtnWrap>
        <DeleteBtn onClick={deleteInfluencer}>선택 삭제</DeleteBtn>
        <PaginationButtonWrap>
          {buttonLength !== 0 ? (
            buttonLengthArr.map(data => (
              <PaginationButton
                key={data}
                onClick={() => {
                  setPagenation(prestate => ({
                    ...prestate,
                    offset: (data - 1) * 5,
                  }));
                  setButtonIndex(data);
                }}
                color={buttonIndex === data ? '#E6A225' : 'black'}
              >
                {data}
              </PaginationButton>
            ))
          ) : (
            <PaginationButton
              onClick={() => {
                setPagenation(prestate => ({
                  ...prestate,
                  offset: 0,
                }));
              }}
              color="#E6A225"
            >
              1
            </PaginationButton>
          )}
        </PaginationButtonWrap>
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
  { title: '평균 좋아요', name: 'influencer_average_like' },
  { title: '평균 댓글', name: 'influencer_average_comment' },
];

const Button = styled.button`
  width: 100px;
  height: 30px;
  margin-bottom: 5vh;
  margin-left: 4vw;
  background-color: ${props => props.theme.selectColor};
  border: 1px solid ${props => props.theme.selectColor};
  border-radius: 8px;
  color: ${props => props.theme.white};
  cursor: pointer;
`;

const CampaignWrap = styled.div`
  background-color: ${({ theme }) => theme.lightGray};
  min-height: 91vh;
  padding: 30px;
`;

const TableWrap = styled.div`
  ${({ theme }) => theme.flex('center', 'center')};
  padding-bottom: 30px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.white};
`;

const BodyTableWrap = styled.div`
  padding-bottom: 30px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.white};
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
  display: flex;
  position: relative;
  width: 1200px;
  margin: 30px 0;
`;

const DeleteBtn = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  margin-left: 80px;
  background-color: ${({ theme }) => theme.selectColor};
  color: white;
  cursor: pointer;
`;

const PaginationButtonWrap = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
  position: absolute;
  left: 50%;
`;

const PaginationButton = styled.button`
  ${({ theme }) => theme.flex('center', 'center')};
  background-color: ${({ theme }) => theme.lightGray};
  border: none;
  font-size: 17px;
  color: ${props => props.color};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.selectColor};
  }
`;
