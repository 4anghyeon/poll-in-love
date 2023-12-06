import styled, {css} from 'styled-components';
import theme from './theme';

export const RowCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ColumnCenter = css`
  ${RowCenter};
  flex-direction: column;
`;

export const Button = styled.button`
  display: flex;
  align-items: center;
  cursor: pointer;
  border: 1px solid lightgrey;
  border-radius: 5px;
  background: ${({$bgColor}) => $bgColor || theme.COLOR.purple};
  color: white;
  font-weight: bold;
  font-size: 1.1rem;
  padding: 10px;
  width: fit-content;
  ${props => {
    if (props.disabled) {
      return css`
        background-color: lightgrey;
        cursor: default;
      `;
    }
  }}
`;

export const Input = styled.input`
  width: 100%;
  padding: 20px;
  height: 60px;
  font-size: 1.1rem;
  border-radius: 10px;
  border: 1px solid ${() => theme.COLOR.lightPink};
`;
