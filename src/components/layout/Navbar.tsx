import { cookies } from 'next/headers';
import Link from 'next/link';

import { getServerSideUser } from '@/lib/payload-utils';

import { Icons } from '../Icons';
import MaxWidthWrapper from '../MaxWidthWrapper';
import Cart from '../cart/Cart';
import { buttonVariants } from '../ui/button';
import MobileNav from './MobileNav';
import NavItems from './NavItems';
import UserAccountNav from './UserAccountNav';

const NavBar = async () => {
  const nextCookies = cookies();
  const { user } = await getServerSideUser(nextCookies);

  return (
    <div className='sticky inset-x-0 top-0 z-50 h-16 bg-white'>
      <header className='relative bg-white'>
        <MaxWidthWrapper>
          <div className='border-b border-gray-200'>
            <div className='flex h-16 items-center'>
              <MobileNav />

              <div className='ml-4 flex lg:ml-0'>
                <Link href='/'>
                  <Icons.logo className='h-10 w-10' />
                </Link>
              </div>

              <div className='z-50 hidden lg:ml-8 lg:block lg:self-stretch'>
                <NavItems />
              </div>

              <div className='ml-auto flex items-center'>
                <div className='hidden lg:flex lg:items-center lg:justify-end lg:space-x-6'>
                  {!user && (
                    <Link
                      href='/sign-in'
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      Sign in
                    </Link>
                  )}

                  {!user && (
                    <span
                      className='h-6 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                  )}

                  {user ? (
                    <UserAccountNav user={user} />
                  ) : (
                    <Link
                      href='sign-up'
                      className={buttonVariants({ variant: 'ghost' })}
                    >
                      Create account
                    </Link>
                  )}

                  {user && (
                    <span
                      className='h-6 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                  )}

                  {!user && (
                    <div className='flex lg:ml-6'>
                      <span
                        className='h-6 w-px bg-gray-200'
                        aria-hidden='true'
                      />
                    </div>
                  )}

                  <div className='ml-4 flow-root lg:ml-6'>
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
};

export default NavBar;
