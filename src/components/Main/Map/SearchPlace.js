import React, { useState } from 'react';
import MapContainer from './MapContainer';
import styled from 'styled-components';
import { textInputSet, buttonSet } from '../../../styles/mixin';

const SearchPlace = ({
  setPlaceName,
  setLong,
  setLat,
  convertedDate,
  recordMarkers,
}) => {
  const [inputText, setInputText] = useState('');
  const [place, setPlace] = useState('');

  const handleInput = event => {
    const { value } = event.target;
    setInputText(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    setPlace(inputText);
    setInputText('');
  };

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <InputLabel htmlFor="searchInput">장소검색</InputLabel>
        <SearchInput
          id="searchInput"
          placeholder="장소를 입력해 주세요."
          onChange={handleInput}
          value={inputText}
        />
        <SearchButton type="submit">검색</SearchButton>
      </form>
      <MapContainer
        searchPlace={place}
        setPlaceName={setPlaceName}
        setLong={setLong}
        setLat={setLat}
        convertedDate={convertedDate}
        recordMarkers={recordMarkers}
      />
    </>
  );
};

const InputLabel = styled.label`
  margin-right: 15px;
  color: ${props => props.theme.basicDarkGray};
  font-size: 14px;
  vertical-align: middle;
`;

const SearchInput = styled.input`
  width: 150px;
  margin: 0 10px 10px 0;
  ${textInputSet}
`;

const SearchButton = styled.button`
  ${buttonSet}
`;

export default SearchPlace;
