'use client';

import Image from 'next/image';
import Link from 'next/link';

import { trpc } from '@/trpc/client';
import { Loader2, XCircle } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';

interface VerifyEmailProps {
  token: string;
}

const VerifyEmail = ({ token }: VerifyEmailProps) => {
  const { data, isLoading, isError } = trpc.auth.verifyEmail.useQuery({
    token
  });

  if (isLoading) {
    return (
      <div className='flex flex-col items-center gap-2 text-center'>
        <Loader2 className='h-8 w-8 animate-spin text-zinc-300' />
        <h3 className='text-xl font-semibold'>Verifying...</h3>
        <p className='text-sm text-muted-foreground'>
          This won&apos;t take long.
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className='flex flex-col items-center gap-2 text-center'>
        <XCircle className='h-8 w-8 text-red-600' />
        <h3 className='text-xl font-semibold'>There was a problem</h3>
        <p className='text-sm text-muted-foreground'>
          Token is not valid or might be expired. <br /> Please try again.
        </p>
      </div>
    );
  }

  if (data?.success) {
    return (
      <div className='flex h-full flex-col items-center justify-center'>
        <div className='relative mb-4 h-60 w-60 text-muted-foreground'>
          <Image
            alt='The email was sent'
            src='/hippo-sent-email.png'
            fill
          />
        </div>
        <h3 className='text-2xl font-semibold'>You&apos;re all set!</h3>
        <p className='mt-1 text-center text-muted-foreground'>
          Than you for verifying your email.
        </p>
        <Link
          href='/sign-in'
          className={buttonVariants({ className: 'mt-4' })}
        >
          Sign in
        </Link>
      </div>
    );
  }
};

export default VerifyEmail;
