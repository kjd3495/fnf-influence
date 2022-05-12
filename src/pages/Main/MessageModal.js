import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';

const MessageModal = ({ openModal, setOpenModal }) => {
  const [campaignList, setCampaignList] = useState([]);
  const [inputValues, setInputValues] = useState({
    campaign: '',
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
        console.log(campaignList);
      }
    }
    fetchData();
  }, []);

  const handleContent = e => {
    setInputValues({ ...inputValues.content, content: e.target.value });
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
            <P>캠페인명</P>
            <select>
              {campaignList.map(campaign => (
                <option key={campaign} value={campaign}>
                  {campaign}
                </option>
              ))}
            </select>
          </li>
          <li>
            <P>메시지 내용</P>
            <TextArea value={inputValues.content} onChange={handleContent} />
          </li>

          <li>
            <button type="button">보내기</button>
            <button type="button" onClick={() => setOpenModal(false)}>
              닫기
            </button>
          </li>
        </ul>
      </form>
    </Modal>
  );
};
const TextArea = styled.textarea`
  width: 800px;
  height: 600px;
  font-size: 15px;
  resize: none;
`;
const P = styled.p``;
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
  },
};

const campaignList = ['캠페인1', '캠페인2', '캠페인3'];
