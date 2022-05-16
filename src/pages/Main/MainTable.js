import React from 'react';
import styled from 'styled-components';
import Influencer from './Influencer';

const MainTable = ({
  filterValues,
  setFilterValues,
  influencerList,
  checkList,
  setCheckList,
}) => {
  const handleSorting = name => {
    const token = localStorage.getItem('access_token');
    if (token !== null) {
      if (filterValues.sort_by !== name) {
        setFilterValues({
          ...filterValues,
          sort_by: name,
          sort_option: 'down',
        });
      } else if (filterValues.sort_option === 'down') {
        setFilterValues({ ...filterValues, sort_by: name, sort_option: 'up' });
      } else {
        setFilterValues({
          ...filterValues,
          sort_by: name,
          sort_option: 'down',
        });
      }
    } else {
      alert('로그인 후 이용해주세요');
    }
  };
  const handleCheck = (e, id) => {
    if (e.target.checked) {
      setCheckList([...checkList, id]);
    } else {
      setCheckList(checkList.filter(check_id => check_id !== id));
    }
  };
  return (
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
  );
};
const Table = styled.table`
  width: 1000px;
  margin: 0 auto;
  border-radius: 8px;
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
const Td = styled.td`
  height: 300px;
  border-bottom: 2px solid black;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
`;
export default MainTable;
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
