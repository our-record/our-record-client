import { css } from 'styled-components';

export const flexSet = (
  direction = 'row',
  justify = 'flex-start',
  align = 'flex-start'
) => css`
  display: flex;
  flex-direction: ${direction};
  justify-content: ${justify};
  align-items: ${align};
`;

export const buttonSet = (fontSize = '12px') => css`
  border: 1px solid rgb(220, 220, 220);
  border-radius: 3px;
  color: ${props => props.theme.basicDarkGray};
  background-color: white;
  font-size: ${fontSize};
  box-shadow: 1px 1px rgb(200, 200, 200);
  cursor: pointer;
`;

export const tableSet = (width = '100%') => css`
  width: ${width};
  margin-top: 30px;
  border-right: hidden;
  border-left: hidden;
  font-size: 12px;
`;

export const tableHeadSet = () => css`
  padding: 7px 0;
  color: ${props => props.theme.basicDarkGray};
  background-color: ${props => props.theme.keyColor};
`;

export const tableDataSet = () => css`
  padding: 3px 0;
  border: ${props => props.theme.basicBorder};
  color: ${props => props.theme.basicGray};
  text-align: center;
  vertical-align: middle;
`;

export const bottomTableDataSet = () => css`
  padding: 7px 0;
  border: ${props => props.theme.basicBorder};
  color: ${props => props.theme.basicGray};
  text-align: center;
  vertical-align: middle;
`;

export const textInputSet = (height = '18px') => css`
  height: ${height};
  border: ${props => props.theme.basicBorder};
  color: ${props => props.theme.basicDarkGray};

  &:focus {
    border: 1px solid ${props => props.theme.keyColor};
    outline: none;
  }

  ::placeholder {
    color: ${props => props.theme.basicGray};
  }
`;

export const dateInputSet = (height = '18px') => css`
  height: ${height};
  appearance: none;
  border: ${props => props.theme.basicBorder};
  color: ${props => props.theme.basicDarkGray};

  &:focus {
    border: 1px solid ${props => props.theme.keyColor};
    outline: none;
  }

  ::-webkit-calendar-picker-indicator {
    filter: invert(0.5);
  }
`;
