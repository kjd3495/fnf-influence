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
  const [tableInfo, setTableInfo] = useState({});
  const [buttonIndex, setButtonIndex] = useState(1);

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
          Authorization: localStorage.getItem('access_token'),
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
    setButtonIndex(value + 1);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <MyPageWrap>
      <TableWrap>
        <SummaryTable
          tableInfo={tableInfo}
          setTableInfo={setTableInfo}
          setCampaignCount={setCampaignCount}
        />
      </TableWrap>
      <ButtonWrap>
        <CreateCampaign onClick={openModal}>캠페인 생성하기</CreateCampaign>
      </ButtonWrap>
      <CreateCampaignModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        setCampaignInfo={setCampaignInfo}
        setCampaignCount={setCampaignCount}
        setTableInfo={setTableInfo}
      />
      {buttonLength !== 0 ? (
        <CampaignWrap>
          {campaignInfo.length !== 0 &&
            campaignInfo.map(({ id, campaign_name }) => (
              <Folder
                key={id}
                id={id}
                campaign_name={campaign_name}
                setCampaignInfo={setCampaignInfo}
                setCampaignCount={setCampaignCount}
                setTableInfo={setTableInfo}
              />
            ))}
        </CampaignWrap>
      ) : (
        <PhraseWrap>
          <PhraseHolder>캠페인을 생성해주세요</PhraseHolder>
        </PhraseWrap>
      )}
      <PaginationButtonWrap>
        {buttonLength !== 0 ? (
          buttonLengthArr.map(data => (
            <PaginationButton
              key={data}
              onClick={() => updateOffset(data - 1)}
              color={data === buttonIndex ? '#E6A225' : 'black'}
            >
              {data}
            </PaginationButton>
          ))
        ) : (
          <PaginationButton onClick={() => updateOffset(0)} color="#E6A225">
            1
          </PaginationButton>
        )}
      </PaginationButtonWrap>
    </MyPageWrap>
  );
};

export default MyPage;

const MyPageWrap = styled.div`
  background-color: ${({ theme }) => theme.lightGray};
  padding: 30px;
`;

const TableWrap = styled.div`
  ${({ theme }) => theme.flex('center')};
  padding-bottom: 30px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.white};
`;

const ButtonWrap = styled.div`
  ${({ theme }) => theme.flex('flex-end')}
`;
const CreateCampaign = styled.button`
  margin: 30px 120px;
  padding: 10px;
  border: none;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.selectColor};
  color: white;
  cursor: pointer;
`;

const CampaignWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  margin-bottom: 30px;
  padding: 30px 0px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.white};
`;

const PaginationButtonWrap = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
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
    cursor: pointer;
  }
`;

const PhraseWrap = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
  margin-bottom: 30px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.white};
`;

const PhraseHolder = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
  height: 250px;
  margin-bottom: 50px;
  font-size: 30px;
`;
