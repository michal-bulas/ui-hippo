'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Check, Loader2, X } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '../../components/ui/button';
import { PRODUCT_CATEGORIES } from '../../config';
import { useCart } from '../../hooks/useCart';
import { cn, formatPrice } from '../../lib/utils';
import { trpc } from '../../trpc/client';

const CartPage = () => {
  const { items, removeItem } = useCart();
  const router = useRouter();

  const { mutate: createCheckoutSession, isLoading } =
    trpc.payment.createSession.useMutation({
      onSuccess: ({ url }) => {
        if (url) router.push(url);
      }
    });

  const productIds = items.map(({ product }) => product.id);

  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  );

  const fee = 1;
  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Shopping Cart
        </h1>

        <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
          <div
            className={cn(
              'lg:col-span-7',
              isMounted &&
                items.length === 0 &&
                'rounded-lg border-2 border-dashed border-zinc-200 p-12'
            )}
          >
            <h2 className='sr-only'>Items in your shopping cart</h2>

            {isMounted && items.length === 0 && (
              <div className='flex h-full flex-col items-center justify-center space-y-1'>
                <div
                  aria-hidden='true'
                  className='relative mb-4 h-40 w-40 text-muted-foreground'
                >
                  <Image
                    alt='Empty shopping cart image'
                    src='/hippo-empty-cart.png'
                    fill
                    loading='eager'
                  />
                </div>
                <h3 className='text-2xl font-semibold'>Your cart is empty</h3>
                <p className='text-center text-muted-foreground'>
                  Whoops! Nothing to show here yet.
                </p>
              </div>
            )}

            <ul
              className={cn(
                isMounted &&
                  items.length > 0 &&
                  'divide-y divide-gray-200 border-b border-t border-gray-200'
              )}
            >
              {isMounted &&
                items.map(({ product }) => {
                  const label = PRODUCT_CATEGORIES.find(
                    (c) => c.value === product.category
                  )?.label;
                  const { image } = product.images[0];

                  return (
                    <li
                      key={product.id}
                      className='flex py-6 sm:py-10'
                    >
                      <div className='flex-shrink-0'>
                        <div className='relative h-24 w-24'>
                          {typeof image !== 'string' && image.url && (
                            <Image
                              alt='Product image'
                              src={image.url}
                              fill
                              className='sm:h48 h-full w-full rounded-md object-cover object-center sm:w-48'
                            />
                          )}
                        </div>
                      </div>
                      <div className='ml-4 flex-1 flex-col justify-between sm:ml-6'>
                        <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                          <div>
                            <div className='flex justify-between'>
                              <h3 className='text-sm'>
                                <Link
                                  href={`/product/${product.id}`}
                                  className='font-medium text-gray-700 hover:text-gray-800'
                                >
                                  {product.name}
                                </Link>
                              </h3>
                            </div>

                            <div className='mt-1 flex text-sm'>
                              <p className='text-muted-foreground'>
                                Category: {label}
                              </p>
                            </div>

                            <p className='mt-1 text-sm font-medium text-gray-900'>
                              {formatPrice(product.price)}
                            </p>
                          </div>
                          <div className='mt-4 w-20 sm:mt-0 sm:pr-9'>
                            <div className='absolute right-0 top-0'>
                              <Button
                                aria-label='remove product'
                                variant='ghost'
                                onClick={() => removeItem(product.id)}
                              >
                                <X
                                  aria-hidden='true'
                                  className='h-5 w-5'
                                />
                              </Button>
                            </div>
                          </div>
                        </div>

                        <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
                          <Check className='h-5 w-5 flex-shrink-0 text-green-500' />
                          <span>Eligible for instant delivery</span>
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>

          <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900'>Order summary</h2>
            <div className='mt-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-600'>Subtotal</p>
                <p className='text-sm font-medium text-gray-900'>
                  {isMounted ? (
                    formatPrice(cartTotal)
                  ) : (
                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                  )}
                </p>
              </div>

              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <p className='flex items-center justify-between text-sm text-muted-foreground'>
                  Flat Transaction Fee
                </p>
                <p className='text-sm font-medium text-gray-900'>
                  {isMounted ? (
                    formatPrice(fee)
                  ) : (
                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                  )}
                </p>
              </div>

              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <p className='text-base font-medium text-gray-900'>
                  Order Total
                </p>
                <p className='text-base font-medium text-gray-900'>
                  {isMounted ? (
                    formatPrice(cartTotal + fee)
                  ) : (
                    <Loader2 className='h-4 w-4 animate-spin text-muted-foreground' />
                  )}
                </p>
              </div>
            </div>

            <div className='mt-6'>
              <Button
                size='lg'
                className='w-full'
                disabled={items.length === 0 || isLoading}
                onClick={() => {
                  createCheckoutSession({ productIds });
                }}
              >
                {isLoading && (
                  <Loader2 className='mr-1.5 h-4 w-4 animate-spin' />
                )}
                Checkout
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
