import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

async function mockLogin(username: string, password: string) {
  const mockValidCredentials = {
    username: 'admin',
    password: 'password123',
  };

  if (
    username === mockValidCredentials.username &&
    password === mockValidCredentials.password
  ) {
    return { success: true, message: 'Login successful!' };
  } else {
    return { success: false, message: 'Invalid username or password' };
  }
}

export async function loginAction(_: any, formData: FormData) {
  const values = Object.fromEntries(formData.entries());
  const parsed = loginSchema.safeParse(values);

  if (!parsed.success) {
    return { errors: parsed.error.flatten().fieldErrors };
  }

  const { username, password } = values;
  const result = await mockLogin(username as string, password as string);

  if (!result.success) {
    return { errors: { general: [result.message] } };
  }

  return { success: true, message: result.message };
}
