import {useDispatch} from 'react-redux';
import {changeAdditionalInfo} from '../redux/modules/enrollSlice';

export const useChangeAdditionalInfo = attr => {
  const dispatch = useDispatch();

  const onChange = e => {
    dispatch(changeAdditionalInfo({attr, value: +e.target.value}));
  };

  return onChange;
};
