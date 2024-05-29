'use client';

import Link from 'next/link';

import { Product } from '../payload-types';
import { trpc } from '../trpc/client';
import { TQueryValidator } from '../validation-schemas/QueryValidator';
import ProductListing from './ProductListing';

interface ProductReelProps {
  title: string;
  subtitle?: string;
  href?: string;
  query: TQueryValidator;
}

const FALLBACK_LIMIT = 4;

const ProductReel = (props: ProductReelProps) => {
  const { title, subtitle, href, query } = props;

  const { data: queryResults, isLoading } =
    trpc.getInfiniteProducts.useInfiniteQuery(
      {
        limit: query.limit ?? FALLBACK_LIMIT,
        query
      },
      { getNextPageParam: (lastPage) => lastPage.nextPage }
    );

  const products = queryResults?.pages.flatMap((page) => page.items);

  let map: (Product | null)[] = [];

  if (products && products.length) {
    map = products;
  } else if (isLoading) {
    map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
  }

  return (
    <section className='py-12'>
      <div className='mb-4 md:flex md:items-center md:justify-between'>
        <div className='max-w-2xl px-4 lg:max-w-4xl lg:px-0'>
          {title && (
            <h1 className='text2xl font-bold text-gray-900 sm:text-3xl'>
              {props.title}
            </h1>
          )}
          {subtitle && (
            <p className='text2xl font-bold text-gray-900 sm:text-3xl'>
              {props.subtitle}
            </p>
          )}
        </div>

        {href && (
          <Link
            href={href}
            className='hidden text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline md:block'
          >
            Shop the collection <span aria-hidden='true'>&rarr;</span>
          </Link>
        )}
      </div>

      <div className='relative'>
        <div className='mt-6 flex w-full items-center'>
          <div className='grid w-full grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4   md:gap-y-10 lg:gap-x-8'>
            {map.map((product, index) => (
              <ProductListing
                product={product}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductReel;
