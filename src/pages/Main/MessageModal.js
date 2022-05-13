import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const MessageModal = ({ openModal, setOpenModal, checkList, setCheckList }) => {
  const [campaignList, setCampaignList] = useState([]);
  const [inputValues, setInputValues] = useState({
    campaign: 0,
    content: '',
  });

  useEffect(() => {
    async function fetchData() {
      const campaignListRes = await fetch(
        'http://172.2.0.189:8000/filter/user-campaign-list?offset=0&limit=0',
        {
          headers: {
            Authorization: localStorage.getItem('access_token'),
          },
        }
      );
      if (campaignListRes.status === 200) {
        const campaignList = await campaignListRes.json();
        setCampaignList(campaignList.result);
        setInputValues(preState => {
          return {
            ...preState,
            campaign: campaignList.result[0].id,
          };
        });
      }
    }
    fetchData();
  }, []);

  const handleContent = e => {
    setInputValues({ ...inputValues, content: e.target.value });
  };

  const handleCampaign = e => {
    setInputValues({ ...inputValues, campaign: e.target.value });
  };
  const handleMessage = () => {
    fetch('http://172.2.0.189:8000/message/send', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: localStorage.getItem('access_token'),
      },
      body: JSON.stringify({
        content: inputValues.content,
        campaignID: inputValues.campaign,
        influencerIDs: checkList,
      }),
    }).then(res => {
      if (res.status === 200) {
        alert('전송이 완료되었습니다.');
        setOpenModal(false);
        setCheckList([]);
        setInputValues({ ...inputValues, content: '' });
      }
    });
  };
  return (
    <Modal
      isOpen={openModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <form className="createUser">
        <ul>
          <li>
            <SelectWrap>
              <p>캠페인명</p>
              <Select onChange={handleCampaign} value={inputValues.campaign}>
                {campaignList.map(campaign => (
                  <option key={campaign.id} value={campaign.id}>
                    {campaign.campaign_name}
                  </option>
                ))}
              </Select>
            </SelectWrap>
          </li>
          <li>
            <P>메시지 내용</P>
            <TextArea value={inputValues.content} onChange={handleContent} />
          </li>

          <li>
            <ButtonWrap>
              <Button type="button" onClick={handleMessage}>
                보내기
              </Button>
              <Button type="button" onClick={() => setOpenModal(false)}>
                닫기
              </Button>
            </ButtonWrap>
          </li>
        </ul>
      </form>
    </Modal>
  );
};

const SelectWrap = styled.div`
  ${props => props.theme.flex('flex-start', 'center')}
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 80px;
  margin-left: 20px;
`;
const TextArea = styled.textarea`
  width: 600px;
  height: 400px;
  margin-bottom: 10px;
  font-size: 15px;
  resize: none;
`;
const P = styled.p`
  margin-bottom: 10px;
`;

const ButtonWrap = styled.div`
  ${props => props.theme.flex('flex-end', 'center')}
`;

const Button = styled.button`
  width: 60px;
  height: 40px;
  padding: 10px;
  margin-left: 10px;
  border-radius: 8px;
  border: 1px solid #e6a225;
  background-color: #e6a225;
  color: #ffffff;
`;
export default MessageModal;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: '30px',
    border: '1px solid black',
    transform: 'translate(-50%, -50%)',
    fontSize: '20px',
    fontWeight: 'bold',
  },
};
