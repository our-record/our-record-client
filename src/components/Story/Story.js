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
            <StoryImage alt="story" src={`${storyData.datePhoto}`} />
            <StoryText>{storyData.story}</StoryText>
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
  background-color: rgba(120, 120, 120, 0.5);
  z-index: 999;
`;

const ContentsWrap = styled.div`
  min-width: 150px;
  max-width: 300px;
`;

const CloseButton = styled.div`
  color: rgb(220, 220, 220);
  text-align: end;
  margin-bottom: 5px;
  cursor: pointer;
`;
const StoryImage = styled.img`
  min-width: 150px;
  max-width: 300px;
  margin-bottom: 10px;
`;

const StoryText = styled.div`
  color: white;
`;

export default Story;
