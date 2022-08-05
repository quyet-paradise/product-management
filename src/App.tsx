import { Fragment, useEffect, useState } from 'react'
import './App.css'
import { axiosClient } from './service/axiosClient'
import { ProductItem } from './components/ProductItem'
import { SelectBox } from './components/UI/SelectBox'

export const App = () => {
  const [products, setProducts] = useState([])

  const [categories, setCategories] = useState([])

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
      {products.map((product: any) => (
        <Fragment key={product.id}>
          <ProductItem productItem={product} />
        </Fragment>
      ))}
    </div>
  )
}
