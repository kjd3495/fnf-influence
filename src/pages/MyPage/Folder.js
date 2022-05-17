import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

const Folder = ({
  campaign_name,
  id,
  setCampaignCount,
  setCampaignInfo,
  setTableInfo,
}) => {
  const navigate = useNavigate();

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const openDelete = () => {
    setDeleteOpen(true);
  };

  const openUpdate = () => {
    setUpdateOpen(true);
  };

  const goToCampaign = () => {
    navigate(`/campaign/${id}`);
  };

  return (
    <FolderWrap>
      <FolderHeader />
      <FolderBody onClick={goToCampaign}>{campaign_name}</FolderBody>
      <DeleteModal
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        id={id}
        setCampaignInfo={setCampaignInfo}
        setCampaignCount={setCampaignCount}
        setTableInfo={setTableInfo}
      />
      <FolderButtonWrap>
        <FolderButton onClick={openUpdate}>수정</FolderButton>
        <FolderButton onClick={openDelete}>삭제</FolderButton>
      </FolderButtonWrap>
      <UpdateModal
        updateOpen={updateOpen}
        setUpdateOpen={setUpdateOpen}
        id={id}
        setCampaignInfo={setCampaignInfo}
      />
    </FolderWrap>
  );
};

export default Folder;

const FolderWrap = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
  flex-direction: column;
`;

const FolderHeader = styled.div`
  width: 170px;
  border: 1.5px solid black;
  border-bottom: none;
  padding: 5px;
  background-color: #c4ebff;
  transform: translateX(-30px);
`;

const FolderBody = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
  width: 250px;
  height: 130px;
  border: 1.5px solid black;
  background-color: #c4ebff;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: ${({ theme }) => theme.selectColor};
  }
`;

const FolderButtonWrap = styled.div`
  ${({ theme }) => theme.flex('center')}
  width: 250px;
  margin: 10px 0;
`;

const FolderButton = styled.button`
  margin: 10px;
  border: 1px solid #dadee0;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.lightGray};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.selectColor};
    color: white;
  }
`;
