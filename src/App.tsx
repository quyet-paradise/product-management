import { useEffect, useState } from 'react'
import './App.css'
import { axiosClient } from './service/axiosClient'
import { ProductItem } from './components/Product/ProductItem'
import { SelectBox } from './components/UI/SelectBox'
import { ProductDetailModal } from './components/Modal/ProductDetailModal'
import { Loading } from './components/Loading'

import { useNavigate } from 'react-router-dom'

import { Product } from './type/product.type'

export const App = () => {
  const initProduct: Product = {
    id: 1,
    title: '',
    price: 0,
    category: '',
    description: '',
    image: '',
    rating: {
      rate: 0,
      count: 0,
    },
  }

  const navigate = useNavigate()

  const [products, setProducts] = useState([])

  const [product, setProduct] = useState(initProduct)

  const [categories, setCategories] = useState([])

  const [showModal, setShowModal] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const handleChangeCategory = (category: string) => {
    setIsLoading(true)
    if (category === 'all') {
      axiosClient.get('https://fakestoreapi.com/products').then((res) => {
        setIsLoading(false)
        setProducts(res.data)
      })
    } else {
      axiosClient
        .get('https://fakestoreapi.com/products/category/' + category)
        .then((res) => {
          setIsLoading(false)
          setProducts(res.data)
        })
    }
  }

  const handleToggleModal = (product: Product) => {
    setProduct(product)
    setShowModal(true)
  }

  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/'
    navigate('/login', { replace: true })
  }

  const goToAddPage = () => {
    navigate('/addProduct', { replace: true })
  }

  useEffect(() => {
    setIsLoading(true)
    axiosClient.get('https://fakestoreapi.com/products').then((res) => {
      setIsLoading(false)
      setProducts(res.data)
    })

    axiosClient
      .get('https://fakestoreapi.com/products/categories')
      .then((res) => {
        setIsLoading(false)
        setCategories(res.data)
      })
  }, [])

  return (
    <div className='relative w-full h-full'>
      <div
        className={`absolute w-screen h-screen z-10 bg-neutral-500/50 ${
          isLoading ? '' : 'hidden'
        }`}
      >
        <Loading />
      </div>
      <div className='relative grid grid-cols-4 gap-4 p-6'>
        <p className='col-span-4 text-center text-2xl font-semibold text-orange-800'>
          Products List
        </p>
        <div className='col-span-4 text-center'>
          <button
            className='rounded-full p-1 hover:bg-green-100'
            onClick={goToAddPage}
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
                d='M12 4v16m8-8H4'
              />
            </svg>
          </button>
        </div>

        <SelectBox
          categories={categories}
          handleChangeCategory={handleChangeCategory}
        />

        <button
          className='absolute top-14 right-8 hover:bg-gray-100 rounded'
          onClick={logout}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
            />
          </svg>
        </button>

        {products.map((product: Product) => (
          <a key={product.id} onClick={() => handleToggleModal(product)}>
            <ProductItem productItem={product} setIsLoading={setIsLoading} />
          </a>
        ))}

        <ProductDetailModal
          isShow={showModal}
          onClose={() => setShowModal(false)}
          product={product}
        />
      </div>
    </div>
  )
}
