import axios from 'axios';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import InputWithLabel from '../../components/Auth/InputWithLabel';
import { flexSet } from '../../styles/mixin';

const TestForm = () => {
  const [data, setData] = useState([]);
  const history = useHistory();

  const handleSubmit = e => {
    e.preventDefault();

    const formData = new FormData();

    Object.entries(data).forEach(([k, v]) => formData.append(k, v));

    console.log(data, formData);
    // console.log(data, formData);
    axios({
      method: 'post',
      url: 'http://localhost:5000/register/save',
      data: data,
    }).then(res => console.log(res.status));
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const goBack = () => {
    history.goBack();
  };

  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        <InputWithLabel type="date" label="사귄날짜" name="c_day" />
        <InputWithLabel type="date" label="여자친구 생년월일" name="f_birth" />
        <InputWithLabel type="date" label="남자친구 생년월일" name="m_birth" />
        <section>
          <input type="submit" value="가입" />
          <input type="submit" value="취소" onClick={goBack} />
        </section>
      </Form>
    </FormWrapper>
  );
};

const FormWrapper = styled.section`
  height: 100vh;
  ${flexSet('row', 'center')}
`;

const Form = styled.form`
  width: 50%;
  ${flexSet('column', 'center', 'center')}
`;

export default TestForm;
