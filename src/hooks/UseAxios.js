import axios from 'axios';
import { useEffect, useState } from 'react';

const useAxios = (url, method, headers = null, body = null, data = null) => {
  const [state, setState] = useState({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    axios({
      method,
      url,
      headers,
      body,
      data,
    })
      .then(res =>
        setState({
          loading: false,
          data: res.data,
          error: null,
        })
      )
      .catch(err => {
        setState({
          loading: false,
          error: err,
          ...state,
        });
      });
  }, []);

  return { ...state };
};

export default useAxios;
