import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { API } from '../../config';

const DetailModal = ({ openModal, setOpenModal, influencerId }) => {
  const [influencerInfo, setInfluencerInfo] = useState({});
  const [imgList, setImgList] = useState([]);
  const [hashTagList, setHashTagList] = useState([]);

  const {
    influencer_average_comment,
    influencer_average_like,
    influencer_follower,
    influencer_img,
    influencer_instagram_id,
    influencer_posting,
  } = influencerInfo;

  useEffect(() => {
    if (influencerId) {
      async function fetchData() {
        const infoRes = await fetch(`${API.detail}/${influencerId}`, {
          headers: { Authorization: localStorage.getItem('access_token') },
        });
        if (infoRes.status === 200) {
          const info = await infoRes.json();
          setInfluencerInfo(info.result);
          setImgList(info.imageList);
          setHashTagList(info.result.influencer_hashtags);
        }
      }
      fetchData();
    }
  }, [influencerId]);

  return (
    <Modal
      isOpen={openModal.detailModal}
      style={customStyles}
      ariaHideApp={false}
      contentLabel="Example Modal"
    >
      <DetailWrap>
        <Button
          onClick={() => setOpenModal({ ...openModal, detailModal: false })}
          type="button"
        >
          닫기
        </Button>
        <Top>
          <TopLeft>
            <ProfileImg imgUrl={influencer_img} />
            <Id>{influencer_instagram_id}</Id>
          </TopLeft>
          <TopRigth>
            <Columns>
              <Column>
                <Title>팔로워</Title>
                <Content>
                  {influencer_follower >= 10000
                    ? parseInt(influencer_follower / 10000) + '만'
                    : Math.floor(influencer_follower)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Content>
              </Column>
              <Column>
                <Title>게시글 수</Title>
                <Content>
                  {influencer_posting >= 10000
                    ? parseInt(influencer_posting / 10000) + '만'
                    : Math.floor(influencer_posting)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Content>
              </Column>
              <Column>
                <Title>평균 좋아요</Title>
                <Content>
                  {influencer_average_like >= 10000
                    ? parseInt(influencer_average_like / 10000) + '만'
                    : Math.floor(influencer_average_like)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Content>
              </Column>
              <Column>
                <Title>평균 댓글</Title>
                <Content>
                  {influencer_average_comment >= 10000
                    ? parseInt(influencer_average_comment / 10000) + '만'
                    : Math.floor(influencer_average_comment)
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </Content>
              </Column>
            </Columns>

            <HashTagsWrap>
              <P>가장 많이 사용한 #</P>
              <HashTags>
                {hashTagList.length !== 0 &&
                  hashTagList.map((tag, idx) => (
                    <Tag key={idx}>#{tag.hashtag.hashtag_name}</Tag>
                  ))}
              </HashTags>
            </HashTagsWrap>
          </TopRigth>
        </Top>

        <Images>
          {imgList.map((image, idx) => (
            <Image key={idx} imgUrl={image.image_url} />
          ))}
        </Images>
      </DetailWrap>
    </Modal>
  );
};

const Button = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 2vh;
  margin-left: 1vw;
  background-color: ${props => props.theme.selectColor};
  border: 1px solid ${props => props.theme.selectColor};
  border-radius: 8px;
  color: ${props => props.theme.white};
  cursor: pointer;
`;

const DetailWrap = styled.div`
  background-color: ${props => props.theme.lightGray};
  padding: 10px;
`;

const Top = styled.div`
  display: flex;
  width: 500px;
  margin: 0 auto;
  padding: 40px 20px;
  border-bottom: 1px solid #212121;
`;

const TopLeft = styled.div`
  width: 110px;
`;

const TopRigth = styled.div`
  ${props => props.theme.flex('center', 'center')}
  flex-direction: column;
  width: 380px;
  margin-left: 10px;
`;

const ProfileImg = styled.div`
  width: 110px;
  height: 110px;
  background-image: url(${props => props.imgUrl});
  background-repeat: no-repeat;
  background-size: contain;
`;

const Id = styled.div`
  width: 90px;
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;
const Columns = styled.div`
  ${props => props.theme.flex('center', 'center')}
`;
const Column = styled.div`
  width: 90px;
`;

const Title = styled.div`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;

const Content = styled.div`
  margin-top: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
`;

const HashTagsWrap = styled.div`
  width: 320px;
  margin-top: 40px;
`;

const P = styled.p`
  font-size: 15px;
  font-weight: bold;
`;

const HashTags = styled.div`
  ${props => props.theme.flex('space-around', 'center')}
  width: 100%;
  margin-top: 20px;
`;

const Tag = styled.div`
  font-size: 13px;
  font-weight: bold;
`;

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 500px;
  margin: 0 auto;
  margin-top: 10px;
  padding: 0 10px;
`;

const Image = styled.div`
  width: 150px;
  height: 150px;
  margin-left: 15px;
  margin-bottom: 15px;
  background-image: url(${props => props.imgUrl});
  background-repeat: no-repeat;
  background-size: cover;
  &:nth-child(4n) {
    margin-left: 0;
  }
  &:first-child {
    margin-left: 0;
  }
`;
export default DetailModal;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    padding: 0,
    border: 'none',
    transform: 'translate(-50%, -50%)',
    fontSize: '20px',
    fontWeight: 'bold',
  },
};
