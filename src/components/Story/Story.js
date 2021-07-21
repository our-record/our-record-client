import React from 'react';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const Story = () => {
  return (
    <StoryWrap>
      <ContentsWrap>
        <CloseButton>닫기 X</CloseButton>
        <StoryImage alt="story" src="/images/story/story1.jpeg" />
        <StoryText>
          수내역에서 먹은 라멘!! 너무 맛있었다! 다음에 또 먹구싶당 ㅎㅎㅎㅎㅎ
        </StoryText>
      </ContentsWrap>
    </StoryWrap>
  );
};

const StoryWrap = styled.div`
  ${flexSet('row', 'center', 'center')}
  height: 100vh;
  background-color: rgba(120, 120, 120, 0.8);
`;

const ContentsWrap = styled.div`
  min-width: 200px;
  max-width: 400px;
`;

const CloseButton = styled.div`
  color: rgb(220, 220, 220);
  text-align: end;
  margin-bottom: 5px;
  cursor: pointer;
`;
const StoryImage = styled.img`
  min-width: 200px;
  max-width: 400px;
  margin-bottom: 10px;
`;

const StoryText = styled.div`
  color: white;
`;

export default Story;
