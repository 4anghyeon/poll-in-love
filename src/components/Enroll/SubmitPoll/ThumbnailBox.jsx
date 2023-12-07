import React, {useState} from 'react';
import styled from 'styled-components';
import {ColumnCenter} from '../../../styles/CommonStyles';
import theme from '../../../styles/theme';
import {toast} from 'react-toastify';
import {DEFAULT_IMAGE} from '../../../utils/defaultValue';
import TOAST_OPTION from '../../../utils/toast-option';

const MAX_FILE_SIZE = 1024 ** 2 * 5; // 5MB

const ThumbnailBox = ({setImgFile}) => {
  const [thumbnail, setThumbnail] = useState(DEFAULT_IMAGE);

  const onChangeUpload = e => {
    const file = e.target.files[0];
    setImgFile(e.target.files[0]);
    if (file.size > MAX_FILE_SIZE) {
      toast.error('파일 이미지는 5MB를 초과할 수 없습니다.', TOAST_OPTION.topCenter);
      return;
    }
    const imgUrl = URL.createObjectURL(e.target.files[0]);
    setThumbnail(imgUrl);
  };

  return (
    <StThumbnailContainer>
      <h1>썸네일을 업로드 하세요</h1>
      <figure>
        <img src={thumbnail} alt="thumbnail" />
        <label>
          <input type="file" onChange={onChangeUpload} accept="image/*" />
          <span>썸네일 업로드</span>
        </label>
      </figure>
    </StThumbnailContainer>
  );
};

export default ThumbnailBox;

const StThumbnailContainer = styled.div`
  ${() => ColumnCenter};
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
  & h1 {
    margin: 20px 0 20px 0;
    font-size: ${theme.FONT_SIZE.xl};
    width: 100%;
  }

  & input {
    display: none;
  }

  & figure {
    width: 100%;
    height: 100%;
    max-width: 500px;
    padding-right: 5rem;
    ${ColumnCenter}
  }

  & img {
    border: 1px solid ${theme.COLOR.pink};
    border-radius: 10px 10px 0 0;
    width: 100%;
  }

  & label {
    width: 100%;
    text-align: center;
    background: ${theme.COLOR.purple};
    color: white;
    font-size: ${theme.FONT_SIZE.base};
    font-weight: bold;
    cursor: pointer;
    padding: 10px;
    border-radius: 0 0 10px 10px;
  }

  @media screen and (max-width: 768px) {
    & {
    }
    figure {
      width: 100%;
      align-items: center;
      padding-right: 0;
    }
  }
`;
