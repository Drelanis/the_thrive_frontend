import { Routes } from '@configs';
import { AuthTitle } from '@ui';

export const SignUp = () => {
  return (
    <>
      <AuthTitle
        header="Create account"
        subHeader="Already have an account?"
        link={Routes.SING_IN}
        linkText="Login"
      />
      <div>hello</div>
    </>
  );
};
