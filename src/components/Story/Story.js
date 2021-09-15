import React from 'react';
import styled from 'styled-components';
import { flexSet } from '../../styles/mixin';

const Story = props => {
  const { isOpen, storyData, closeStory } = props;

  return (
    <div>
      {isOpen ? (
        <StoryWrap>
          <ContentsWrap>
            <CloseButton onClick={closeStory}>닫기 X</CloseButton>
            <StoryImage alt="story" src={`${storyData[0].datePhoto}`} />
            <StoryText>{storyData[0].story}</StoryText>
          </ContentsWrap>
        </StoryWrap>
      ) : null}
    </div>
  );
};

const StoryWrap = styled.div`
  ${flexSet('row', 'center', 'center')}
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100vh;
  background-color: rgba(120, 120, 120, 0.8);
  z-index: 999;
`;

const ContentsWrap = styled.div`
  min-width: 300px;
  max-width: 500px;
`;

const CloseButton = styled.div`
  color: rgb(220, 220, 220);
  text-align: end;
  margin-bottom: 5px;
  cursor: pointer;
`;
const StoryImage = styled.img`
  min-width: 300px;
  max-width: 500px;
  margin-bottom: 10px;
`;

const StoryText = styled.div`
  color: white;
  font-size: 1.5em;
`;

export default Story;
