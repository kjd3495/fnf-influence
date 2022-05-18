import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { useLocation } from 'react-router-dom';
import { API } from '../../config';

const CreateCampaignModal = ({
  modalOpen,
  setModalOpen,
  setCampaignInfo,
  setCampaignCount,
  setTableInfo,
}) => {
  const location = useLocation();
  const [nameValue, setNameValue] = useState('');

  const postCampaignName = () => {
    if (nameValue.length === 0) {
      alert('캠페인명을 입력해주세요');
    } else if (nameValue.length > 20) {
      alert('캠페인명은 20자를 넘을 수 없습니다');
    } else {
      fetch(`${API.createCampaign}`, {
        method: 'POST',
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
              `${API.userCampaignList}${
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
          } else if (res.message === 'Already exist name') {
            alert('이미 존재하는 캠페인입니다');
          }
        })
        .then(() => {
          setModalOpen(false);
          setNameValue('');
        });
    }
  };

  const nameHandler = e => {
    setNameValue(e.target.value);
  };

  Modal.setAppElement('#root');

  return (
    <Modal isOpen={modalOpen} style={customStyles} contentLabel="Example Modal">
      <InputWrap>
        <CampaignName>캠페인명:</CampaignName>
        <CampaignNameInput onChange={nameHandler} />
      </InputWrap>
      <ButtonWrap>
        <Button onClick={postCampaignName}>생성</Button>
        <Button onClick={() => setModalOpen(false)}>취소</Button>
      </ButtonWrap>
    </Modal>
  );
};

export default CreateCampaignModal;

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
  background-color: ${({ theme }) => theme.lightGray};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.selectColor};
    color: white;
  }
`;
