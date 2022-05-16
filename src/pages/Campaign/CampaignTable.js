import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const CampaignTable = ({ id }) => {
  const [info, setInfo] = useState({});

  useEffect(() => {
    fetch(`http://172.2.0.189:8000/count/campaign-influencer/${id}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setInfo(data.result);
      });
  }, [id]);

  return (
    <Table>
      <thead>
        <tr>
          {HEADER_INFO.map(({ id, header }) => (
            <Header key={id}>{header}</Header>
          ))}
        </tr>
      </thead>
      <tbody>
        {info && (
          <tr>
            <Data>{info.totalCount}</Data>
            <Data>{info.acceptCount}</Data>
            <Data>{info.waitCount}</Data>
            <Data>{info.rejectCount}</Data>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default CampaignTable;

const HEADER_INFO = [
  { id: 1, header: '전체' },
  { id: 2, header: '수락된 요청' },
  { id: 3, header: '대기중인 요청' },
  { id: 4, header: '거절된 요청' },
];

const Table = styled.table`
  margin-top: 30px;
  border: 1px solid black;
  boder-collapse: collapse;
`;

const Header = styled.th`
  width: 170px;
  padding: 6px;
  border: 1px solid black;
  border-collapse: collapse;
`;

const Data = styled.td`
  padding: 6px;
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
`;
