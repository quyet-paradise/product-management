import { useEffect, useState } from 'react'
import './App.css'
import { axiosClient } from './service/axiosClient'
import { ProductItem } from './components/ProductItem'
import { SelectBox } from './components/UI/SelectBox'
import { DefaultModal } from './components/Modal/DefaultModal'

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
    <div className='relative grid grid-cols-4 gap-6 m-6'>
      <div className='col-span-4 text-center text-2xl font-semibold text-orange-800 mb-6'>
        Products List
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
      <DefaultModal
        isShow={showModal}
        onClose={() => setShowModal(false)}
        product={product}
      />
    </div>
  )
}
