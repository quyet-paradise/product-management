import { useEffect, useState } from 'react'
import './App.css'
import { axiosClient } from './service/axiosClient'
import { ProductItem } from './components/ProductItem'
import { SelectBox } from './components/UI/SelectBox'
import { ProductDetailModal } from './components/Modal/ProductDetailModal'
import { ProductFormModal } from './components/Modal/ProductFormModal'

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

  const [products, setProducts] = useState([])

  const [product, setProduct] = useState(initProduct)

  const [categories, setCategories] = useState([])

  const [showModal, setShowModal] = useState(false)

  const [isEdit, setIsEdit] = useState(false)

  const handleChangeCategory = (category: string) => {
    if (category === 'all') {
      axiosClient.get('https://fakestoreapi.com/products').then((res) => {
        setProducts(res.data)
      })
    } else {
      axiosClient
        .get('https://fakestoreapi.com/products/category/' + category)
        .then((res) => {
          setProducts(res.data)
        })
    }
  }

  const handleToggleModal = (product: Product) => {
    setProduct(product)
    setShowModal(true)
  }

  const openAddModal = () => {
    setIsEdit(true)
  }

  useEffect(() => {
    axiosClient.get('https://fakestoreapi.com/products').then((res) => {
      setProducts(res.data)
    })

    axiosClient
      .get('https://fakestoreapi.com/products/categories')
      .then((res) => {
        setCategories(res.data)
      })
  }, [])

  return (
    <div className='relative grid grid-cols-4 gap-4 m-6'>
      <p className='col-span-4 text-center text-2xl font-semibold text-orange-800'>
        Products List
      </p>
      <div className='col-span-4 text-center'>
        <button
          className='rounded-full p-1 hover:bg-green-100'
          onClick={openAddModal}
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

      {products.map((product: Product) => (
        <a key={product.id} onClick={() => handleToggleModal(product)}>
          <ProductItem productItem={product} />
        </a>
      ))}

      <ProductDetailModal
        isShow={showModal}
        onClose={() => setShowModal(false)}
        product={product}
      />

      <ProductFormModal isEdit={isEdit} onClose={() => setIsEdit(false)} />
    </div>
  )
}
