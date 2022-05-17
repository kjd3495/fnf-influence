import React, { useEffect } from 'react';
import styled from 'styled-components';
import { API } from '../../config';

const CampaignTable = ({ id, summaryInfo, setSummaryInfo }) => {
  useEffect(() => {
    fetch(`${API.campaignTable}/${id}`, {
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
  }, [id, setSummaryInfo]);

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
        {summaryInfo.length !== 0 && (
          <tr>
            <Data>{summaryInfo.totalCount}</Data>
            <Data>{summaryInfo.acceptCount}</Data>
            <Data>{summaryInfo.waitCount}</Data>
            <Data>{summaryInfo.rejectCount}</Data>
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
  background-color: #f0f5f7;
`;

const Data = styled.td`
  padding: 6px;
  border: 1px solid black;
  border-collapse: collapse;
  text-align: center;
`;
