import React from 'react';
import styled from 'styled-components';

const Influencer = ({ influencer, checkList, handleCheck }) => {
  const { image, id, categories, tags, gender, follow, post, like, comment } =
    influencer;

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
        <Img image={image} />
      </Td>
      <Td>{id}</Td>
      <Td>
        {categories.map((category, idx) => (
          <Div key={idx}>{category}</Div>
        ))}
      </Td>
      <Td>
        {tags.map((tag, idx) => (
          <Div key={idx}>#{tag}</Div>
        ))}
      </Td>
      <Td>{gender}</Td>
      <Td>
        {follow >= 10000
          ? parseInt(follow / 10000) + '만'
          : Math.floor(follow)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Td>
      <Td>
        {post >= 10000
          ? parseInt(post / 10000) + '만'
          : Math.floor(post)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Td>
      <Td>
        {like >= 10000
          ? parseInt(like / 10000) + '만'
          : Math.floor(like)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Td>
      <Td>
        {comment >= 10000
          ? parseInt(comment / 10000) + '만'
          : Math.floor(comment)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      </Td>
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
