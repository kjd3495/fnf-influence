import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Influencer = ({ influencer, checkList, handleCheck }) => {
  const navigate = useNavigate();
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
    navigate(`/detail/${id}`);
  };

  return (
    <Tr onClick={goToDetail}>
      <Td>
        <CheckBox
          type="checkbox"
          checked={checkList.includes(id)}
          onChange={e => handleCheck(e, id)}
        />
      </Td>
      <Td>
        <Img image={influencer_img} />
      </Td>
      <Td>{influencer_instagram_id}</Td>
      <Td>
        <Div>
          {influencer_categories.length !== 0 &&
            influencer_categories.map(category => (
              <div key={category.categoryID}>
                {category.category.category_name}
              </div>
            ))}
        </Div>
      </Td>
      <Td>
        <Div>
          {influencer_hashtags.length !== 0 &&
            influencer_hashtags.map(tag => (
              <div key={tag.hashtagID}>#{tag.hashtag.hashtag_name}</div>
            ))}
        </Div>
      </Td>
      <Td>{influencer_gender}</Td>
      <Td>
        {influencer_follower >= 10000
          ? parseInt(influencer_follower / 10000) + '만'
          : Math.floor(influencer_follower)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Td>
      <Td>
        {influencer_posting >= 10000
          ? parseInt(influencer_posting / 10000) + '만'
          : Math.floor(influencer_posting)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Td>
      <Td>
        {influencer_average_like >= 10000
          ? parseInt(influencer_average_like / 10000) + '만'
          : Math.floor(influencer_average_like)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Td>
      <Td>
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
    transform: scale(1.1);
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
