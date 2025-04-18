'use server';

export async function submitFlag(_: unknown, formData: FormData) {
  try {
    const challengeId = formData.get('challengeId') as string;
    const flag = formData.get('flag') as string;

    //TODO: Implement submission logic
    console.log('Submitting flag:', { challengeId, flag });
    // revalidatePath(`/dashboard/challenges`);

    return { success: true };
  } catch (error) {
    console.error('Error submitting flag:', error);
    return { error: 'Something went wrong. Please try again.', success: false };
  }
}
