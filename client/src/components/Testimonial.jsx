import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets'
import StarRating from './StarRating'

const Testimonial = () => {
  return (
    <div className='flex flex-col items-center px-6 md:px-10 lg:px-16 bg-slate-50 py-20'>

      <Title
        title="What Our Guests Say"
        subTitle="Discover why discerning travelers consistently choose QuickStay for their exclusive and luxurious accommodations around the world."
      />

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-16 w-full'>

        {testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className='bg-white p-6 rounded-xl shadow-md w-full'
          >
            <div className='flex items-center gap-3'>
              <img
                className='w-12 h-12 rounded-full object-cover'
                src={testimonial.image}
                alt={testimonial.name}
              />

              <div>
                <p className='font-playfair text-2xl text-gray-900'>
                  {testimonial.name}
                </p>

                <p className='text-gray-500'>
                  {testimonial.address}
                </p>
              </div>
            </div>

            <div className='flex items-center gap-1 mt-4'>
              <StarRating />
            </div>

            <p className='text-gray-500 mt-4 leading-8'>
              "{testimonial.review}"
            </p>

          </div>
        ))}

      </div>

    </div>
  )
}

export default Testimonial