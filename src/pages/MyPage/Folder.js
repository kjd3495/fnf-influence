import React, { useState } from 'react';
import styled from 'styled-components';
import DeleteModal from './DeleteModal';
import UpdateModal from './UpdateModal';

const Folder = ({ campaign_name, id }) => {
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);

  const openDelete = () => {
    setDeleteOpen(true);
  };

  const openUpdate = () => {
    setUpdateOpen(true);
  };

  return (
    <FolderWrap>
      <FolderHeader>인플루언서 수:</FolderHeader>
      <FolderBody>{campaign_name}</FolderBody>
      <DeleteModal
        deleteOpen={deleteOpen}
        setDeleteOpen={setDeleteOpen}
        id={id}
      />
      <FolderButtonWrap>
        <FolderButton onClick={openUpdate}>수정</FolderButton>
        <FolderButton onClick={openDelete}>삭제</FolderButton>
      </FolderButtonWrap>
      <UpdateModal
        updateOpen={updateOpen}
        setUpdateOpen={setUpdateOpen}
        id={id}
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
  transform: translateX(-30px);
`;

const FolderBody = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
  width: 250px;
  height: 130px;
  border: 1.5px solid black;
  cursor: pointer;

  &:hover {
    font-weight: bold;
    color: #0074e9;
  }
`;

const FolderButtonWrap = styled.div`
  ${({ theme }) => theme.flex('center')}
  width: 250px;
  margin: 10px 0;
`;

const FolderButton = styled.button`
  margin: 10px;
  border: 1px solid black;
  border-radius: 5px;
  background-color: white;
  cursor: pointer;

  &:hover {
    background-color: #0074e9;
    color: white;
  }
`;
