import {useDispatch} from 'react-redux';
import {changeAdditionalInfo} from '../redux/modules/enrollSlice';

export const useChangeAdditionalInfo = attr => {
  const dispatch = useDispatch();

  return value => {
    dispatch(changeAdditionalInfo({attr, value: value}));
  };
};
