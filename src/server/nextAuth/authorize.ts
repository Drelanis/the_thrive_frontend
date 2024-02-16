import { SignUpDto } from '@configs';
import { signInValidationSchema } from '@modules/stores';
import { getUserByEmail } from '@server/actions/user';
import bcrypt from 'bcryptjs';

export const authorize = async (credentials: SignUpDto | null) => {
  try {
    if (!credentials) {
      return null;
    }

    const { email, password } = credentials;

    await signInValidationSchema.validate({
      email,
      password,
    });

    const user = await getUserByEmail(email);

    if (!user || !user?.password) {
      return null;
    }

    const passwordsMatch = await bcrypt.compare(password, user.password);

    if (!passwordsMatch) {
      return null;
    }

    return user;
  } catch (error) {
    return null;
  }
};
