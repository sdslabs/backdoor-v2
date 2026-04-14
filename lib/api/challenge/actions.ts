'use server';

import { revalidatePath } from 'next/cache';
import { getAuthenticatedAxios } from '../axios';

export async function submitFlag(_: unknown, formData: FormData) {
  try {
    const challengeId = formData.get('challengeId') as string;
    const flag = formData.get('flag') as string;

    //TODO: Implement submission logic
    console.log('Submitting flag:', { challengeId, flag });
    const axios = await getAuthenticatedAxios();
    axios.defaults.headers['Content-Type'] = 'multipart/form-data';

    const res = await axios.post('/submit/challenge', {
      chall_id: challengeId,
      flag,
    });
    const {
      message,
      success,
    }: {
      message: string;
      success: boolean;
    } = res.data;
    console.log('submit response: ', res);
    revalidatePath(`/dashboard/challenges`);
    return { message, success };
  } catch (error) {
    console.error('Error submitting flag:', error);
    return { error: 'Something went wrong. Please try again.', success: false };
  }
}

export async function getHintDetails(hintId: number) {
  try {
    const axios = await getAuthenticatedAxios();

    const res = await axios.get(`/info/hint/${hintId}`);
    const data = res.data;

    return { success: true, data };
  } catch (error: any) {
    console.error('Error redeeming hint:', error);

    const errorMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      'Failed to redeem hint. Please try again.';

    return {
      success: false,
      error: errorMessage,
    };
  }
}

export async function redeemHint(hintId: number) {
  try {
    const axios = await getAuthenticatedAxios();

    const res = await axios.post(`/info/hint/${hintId}`);
    const data = res.data;

    revalidatePath('/dashboard/challenges');
    return { success: true, data };
  } catch (error: any) {
    console.error('Error redeeming hint:', error);

    const rawMessage =
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      'Failed to redeem hint. Please try again.';

    const errorMessage = String(rawMessage).includes('DATABASE ERROR')
      ? 'You do not have enough points to redeem this hint.'
      : rawMessage;

    return {
      success: false,
      error: errorMessage,
    };
  }
}
