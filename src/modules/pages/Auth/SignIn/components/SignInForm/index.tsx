import { AuthFormContainer } from '@common';
import { Routes, SigninDto } from '@configs';
import { LoadingButton } from '@mui/lab';
import { Control, UseFormSetValue } from 'react-hook-form';

import { Form } from './Form';
import { StyledLink } from './styles';

type Props = {
  control: Control<SigninDto>;
  isPending: boolean;
  isTwoFactor: boolean;
  isValid: boolean;
  onSubmit: () => void;
  setValue: UseFormSetValue<SigninDto>;
};

export const SignInForm = (props: Props) => {
  const { control, isValid, onSubmit, isPending, isTwoFactor, setValue } =
    props;

  const buttonTitle = isTwoFactor ? 'CONFIRM' : 'SIGN IN';

  return (
    <AuthFormContainer>
      <Form
        control={control}
        isTwoFactorForm={isTwoFactor}
        setValue={setValue}
      />
      <LoadingButton
        onClick={onSubmit}
        loading={isPending}
        disabled={!isValid || isPending}
        variant="contained"
        type="submit"
        fullWidth
      >
        {buttonTitle}
      </LoadingButton>
      <StyledLink underline="none" href={Routes.SING_UP}>
        Forgot Password?
      </StyledLink>
    </AuthFormContainer>
  );
};
