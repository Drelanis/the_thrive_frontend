import { SignInPage } from '@modules';
import { AuthContainer } from 'src/packages/common';

const SignIn = () => {
  return (
    <AuthContainer>
      <SignInPage />
    </AuthContainer>
  );
};

export default SignIn;
