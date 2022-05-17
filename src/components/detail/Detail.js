import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { API } from '../../config';

const Detail = () => {
  const [influencerInfo, setInfluencerInfo] = useState({});
  const [imgList, setImgList] = useState([]);
  const [hashTagList, setHashTagList] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
  const {
    influencer_average_comment,
    influencer_average_like,
    influencer_follower,
    influencer_img,
    influencer_instagram_id,
    influencer_posting,
  } = influencerInfo;

  useEffect(() => {
    async function fetchData() {
      const infoRes = await fetch(`${API.detail}/${params.id}`, {
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
  }, [params]);

  return (
    <DetailWrap>
      <Button onClick={() => navigate(-1)} type="button">
        뒤로가기
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
  );
};

const Button = styled.button`
  width: 100px;
  height: 30px;
  margin-top: 5vh;
  margin-left: 4vw;
  background-color: ${props => props.theme.selectColor};
  border: 1px solid ${props => props.theme.selectColor};
  border-radius: 8px;
  color: ${props => props.theme.white};
  cursor: pointer;
`;

const DetailWrap = styled.div`
  background-color: ${props => props.theme.lightGray};
`;

const Top = styled.div`
  display: flex;
  width: 900px;
  margin: 0 auto;
  padding-top: 40px;
  padding-bottom: 60px;
  border-bottom: 1px solid #212121;
`;

const TopLeft = styled.div`
  width: 200px;
`;

const TopRigth = styled.div`
  ${props => props.theme.flex('center', 'center')}
  flex-direction: column;
  width: 660px;
  margin-left: 40px;
`;

const ProfileImg = styled.div`
  width: 200px;
  height: 200px;
  background-image: url(${props => props.imgUrl});
  background-repeat: no-repeat;
  background-size: contain;
`;

const Id = styled.div`
  width: 150px;
  margin-top: 20px;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;
const Columns = styled.div`
  ${props => props.theme.flex('center', 'center')}
`;
const Column = styled.div`
  width: 150px;
`;

const Title = styled.div`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`;

const Content = styled.div`
  margin-top: 20px;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

const HashTagsWrap = styled.div`
  width: 500px;
  margin-top: 50px;
`;

const P = styled.p`
  font-size: 20px;
  font-weight: bold;
`;

const HashTags = styled.div`
  ${props => props.theme.flex('space-around', 'center')}
  width: 100%;
  margin-top: 40px;
`;

const Tag = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 900px;
  margin: 0 auto;
  margin-top: 40px;
`;

const Image = styled.div`
  width: 280px;
  height: 280px;
  margin-left: 30px;
  margin-bottom: 30px;
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

export default Detail;
