export const useAuth = () => {
  const token = getCookie('token')

  return token ? true : false
}

const getCookie = (cName: string) => {
  const name: string = cName + "="
  const cDecoded = decodeURIComponent(document.cookie); //to be careful
  const cArr = cDecoded.split('; ')
  let res
  cArr.forEach(val => {
    if (val.indexOf(name) === 0) res = val.substring(name.length)
  })
  return res
}