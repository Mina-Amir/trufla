import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Grid } from '@material-ui/core'
import styles from './assets/dataTable.module.sass'



function DataTable(props) {
  function changePage(e) {
    props.setPage(Number(e.currentTarget.dataset.pagenumber))
  }
  return (
    <div>
      <Container>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell component="th">Product Name</TableCell>
                <TableCell component="th">Price</TableCell>
                <TableCell component="th">Promotion</TableCell>
                <TableCell component="th">Discounted Price</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.searchByName === "" && props.searchByPromotionCode === "" && props.searchByDepartments === "" ?
                props.products.map(product => {
                  let productPromotionData = props.productsPromotions.find(productPromotion => product.id === productPromotion.product_id)
                  let promotionData = productPromotionData && props.promotions.find(promotion => promotion.id === productPromotionData.promotion_id)
                  return (
                    <TableRow key={product.id}>
                      <TableCell>
                        {product.name}
                      </TableCell>
                      <TableCell>
                        {product.price}
                      </TableCell>
                      <TableCell>
                        {promotionData && promotionData.active === "true" ? promotionData.code : "No available Promotion"}
                      </TableCell>
                      <TableCell>
                        {promotionData && promotionData.active === "true" ? product.price - ((promotionData.discount * product.price) / 100) : "No available Discount"}
                      </TableCell>
                    </TableRow>
                  )
                })
                :
                props.filteredProducts.length > 0 ?
                  props.filteredProducts.map(product => {
                    let productPromotionData = props.productsPromotions.find(productPromotion => product.id === productPromotion.product_id)
                    let promotionData = productPromotionData && props.promotions.find(promotion => promotion.id === productPromotionData.promotion_id)
                    return (
                      <TableRow key={product.id}>
                        <TableCell>
                          {product.name}
                        </TableCell>
                        <TableCell>
                          {product.price}
                        </TableCell>
                        <TableCell>
                          {promotionData && promotionData.active === "true" ? promotionData.code : "No available Promotion"}
                        </TableCell>
                        <TableCell>
                          {promotionData && promotionData.active === "true" ? product.price - ((promotionData.discount * product.price) / 100) : "No available Discount"}
                        </TableCell>
                      </TableRow>
                    )
                  })
                  :
                  (
                    <TableRow>
                      <TableCell align="center" colSpan={4}>
                        No Products met your search
                      </TableCell>
                    </TableRow>
                  )
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Container classes={{ root: styles.paginationContainer }}>
        <Grid container justify="center">
          {props.pages.map(page => {
            return <button key={page} data-pagenumber={page} type="button" onClick={changePage}>{page}</button>
          })}
        </Grid>
      </Container>
    </div>
  )
}

export default DataTable