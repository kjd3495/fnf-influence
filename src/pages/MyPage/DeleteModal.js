import React from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';

const DeleteModal = ({ deleteOpen, setDeleteOpen, id }) => {
  const deleteCampaign = () => {
    fetch(`http://172.2.0.189:8000/campaign/delete-campaign/${id}`, {
      method: 'Delete',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json)
      .then(setDeleteOpen(false));
  };

  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={deleteOpen}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <InputWrap>
        <CampaignName>정말 삭제하시겠습니까?</CampaignName>
      </InputWrap>
      <ButtonWrap>
        <Button onClick={deleteCampaign}>예</Button>
        <Button onClick={() => setDeleteOpen(false)}>아니오</Button>
      </ButtonWrap>
    </Modal>
  );
};

export default DeleteModal;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    border: '1px solid black',
    transform: 'translate(-50%, -50%)',
  },
};

const InputWrap = styled.div`
  display: flex;
`;

const CampaignName = styled.div`
  ${({ theme }) => theme.flex('center', 'center')}
`;

const ButtonWrap = styled.div`
  ${({ theme }) => theme.flex('center', 'center')};
  margin-top: 10px;
`;

const Button = styled.button`
  width: 60px;
  margin: 0 10px;
  border: 1px solid black;
  cursor: pointer;

  &:hover {
    background-color: #0074e9;
    color: white;
  }
`;
