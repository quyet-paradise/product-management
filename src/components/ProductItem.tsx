import { Rating } from './UI/Rating'

export const ProductItem = ({ productItem }: { productItem: any }) => {
  return (
    <div className='relative border border-rose-500 rounded p-2'>
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

      <p className='mx-3 text-xs h-32 overflow-hidden'>
        {productItem.description}
      </p>

      <p className='mx-3 text-sm text-rose-500 font-semibold'>
        ${productItem.price}
      </p>

      <Rating rating={productItem.rating?.rate} />

      <p className='mx-3 text-sm'>Sold: {productItem.rating?.count}</p>
    </div>
  )
}
