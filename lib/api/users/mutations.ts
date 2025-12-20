import { getAuthenticatedAxios } from '../axios';

export type UserActionType = 'ban' | 'unban';

export interface UserActionPayload {
  userIds: number[];
  action: UserActionType;
}

export const modifyUserStatus = async (
  payload: UserActionPayload
): Promise<void> => {
  const { userIds, action } = payload;

  await Promise.all(
    userIds.map(async (userId) => {
      try {
        const axios = await getAuthenticatedAxios();
        await axios.post(`/admin/users/${action}/${userId.toString()}`);
      } catch (err) {
        console.error(`Error ${action}ing user ${userId}:`, err);
        throw err;
      }
    })
  );
};

export const userStatusMutation = () => {
  return {
    mutationFn: modifyUserStatus,
  };
};
