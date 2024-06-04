'use client';

import { useEffect, useState } from 'react';

import { useCart } from '../hooks/useCart';
import { Product } from '../payload-types';
import { Button } from './ui/button';

const AddToCartButton = ({ product }: { product: Product }) => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const { addItem } = useCart();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isSuccess]);

  return (
    <Button
      onClick={() => {
        setIsSuccess(true);
        addItem(product);
      }}
      size='lg'
      className='w-full'
    >
      {isSuccess ? 'Added!' : 'Add to Cart'}
    </Button>
  );
};

export default AddToCartButton;
