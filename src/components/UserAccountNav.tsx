'use client';

import Link from 'next/link';

import { User } from '@/payload-types';

import { useAuth } from '@/hooks/useAuth';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

const UserAccountNav = ({ user }: { user: User }) => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className='overflow-visible'
        asChild
      >
        <Button
          variant='ghost'
          size='sm'
          className='relative'
        >
          My Account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className='w-60 bg-white'
        align='end'
      >
        <div className='flex items-center justify-start gap-2 p-2'>
          <div className='flex flex-col space-y-0.5 leading-none'>
            <p className='text-sm font-medium text-black'>{user.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className='cursor-pointer'
          asChild
        >
          <Link href='/sell'>Seller Dashboard</Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={signOut}
          className='cursor-pointer'
        >
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
