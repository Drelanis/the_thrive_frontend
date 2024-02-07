import { AuthTitle } from '@common';
import { Routes } from '@configs';

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
