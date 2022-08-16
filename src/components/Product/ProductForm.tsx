import { useEffect, useState } from 'react'

import { axiosClient } from '../../service/axiosClient'

import { ProductUpdateBody } from '../../type/product.type'

import { useNavigate, useParams, useLocation } from 'react-router-dom'

import { Loading } from '../../components/Loading'

export const ProductForm = () => {
  const initForm = {
    title: 'test product',
    price: 13.5,
    description: 'lorem ipsum set',
    image: 'https://i.pravatar.cc',
    category: 'electronics',
  }

  const [productForm, setProductForm] = useState<ProductUpdateBody>(initForm)
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  const isEdit: boolean = location.pathname.includes('editProduct')

  const { id } = useParams()

  useEffect(() => {
    isEdit &&
      axiosClient.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
        setProductForm({
          ...productForm,
          title: res.data?.title,
          price: res.data?.price,
          description: res.data?.description,
          image: res.data?.image,
          category: res.data?.category,
        })
      })

    axiosClient
      .get('https://fakestoreapi.com/products/categories')
      .then((res) => {
        setCategories(res.data)
      })
  }, [])

  const handleChange = (event: any) => {
    setProductForm({ ...productForm, [event.target.name]: event.target.value })
  }

  const handleSubmit = () => {
    setIsLoading(true)
    if (isEdit) {
      axiosClient
        .put(`https://fakestoreapi.com/products/${id}`, productForm)
        .then((res) => {
          console.log(res)
        })
    } else {
      axiosClient
        .post('https://fakestoreapi.com/products', productForm)
        .then((res) => {
          console.log(res)
        })
    }

    setTimeout(() => {
      setIsLoading(false)
      navigate('/', { replace: true })
    }, 500)
  }

  const handleCancle = () => {
    console.log('cancle')
  }

  const handleBack = () => {
    navigate('/', { replace: true })
  }

  return (
    <div className='relative w-full h-full'>
      <div
        className={`absolute w-screen h-screen z-10 bg-neutral-500/50 ${
          isLoading ? '' : 'hidden'
        }`}
      >
        <Loading />
      </div>
      <div className='relative p-6'>
        <button
          className='absolute top-6 right-6 border rounded-full p-1 hover:bg-gray-100'
          onClick={handleBack}
        >
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
              d='M10 19l-7-7m0 0l7-7m-7 7h18'
            />
          </svg>
        </button>
        <h1 className='text-center font-semibold text-orange-800 text-2xl'>
          {isEdit ? 'Edit Product' : 'Add Product'}
        </h1>
        <div className='mb-6'>
          <label
            htmlFor='title'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={productForm.title}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='price'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Price
          </label>
          <input
            type='number'
            id='price'
            name='price'
            value={productForm.price}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>
        <div className='mb-6'>
          <label
            htmlFor='description'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Description
          </label>
          <textarea
            id='description'
            name='description'
            rows={4}
            value={productForm.description}
            onChange={handleChange}
            className='block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            placeholder='Leave a comment...'
          ></textarea>
        </div>

        <div className='mb-6'>
          <label
            htmlFor='image'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300'
          >
            Image Link
          </label>
          <input
            type='text'
            id='image'
            name='image'
            disabled
            value={productForm.image}
            onChange={handleChange}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          />
        </div>

        <div className='mb-6'>
          <label
            htmlFor='categories'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
          >
            Categories
          </label>
          <select
            id='categories'
            name='category'
            onChange={handleChange}
            value={productForm.category}
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          >
            <option value='all'>Please choose...</option>
            {categories.map((item: string) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mb-6 text-right'>
          <button
            className='m-2 p-1 border rounded bg-white hover:bg-gray-100'
            onClick={handleCancle}
          >
            Cancel
          </button>
          <button
            className='m-2 p-1 border rounded bg-green-300 hover:bg-green-400'
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  )
}
