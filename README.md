# Our Record Frontend

### 연인들의 데이트 내용 기록 및 통계를 공유하는 웹 앱
<br>
<img width="1435" alt="our-record" src="https://user-images.githubusercontent.com/76767572/133405209-efe9247b-2af0-4531-bd34-4fcbe85152ff.png">

### 프로젝트 계획 및 기간

📆  2021.07.21 ~ 08.11

- 1st Sprint : 개발환경 초기세팅, 전체 레이아웃, 컴포넌트화
- 2nd Sprint : 컴포넌트 별 기능 구현, 프론트-백 통신, 코드 리팩토링, conflict 수정 작업
<br><br>

### 시연 영상 확인
<a href="https://youtu.be/0f0u_wUW_nY">
    <img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white/"
        style="width: 80px; height : auto; margin-left : 10px; margin-right : 10px;"/>
</a>  
<br><br>

---

## 페이지별 기능 Demo 및 구현 기능 상세

### 0. 공통
- React 기반의 웹 앱 제작 
- CRA를 사용한 초기 세팅
- styled-component를 사용한 스타일링
- axios instance를 생성해 백엔드 api 통신
- 상단 Navigation 컴포넌트 제작

### 1. 회원가입 / 로그인 페이지 (신미영)
![login](https://user-images.githubusercontent.com/76767572/133452020-01e1d17f-cb91-4daf-93ae-c6669e0cc2a9.gif)

- kakao 소셜 로그인 화면 레이아웃 제작 

### 2. 사용자 정보 등록 / 수정 페이지 (신미영)
![information](https://user-images.githubusercontent.com/76767572/133456548-5fa146fd-5511-404a-8b4a-052c37f46ccb.gif)

- 사용자 정보 등록 컴포넌트 제작 후 등록, 수정 페이지로 재사용
- useLocation을 활용해 사용자를 구분해 페이지 노출 되도록 기능 구현
- 이미지 파일 등록, 날짜 선택, 텍스트 등 input 기능 구현
- formData를 활용해 백엔드로 사용자 정보 데이터 전달
- 수정 페이지 로드 시 백엔드로부터 데이터 전달 받아 각 초기값으로 노출

### 3. 메인 페이지 (신미영)

- 로그인 시 사용자 정보를 fetch 받아 사용자 1 닉네임, 사용자 2 닉네임, 사귄 날짜(D-day) 노출
- react-calendar library를 사용하여 데이터 기록용 달력 노출
- kakao map API를 활용하여 장소 검색 및 날짜별 데이트 경로 표시
- 날짜별 데이트 기록 등록 시 시간 순서로 table 노출

### 4. 기록 등록 / 수정 모달 (신미영)

- 데이트 기록 등록 모달 컴포넌트 제작 후 등록, 수정 모달로 재사용
- 메인에서 선택한 날짜와 장소를 기반으로 시간, 비용, 카테고리, 사진, 글 내용 등록 input 기능 구현
- formData를 활용해 백엔드로 기록 데이터 전달
- 수정 페이지 로드 시 백엔드로부터 데이터 전달 받아 각 초기값으로 노출

### 5. 스토리 보기 모달 (신미영)
![story](https://user-images.githubusercontent.com/76767572/133456226-66ea720f-676b-4146-bf49-223c4f3cfc83.gif)


- 날짜별 기록 스토리 보기 버튼 클릭 시 모달 호출 기능 구현 
- 백엔드로 부터 기록 데이터 fetch 받아 이미지와 글 노출 

### 6. 기념일 등록 페이지 (신미영)
![anniversary](https://user-images.githubusercontent.com/76767572/133457866-e2ae725d-6b89-4954-aefb-175b5533f481.gif)


- 페이지 로드 시 백엔드로부터 사용자 정보 fetch 받아 사용자 다음 생일, n주년 노출 기능 구현
- 사용자가 등록한 기념일 데이터 백엔드로 전달하여 저장 후 table 노출 되도록 기능 구현
- 등록한 기념일 수정 및 삭제 기능 구현

### 7. 통계 페이지 (박준우)
![statistics](https://user-images.githubusercontent.com/76767572/133458630-6edde220-fdea-491a-b876-245af64714a9.gif)

- 통계 기능!
  
<br><br>

---

## 🛠 사용한 기술

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/> <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E"/>


<br>

## 🛠 사용한 툴

<img src="https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white"/> <img alt="Trello" src="https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white"/> <img alt="Git" src="https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white"/>
<img alt="GitHub" src="https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white"/>
<br>
<br>

## 👥 팀원

- 프론트 : [신미영](https://github.com/smy0102)
- 프론트 / 벡엔드 : [박준우](https://github.com/AutumnWithJay) 
  (백엔드 [깃허브](https://github.com/our-record/our-record-server))

<br>



## Reference

이 프로젝트는 리액트 학습 목적으로 만들었습니다.<br>
실무수준의 프로젝트이지만 학습용으로 만들었기 때문에 이 코드를 활용하여 이득을 취하거나 무단 배포할 경우 법적으로 문제될 수 있습니다.
