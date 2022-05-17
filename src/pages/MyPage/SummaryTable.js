import React, { useEffect } from 'react';
import styled from 'styled-components';
import { API } from '../../config';

const SummaryTable = ({ tableInfo, setTableInfo, setCampaignCount }) => {
  useEffect(() => {
    fetch(`${API.totalInfluencer}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.result.brand) {
          setTableInfo(data.result);
          setCampaignCount(data.result.campaignCount);
        }
      });
  }, [setCampaignCount, setTableInfo]);

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
        {tableInfo.brand && (
          <tr>
            <Data>{tableInfo.brand}</Data>
            <Data>{tableInfo.campaignCount}</Data>
            <Data>{tableInfo.totalRequest}</Data>
            <Data>{tableInfo.totalAccept}</Data>
            <Data>{tableInfo.totalWait}</Data>
            <Data>{tableInfo.totalReject}</Data>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default SummaryTable;

const HEADER_INFO = [
  { id: 1, header: '브랜드' },
  { id: 2, header: '캠페인' },
  { id: 3, header: '전체 요청' },
  { id: 4, header: '수락된 요청' },
  { id: 5, header: '대기중인 요청' },
  { id: 6, header: '거절된 요청' },
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
