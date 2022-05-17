import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import Modal from 'react-modal';
import { API } from '../../config';

const UpdateModal = ({ updateOpen, setUpdateOpen, id, setCampaignInfo }) => {
  const location = useLocation();
  const [nameValue, setNameValue] = useState('');

  const updateCampaignName = () => {
    fetch(`${API.updateCampaign}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
        Authorization: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({
        campaignName: nameValue,
      }),
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
        } else if (res.message === 'Already exist name') {
          alert('이미 존재하는 캠페인입니다');
        }
      })
      .then(setUpdateOpen(false));
  };

  const nameHandler = e => {
    setNameValue(e.target.value);
  };

  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={updateOpen}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <InputWrap>
        <CampaignName>캠페인명:</CampaignName>
        <CampaignNameInput onChange={nameHandler} />
      </InputWrap>
      <ButtonWrap>
        <Button onClick={updateCampaignName}>수정</Button>
        <Button onClick={() => setUpdateOpen(false)}>취소</Button>
      </ButtonWrap>
    </Modal>
  );
};

export default UpdateModal;

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

const CampaignNameInput = styled.input`
  width: 200px;
  height: 30px;
  margin: 5px;
  border: 1px solid black;
`;

const ButtonWrap = styled.div`
  ${({ theme }) => theme.flex('flex-end')};
`;

const Button = styled.button`
  width: 50px;
  margin: 5px;
  border: 1px solid #dadee0;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.selectColor};
    color: white;
  }
`;
