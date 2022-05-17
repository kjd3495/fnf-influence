export const BASE_URL = 'http://15.164.163.52:8000';

export const API = {
  signin: `${BASE_URL}/user/signin`, // 로그인
  checkemail: `${BASE_URL}/user/check-email`, // 회원가입 이메일 중복체크
  signup: `${BASE_URL}/user/signup`, // 회원가입
  userCampaignList: `${BASE_URL}/filter/user-campaign-list`, // 마이페이지 캠페인 리스트
  createCampaign: `${BASE_URL}/campaign/create-campaign`, // 마이페이지 캠페인 생성
  totalInfluencer: `${BASE_URL}/count/total-influencer`, // 마이페이지 테이블
  deleteCampaign: `${BASE_URL}/campaign/delete-campaign`, // 마이페이지 캠페인 삭제
  updateCampaign: `${BASE_URL}/campaign/update-message`, // 마이페이지 캠페인 수정
  sendMessage: `${BASE_URL}/message/send`, // 메세지 보내기
  category: `${BASE_URL}/filter/category-list`, // 메인페이지 카테고리
  search: `${BASE_URL}/search`, // 검색
  main: `${BASE_URL}/filter/main`, // 메인페이지 비로그인 리스트
  influencerList: `${BASE_URL}/filter/category-influencer-list`, // 메인페이지 인플루언서 리스트
  detail: `${BASE_URL}/filter/influencer-image`, // 인플루언서 상세페이지
  campaignInfluencerList: `${BASE_URL}/filter/campaign-status-influencer-list`, // 캠페인페이지 인플루언서 리스트
  campaignTotalInfluencerList: `${BASE_URL}/filter/campaign-total-status-influencer-list`, // 캠페인페이지 인플루언서 모두보기 리스트
  campaignTable: `${BASE_URL}/count/campaign-influencer`, // 캠페인페이지 테이블
  campaignDeleteInfluencer: `${BASE_URL}/campaign/delete-influencer`, // 캠페인페이지 인플루언서 삭제
};
