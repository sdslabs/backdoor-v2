'use server';

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
    console.log('submit response: ', res);
    // revalidatePath(`/dashboard/challenges`);
    return { success: true };
  } catch (error) {
    console.error('Error submitting flag:', error);
    return { error: 'Something went wrong. Please try again.', success: false };
  }
}
