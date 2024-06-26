'use client';

import Image from 'next/image';
import Link from 'next/link';

import { PRODUCT_CATEGORIES } from '@/config';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from '../ui/button';

type Category = (typeof PRODUCT_CATEGORIES)[number];

interface NavItemProps {
  category: Category;
  handleOpen: () => void;
  isOpen: boolean;
  isAnyOpen: boolean;
}
const NavItem = ({ category, handleOpen, isOpen, isAnyOpen }: NavItemProps) => {
  return (
    <div className='flex'>
      <div className='relative flex items-center'>
        <Button
          className='gap-1.5'
          onClick={handleOpen}
          variant={isOpen ? 'secondary' : 'ghost'}
        >
          {category.label}
          <ChevronDown
            className={cn(
              'h-4 w-4 text-muted-foreground transition-all',
              isOpen && '-rotate-180'
            )}
          />
        </Button>
      </div>
      {isOpen && (
        <div
          className={cn(
            'absolute inset-x-0 top-full text-sm text-muted-foreground',
            !isAnyOpen && 'animate-in fade-in-10 slide-in-from-top-5'
          )}
        >
          <div
            className='absolute inset-0 top-1/2 bg-white shadow'
            aria-hidden='true'
          />
          <div className='relative bg-white'>
            <div className='mx-auto max-w-7xl px-8'>
              <div className='grid grid-cols-4 gap-x-8 gap-y-10 py-16'>
                <div className='col-span-4 col-start-1 grid grid-cols-3 gap-x-8'>
                  {category.featured.map((item) => (
                    <div
                      key={item.name}
                      className='group relative text-base sm:text-sm'
                    >
                      <div className='relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                        <Image
                          alt='Product category image'
                          src={item.imageSrc}
                          fill
                          className='object-cover object-center'
                        />
                      </div>
                      <Link
                        href={item.href}
                        className='mt-6 block font-medium text-gray-900'
                      >
                        {item.name}
                      </Link>
                      <p
                        className='mt-1'
                        aria-hidden='true'
                      >
                        Shop now
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItem;
