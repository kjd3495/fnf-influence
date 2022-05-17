import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import { API } from '../../config';

const DeleteModal = ({
  deleteOpen,
  setDeleteOpen,
  id,
  setCampaignCount,
  setCampaignInfo,
  setTableInfo,
}) => {
  const location = useLocation();
  const deleteCampaign = () => {
    fetch(`${API.deleteCampaign}/${id}`, {
      method: 'Delete',
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(res => {
        if (res.message === 'Success') {
          fetch(
            `${API.userCampaignList}${location.search || `?limit=6&offset=0`}`,
            {
              method: 'GET',
              headers: {
                'Content-type': 'application/json',
                Authorization: localStorage.getItem('access_token'),
              },
            }
          )
            .then(res => res.json())
            .then(data => {
              setCampaignInfo(data.result);
            });
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
        }
      })
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
  border: 1px solid #dadee0;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.selectColor};
    color: white;
  }
`;
