import {useMutation} from '@tanstack/react-query';
import {updateUserPoint} from '../api/users';

export const useUpdatePoint = (userId, amount, onSuccess) => {
  const {mutate} = useMutation({
    mutationFn: () => {
      return updateUserPoint(userId, amount);
    },
    onSuccess: () => {
      if (onSuccess) onSuccess();
    },
  });

  return {updatePoint: mutate};
};

export default useUpdatePoint;
