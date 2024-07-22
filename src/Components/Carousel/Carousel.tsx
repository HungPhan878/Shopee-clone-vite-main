/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import classNames from 'classnames/bind'

// scss
import style from './Carousel.module.scss'
import { useEffect, useState } from 'react'

const cx = classNames.bind(style)

interface Props {
  children: React.ReactNode[]
  // vì return về một mảng có các element
  autoSlides?: boolean
  timeout?: number
}

export default function Carousel({ children: slides, autoSlides = false, timeout = 3000 }: Props) {
  const [curr, setCurr] = useState<number>(0)

  // handler function
  const next = () => {
    setCurr((prev) => (prev >= slides.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setCurr((prev) => (prev < 0 ? slides.length - 1 : prev - 1))
  }

  const handleClick = (index: number) => () => {
    setCurr(index)
  }

  useEffect(() => {
    if (!autoSlides) return
    const slidesInterval = setInterval(next, timeout)

    return () => clearInterval(slidesInterval)
  }, [])

  return (
    <div className={cx('slides-wrap')}>
      <div className={cx('slides-row')} style={{ transform: `translateX(-${curr * 100}%)` }}>
        {slides}
      </div>
      <div className={cx('slides-btns')}>
        <button onClick={prev} className={cx('slides-btn')}>
          <svg
            enableBackground='new 0 0 13 20'
            viewBox='0 0 13 20'
            role='img'
            className={cx('slides-btn__arrow')}
          >
            <path stroke='none' d='m4.2 10l7.9-7.9-2.1-2.2-9 9-1.1 1.1 1.1 1 9 9 2.1-2.1z' />
          </svg>
        </button>
        <button onClick={next} className={cx('slides-btn')}>
          <svg
            enableBackground='new 0 0 13 21'
            viewBox='0 0 13 21'
            role='img'
            className={cx('slides-btn__arrow')}
          >
            <path stroke='none' d='m11.1 9.9l-9-9-2.2 2.2 8 7.9-8 7.9 2.2 2.1 9-9 1-1z' />
          </svg>
        </button>
      </div>
      <div className={cx('slides-dots')}>
        {slides.map((_, index) => (
          <button
            className={cx('slides-dot', {
              'slides-dot--active': curr === index
            })}
            key={index}
            onClick={handleClick(index)}
          ></button>
        ))}
      </div>
    </div>
  )
}
