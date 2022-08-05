export const SelectBox = ({
  categories,
  handleChangeCategory,
}: {
  categories: string[]
  handleChangeCategory: Function
}) => {
  const handleChange = (event: any) => {
    handleChangeCategory(event.target.value)
  }
  return (
    <div className='absolute top-0 right-0'>
      <label
        htmlFor='categories'
        className='block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400'
      >
        Categories
      </label>
      <select
        id='categories'
        onChange={handleChange}
        className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
      >
        <option value='all'>All</option>
        {categories.map((item: string) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  )
}
