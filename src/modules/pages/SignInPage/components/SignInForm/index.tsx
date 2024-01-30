import { Button } from '@mui/material';
import { Input, InputType } from '@ui';
import { FormEvent } from 'react';
import { useForm } from 'react-hook-form';

import { FormContainer } from './styles';

export const SignInForm = () => {
  const { control } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <FormContainer onSubmit={onSubmit}>
      <Input required fullWidth control={control} name="email" label="Email" />
      <Input
        required
        fullWidth
        control={control}
        label="Password"
        name="password"
        type={InputType.PASSWORD}
      />
      <Button variant="contained" type="submit" fullWidth>
        SIGN IN
      </Button>
    </FormContainer>
  );
};
