'use client';

import React from 'react';
import { useForm } from 'react-hook-form';

import AuthForm from '@/components/auth-form';
import InputText from '@/components/input-text';
import InputPassword from '@/components/input-password';
import AuthButton from '@/components/auth-button';
import AuthGoogleButton from '@/components/auth-google-button';
import useAuth from '@/hooks/useAuth';
import { AuthRequest } from '@/api/api-auth';

const Page = () => {
  const { loading, isAnyLoading, onSubmit, onGoogleSubmit } = useAuth('login');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRequest>({
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='max-w-[384px] w-full'>
      <AuthForm
        title={'Log in'}
        subtitle={'Don’t have an account?'}
        fields={
          <>
            <InputText
              label={'email'}
              type={'email'}
              isRequired={true}
              register={register('email', {
                required: 'Email is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
                maxLength: { value: 30, message: 'Maximum 30 characters' },
              })}
              error={errors.email?.message as string}
            />
            <InputPassword
              label={'password'}
              isRequired={true}
              register={register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Minimum 8 characters' },
                maxLength: { value: 30, message: 'Maximum 30 characters' },
              })}
              error={errors.password?.message as string}
            />
          </>
        }
        button={
          <>
            <AuthButton
              type={'submit'}
              disabled={isAnyLoading}
              className={'text-white hover:text-black hover:bg-[#007bff]'}
            >
              {loading.auth ? 'Logging in...' : 'Log in'}
            </AuthButton>
          </>
        }
        google={
          <AuthGoogleButton
            onClick={onGoogleSubmit}
            disabled={isAnyLoading}
            label={
              loading.google
                ? 'Continuing with Google...'
                : 'Log in with Google'
            }
          />
        }
        linkText={'Create an account'}
        href={'/register'}
      />
    </form>
  );
};

export default Page;
