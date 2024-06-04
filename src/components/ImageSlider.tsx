'use client';

import Image from 'next/image';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import type SwiperType from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { cn } from '../lib/utils';

interface ImageSliderProps {
  urls: string[];
}

const ImageSlider = ({ urls }: ImageSliderProps) => {
  const [swiper, setSwiper] = useState<null | SwiperType>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const [slideConfig, setSlideConfig] = useState({
    isBeginning: true,
    isEnd: activeIndex === (urls.length ?? 0) - 1
  });

  useEffect(() => {
    swiper?.on('slideChange', ({ activeIndex }) => {
      setActiveIndex(activeIndex);
      setSlideConfig({
        isBeginning: activeIndex === 0,
        isEnd: activeIndex === (urls.length ?? 0) - 1
      });
    });
  }, [swiper, urls]);

  const activeStyles =
    'active:scale-[0.97] border2 absolute top-1/2 z-50 grid aspect-square h-8 w-8 -translate-y-1/2 place-items-center rounded-full border-zinc-300 bg-white opacity-100 hover:scale-105';
  const inactiveStyles = 'hidden text-gray-400';

  return (
    <div className='group relative aspect-square overflow-hidden rounded-xl bg-zinc-100'>
      <div className='absolute inset-0 z-10 opacity-0 transition group-hover:opacity-100'>
        <button
          onClick={(event) => {
            event.preventDefault();
            swiper?.slidePrev();
          }}
          className={cn(activeStyles, 'left-3 transition', {
            [inactiveStyles]: slideConfig.isBeginning,
            'hover:bg-primary-300 text-primary-800 opacity-100':
              !slideConfig.isBeginning
          })}
        >
          <ChevronLeft
            aria-label='previous image'
            className='h-4 w-4 text-zinc-700'
          />
        </button>
        <button
          onClick={(event) => {
            event.preventDefault();
            swiper?.slideNext();
          }}
          className={cn(activeStyles, 'right-3 transition', {
            [inactiveStyles]: slideConfig.isEnd,
            'hover:bg-primary-300 text-primary-800 opacity-100':
              !slideConfig.isEnd
          })}
        >
          <ChevronRight
            aria-label='next image'
            className='h-4 w-4 text-zinc-700'
          />
        </button>
      </div>

      <Swiper
        pagination={{
          renderBullet: (_, className) => {
            return `<span aria-hidden='true' class='rounded-full transition ${className}'></span>`;
          }
        }}
        onSwiper={(swiper) => setSwiper(swiper)}
        spaceBetween={50}
        slidesPerView={1}
        modules={[Pagination]}
        className='h-full w-full'
      >
        {urls.map((url, index) => (
          <SwiperSlide
            key={index}
            className='relative -z-10 h-full w-full'
          >
            <Image
              alt='Product image'
              src={url}
              fill
              loading='eager'
              className='-z-10 h-full w-full object-cover object-center'
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ImageSlider;
