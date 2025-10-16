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

    const res = await axios.post('api/submit/challenge', {
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
