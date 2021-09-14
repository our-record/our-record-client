import React from 'react';
import styled from 'styled-components';
import { fadeIn, flexSet } from '../../styles/mixin';

const Loading = () => {
  return (
    <LoadingContainer>
      <Image src="/icon/heart.png" />
      <Head>Loading...</Head>
    </LoadingContainer>
  );
};

const LoadingContainer = styled.div`
  ${flexSet('column', 'center', 'center')}
  height: 100vh;
  vertical-align: middle;
`;

const Image = styled.img`
  width: 30px;
`;

const Head = styled.h1`
  margin-top: 10px;
  animation: ${fadeIn} 1s 0.5s infinite linear alternate;
`;

export default Loading;
