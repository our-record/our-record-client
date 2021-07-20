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

export const buttonSet = (font = '12px') => css`
  border: 1px solid rgb(220, 220, 220);
  border-radius: 3px;
  color: rgb(120, 120, 120);
  background-color: white;
  font-size: ${font};
  box-shadow: 1px 1px rgb(200, 200, 200);
  cursor: pointer;
`;
