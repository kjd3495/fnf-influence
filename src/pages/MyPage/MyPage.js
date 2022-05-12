import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import SummaryTable from './SummaryTable';
import Folder from './Folder';
import CreateCampaignModal from './CreateCampaignModal';

const MyPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [campaignInfo, setCampaignInfo] = useState([]);
  const [campaignCount, setCampaignCount] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetch(
      `http://172.2.0.189:8000/filter/user-campaign-list${
        location.search || `?limit=6&offset=0`
      }`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzksImlhdCI6MTY1MjMzNDM2MywiZXhwIjoxNjUzNjMwMzYzfQ.9ma55YRXI0PWXJ2PRGFhRb6GF9lxo5ZOuJXfxeV-ki0',
        },
      }
    )
      .then(res => res.json())
      .then(data => setCampaignInfo(data.result));
  }, [location.search]);

  const buttonLength = campaignCount && Math.ceil(campaignCount / 6);

  const buttonLengthArr = Array(buttonLength)
    .fill()
    .map((arr, i) => {
      return i + 1;
    });

  const updateOffset = value => {
    const limit = 6;
    const offset = value * limit;
    const queryString = `?limit=${limit}&offset=${offset}`;

    navigate(queryString);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <MyPageWrap>
      <TableWrap>
        <SummaryTable setCampaignCount={setCampaignCount} />
      </TableWrap>
      <ButtonWrap>
        <CreateCampaign onClick={openModal}>캠페인 생성하기</CreateCampaign>
      </ButtonWrap>
      <CreateCampaignModal modalOpen={modalOpen} setModalOpen={setModalOpen} />
      <CampaignWrap>
        {campaignInfo.map(({ id, campaign_name }) => (
          <Folder key={id} id={id} campaign_name={campaign_name} />
        ))}
      </CampaignWrap>
      <PaginationButtonWrap>
        {buttonLength &&
          buttonLengthArr.map(data => (
            <PaginationButton key={data} onClick={() => updateOffset(data - 1)}>
              {data}
            </PaginationButton>
          ))}
      </PaginationButtonWrap>
    </MyPageWrap>
  );
};

export default MyPage;

const MyPageWrap = styled.div`
  margin: 10px;
`;

const TableWrap = styled.div`
  ${({ theme }) => theme.flex('center')};
`;

const ButtonWrap = styled.div`
  ${({ theme }) => theme.flex('flex-end')}
`;
const CreateCampaign = styled.button`
  margin: 30px 120px;
  padding: 6px;
  background-color: white;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    background-color: #0074e9;
    color: white;
  }
`;

const CampaignWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin: 0px auto;
`;

const PaginationButtonWrap = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
`;

const PaginationButton = styled.button`
  ${({ theme }) => theme.flex('center', 'center')};
  background-color: white;
  border: none;
  font-size: 17px;
  cursor: pointer;

  &:hover {
    color: #0074e9;
  }
`;
