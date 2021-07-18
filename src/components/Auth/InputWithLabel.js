import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  & + & {
    margin-top: 1rem;
  }
`;

const Label = styled.div`
  font-size: 1rem;
  color: lightgray;
  margin-bottom: 0.25rem;
`;

const Input = styled.input`
  width: 100%;
  border: 1px solid black;
  outline: none;
  border-radius: 0px;
  line-height: 2.5rem;
  font-size: 1.2rem;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

const inputWithLabel = ({ label, ...rest }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Input {...rest} />
  </Wrapper>
);

export default inputWithLabel;
