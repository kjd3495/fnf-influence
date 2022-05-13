import React from 'react';
import styled from 'styled-components';

const Influencer = ({ data, checkList, handleCheck }) => {
  const {
    id,
    influencer_img,
    influencer_instagram_id,
    influencer_categories,
    influencer_hashtags,
    influencer_gender,
    influencer_follower,
    influencer_posting,
    influencer_average_like,
    influencer_average_comment,
  } = data;

  return (
    <Tr>
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
        {influencer_categories.map((category, idx) => (
          <Div key={idx}>{category.category.category_name}</Div>
        ))}
      </Td>
      <Td>
        {influencer_hashtags.map((data, idx) => (
          <Div key={idx}>#{data.hashtag.hashtag_name}</Div>
        ))}
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
      <Td>{data.messages[0].status.status_name}</Td>
    </Tr>
  );
};

const Tr = styled.tr`
  height: 180px;
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
  margin-top: 10px;
`;

export default Influencer;
