import axios from 'axios';

const kakaoLogin = () => {
  window.Kakao.Auth.login({
    success: res => {
      const kakaoToken = res.access_token;
      window.Kakao.API.request({
        url: '/v2/user/me',
        data: {
          property_keys: ['kakao_account.email'],
        },
        success: res => {
          axios({
            url: 'api',
            method: 'POST',
            header: kakaoToken,
            data: { email: res.kakao_account.email },
          })
            .then(res => console.log(res))
            .catch(error => console.log(error));
        },
        fail: error => {
          console.log(error);
          alert('다시 시도해 주세요.');
        },
      });
    },
    fail: error => {
      console.log(error);
      alert('다시 시도해 주세요.');
    },
  });
};

export default kakaoLogin;
