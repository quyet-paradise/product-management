import { Rating } from './UI/Rating'
import { Product } from '../type/product.type'

export const ProductItem = ({ productItem }: { productItem: Product }) => {
  return (
    <div className='relative rounded p-2 hover:border-2 border-rose-500 cursor-pointer'>
      <p
        className={`absolute top-3 left-0 bg-orange-600 px-1 rounded-r-sm text-white ${
          productItem.rating?.rate >= 4 ? '' : 'hidden'
        }`}
      >
        Favourite
      </p>
      <img
        className='w-full h-96 object-fill'
        src={productItem.image}
        alt={productItem.title}
      />

      <p className='mx-3 text-left text-base font-bold h-8 truncate'>
        {productItem.title}
      </p>

      <p className='mx-3 text-xs h-16 overflow-hidden'>
        {productItem.description}
      </p>

      <p className='mx-3 text-sm text-rose-500 font-semibold'>
        ${productItem.price}
      </p>

      <Rating rating={productItem.rating?.rate} />

      <p className='mx-3 text-sm'>Sold: {productItem.rating?.count}</p>

      <div className='absolute bottom-1 right-1'>
        <button className='rounded-full mx-1 p-1 hover:bg-yellow-100'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z'
            />
          </svg>
        </button>
        <button className='rounded-full mx-1 p-1 hover:bg-red-100'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
