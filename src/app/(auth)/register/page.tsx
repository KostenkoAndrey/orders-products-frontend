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
  const { loading, isAnyLoading, onSubmit, onGoogleSubmit } =
    useAuth('register');
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
        title={'Sign Up'}
        subtitle={'Already have an account?'}
        fields={
          <>
            <InputText
              label={'name'}
              type={'text'}
              isRequired={true}
              register={register('name', {
                required: 'Name is required',
                minLength: { value: 3, message: 'Minimum 3 characters' },
                maxLength: { value: 30, message: 'Maximum 30 characters' },
              })}
              error={errors.name?.message}
            />
            <InputText
              label={'email'}
              type={'email'}
              isRequired={true}
              register={register('email', {
                required: 'Email is required',
                minLength: { value: 6, message: 'Minimum 6 characters' },
                maxLength: { value: 30, message: 'Maximum 30 characters' },
              })}
              error={errors.email?.message}
            />
            <InputPassword
              label={'password'}
              isRequired={true}
              register={register('password', {
                required: 'Password is required',
                minLength: { value: 8, message: 'Minimum 8 characters' },
                maxLength: { value: 30, message: 'Maximum 30 characters' },
              })}
              error={errors.password?.message}
            />
          </>
        }
        button={
          <AuthButton
            type='submit'
            disabled={isAnyLoading}
            className='text-white hover:text-black hover:bg-[#007bff]'
          >
            {loading.auth ? 'Signing up...' : 'Sign up'}
          </AuthButton>
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
        linkText={'Log in'}
        href={'/login'}
      />
    </form>
  );
};

export default Page;
