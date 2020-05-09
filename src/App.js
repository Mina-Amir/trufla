import React, { useEffect, useState } from 'react'
import axios from "./axios"
import AppFilters from './components/appFilters/appFilters'
import DataTable from './components/dataTable/dataTable'

function App() {
  //Fetch requests options
  const [page, setPage] = useState(1)
  const [dataLimit] = useState(5)
  const [pagination, setPagination] = useState([])
  //app data
  const [departments, setDepartments] = useState([])
  const [products, setProducts] = useState({})
  const [promotions, setPromotions] = useState([])
  const [productsPromotions, setProductsPromotions] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  //filtering state
  const [searchByName, setSearchByName] = useState("")
  const [searchByPromotionCode, setSearchByPromotionCode] = useState("")
  const [searchByDepartments, setSearchByDepartments] = useState("")

  // intializing the app data
  useEffect(() => {
    Promise.all([
      axios.get("departments"),
      axios.get("products", {
        params: {
          _page: page,
          _limit: dataLimit
        }
      }),
      axios.get("promotions"),
      axios.get("productsPromotions")
    ])
      .then(([departments, products, promotions, productsPromotions]) => {
        let departmentsData = departments.data
        let productsData = products.data
        let promotionsData = promotions.data
        let productsPromotionsData = productsPromotions.data
        setDepartments(departmentsData)
        setProducts(prev => ({ ...prev, [page]: productsData }))
        setPromotions(promotionsData)
        setProductsPromotions(productsPromotionsData)

        let totalProducts = Number(products.headers["x-total-count"])
        let pages = Array(Math.floor(totalProducts / dataLimit)).fill().map((value, index) => {
          return index + 1
        })
        setPagination(pages)
      })
  },
    // eslint-disable-next-line
    [])

  // get the rest of the app data with pagination and optimizing the code to reduce requests sent to the server
  useEffect(() => {
    if (!products[page]) {
      axios.get("products", {
        params: {
          _page: page,
          _limit: dataLimit
        }
      })
        .then(response => {
          let productsData = response.data
          setProducts(prev => ({ ...prev, [page]: productsData }))
        })
    }
  },
    // eslint-disable-next-line
    [page])


  // filtering function
  useEffect(() => {
    filterData()
  },
    // eslint-disable-next-line
    [searchByName, searchByPromotionCode, searchByDepartments, products])

  function filterData() {

    //Getting all loaded Products Data
    let productsData = []
    Object.values(products).forEach(product => {
      productsData.push(...product)
    })
    let filteredData = []
    if (searchByName === "" && searchByPromotionCode === "" && searchByDepartments === "") {
      return setFilteredProducts([])
    }
    // Search by Product Name
    if (searchByName !== "") {
      filteredData = productsData.filter(product => (product.name).includes(searchByName))
    }
    // Search by Promotion Code
    if (searchByPromotionCode !== "") {
      let filteredPromotionsIds = []
      promotions.forEach(promotion => {
        if ((promotion.code).includes(searchByPromotionCode)) {
          filteredPromotionsIds.push(promotion.id)
        }
      })
      let productsIds = []
      productsPromotions.forEach(productPromotion => {
        if (filteredPromotionsIds.includes(productPromotion.promotion_id)) {
          productsIds.push(productPromotion.product_id)
        }
      })
      filteredData = filteredData.length > 0 ? filteredData.filter(product => productsIds.includes(product.id)) : productsData.filter(product => productsIds.includes(product.id))
    }
    // Search by department
    if (searchByDepartments !== "") {
      filteredData = filteredData.length > 0 ? filteredData.filter(product => (product.name).includes(searchByDepartments)) : productsData.filter(product => (product.department_id).includes(searchByDepartments))
    }
    console.log(filteredData)
    setFilteredProducts(filteredData)
  }


  return (
    <div className="App">
      <AppFilters
        departments={departments}
        setSearchByPromotionCode={setSearchByPromotionCode}
        setSearchByName={setSearchByName}
        setSearchByDepartments={setSearchByDepartments}
      />
      <DataTable
        products={products[page] ?? []}
        filteredProducts={filteredProducts}
        pages={pagination}
        productsPromotions={productsPromotions}
        promotions={promotions}
        setPage={setPage}
        searchByName={searchByName}
        searchByPromotionCode={searchByPromotionCode}
        searchByDepartments={searchByDepartments}
      />
    </div>
  );
}

export default App;
