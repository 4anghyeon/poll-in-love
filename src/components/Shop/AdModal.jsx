import React, {useEffect, useRef, useState} from 'react';
import YouTube from 'react-youtube';
import styled from 'styled-components';
import theme from '../../styles/theme';
import {toast} from 'react-toastify';
import TOAST_OPTION from '../../utils/toast-option';
import useUpdatePoint from '../../hooks/useUpdatePoint';
import {queryClient} from '../../App';
import {useQuery} from '@tanstack/react-query';
import {getRandomPlayListItem} from '../../api/youtube';
import {BarLoader} from 'react-spinners';

const SECONDS_FOR_POINT = 10;
const REWARD_POINT = 15;

const AdModal = ({user}) => {
  const [remainTimes, setRemainTimes] = useState(10);
  const intervalRef = useRef(null);

  const {isPending, data: videoId} = useQuery({
    queryKey: ['randomPlayListItem'],
    queryFn: getRandomPlayListItem,
  });

  console.log(videoId);

  const {updatePoint} = useUpdatePoint(
    user.id,
    REWARD_POINT,
    queryClient.invalidateQueries({
      queryKey: ['user'],
    }),
  );

  const onPlay = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setRemainTimes(prev => {
          if (prev === 0) {
            toast.success(`${REWARD_POINT} 포인트를 획득하셨습니다!`, TOAST_OPTION.topCenter);
            clearInterval(intervalRef.current);
            updatePoint();
            return 0;
          }
          return --prev;
        });
      }, 1000);
    }
  };

  const onPause = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  const opts = {
    height: '390',
    width: '640',
    playerVars: {
      rel: 0,
      autoplay: 1,
      mute: 1,
      modestbranding: 1,
    },
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <StAdModalContainer>
      {isPending ? (
        <BarLoader color={theme.COLOR.pink} height={10} width={300} />
      ) : (
        <>
          <h1>광고를 {SECONDS_FOR_POINT}초 이상 보고 포인트를 획득해보세요!</h1>
          {videoId && <YouTube videoId={videoId} opts={opts} onPlay={onPlay} onPause={onPause}></YouTube>}
          {remainTimes > 0 ? (
            <p>포인트 획득까지 {remainTimes}초 남았습니다.</p>
          ) : (
            <p>{REWARD_POINT}포인트를 획득하셨습니다.</p>
          )}
        </>
      )}
    </StAdModalContainer>
  );
};

export default AdModal;

const StAdModalContainer = styled.div`
  h1 {
    font-size: ${theme.FONT_SIZE.xl};
    margin-bottom: 10px;
  }

  p {
    font-size: ${theme.FONT_SIZE.lg};
    margin-top: 10px;
  }
`;
