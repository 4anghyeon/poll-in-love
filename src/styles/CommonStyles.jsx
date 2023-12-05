import {css} from 'styled-components';

export const RowCenter = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ColumnCenter = css`
  ${() => RowCenter}
  flex-direction: column;
`;
