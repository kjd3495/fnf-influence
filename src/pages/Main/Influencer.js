import React from 'react';
import styled from 'styled-components';

const Influencer = ({
  influencer,
  checkList,
  handleCheck,
  openModal,
  setOpenModal,
  setInfluencerInfo,
}) => {
  const {
    id,
    influencer_instagram_id,
    influencer_img,
    influencer_gender,
    influencer_follower,
    influencer_posting,
    influencer_average_like,
    influencer_average_comment,
    influencer_categories,
    influencer_hashtags,
  } = influencer;

  const goToDetail = () => {
    const token = localStorage.getItem('access_token');
    if (token !== null) {
      setOpenModal({ ...openModal, detailModal: true });
      setInfluencerInfo(influencer);
    } else {
      alert('로그인 후 사용해주세요');
    }
  };

  return (
    <Tr>
      <Td>
        <CheckBox
          type="checkbox"
          checked={checkList.includes(id)}
          onChange={e => handleCheck(e, id)}
        />
      </Td>
      <Td onClick={goToDetail}>
        <Img image={influencer_img} />
      </Td>
      <Td onClick={goToDetail}>{influencer_instagram_id}</Td>
      <Td onClick={goToDetail}>
        <Div>
          {influencer_categories.length !== 0 &&
            influencer_categories.map(category => (
              <div key={category.categoryID}>
                {category.category.category_name}
              </div>
            ))}
        </Div>
      </Td>
      <Td onClick={goToDetail}>
        <Div>
          {influencer_hashtags.length !== 0 &&
            influencer_hashtags.map(tag => (
              <div key={tag.hashtagID}>#{tag.hashtag.hashtag_name}</div>
            ))}
        </Div>
      </Td>
      <Td onClick={goToDetail}>{influencer_gender}</Td>
      <Td onClick={goToDetail}>
        {influencer_follower >= 10000
          ? parseInt(influencer_follower / 10000) + '만'
          : Math.floor(influencer_follower)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Td>
      <Td onClick={goToDetail}>
        {influencer_posting >= 10000
          ? parseInt(influencer_posting / 10000) + '만'
          : Math.floor(influencer_posting)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Td>
      <Td onClick={goToDetail}>
        {influencer_average_like >= 10000
          ? parseInt(influencer_average_like / 10000) + '만'
          : Math.floor(influencer_average_like)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Td>
      <Td onClick={goToDetail}>
        {influencer_average_comment >= 10000
          ? parseInt(influencer_average_comment / 10000) + '만'
          : Math.floor(influencer_average_comment)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Td>
    </Tr>
  );
};

const Tr = styled.tr`
  height: 180px;
  cursor: pointer;
  &:hover {
    transform: scale(1.05);
  }
`;
const Td = styled.td`
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid gray;
`;

const CheckBox = styled.input`
  width: 18px;
  height: 18px;
`;

const Img = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  padding: 10px;
  background-image: url(${props => props.image});
  background-size: contain;
  background-repeat: no-repeat;
`;

const Div = styled.div`
  ${props => props.theme.flex('space-around', 'center')};
  flex-direction: column;
  height: 120px;
`;

export default Influencer;
