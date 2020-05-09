import React from 'react'
import { Container, Grid } from "@material-ui/core"
import Select from "../select/select"
import styles from './assets/appFilters.module.sass'



function AppFilters(props) {
  function handleDepartments(element) {
    props.setSearchByDepartments(element.value)
  }

  function handleProductsNames(e) {
    props.setSearchByName(e.currentTarget.value)
  }

  function handlePromotionsSearch(e) {
    props.setSearchByPromotionCode(e.currentTarget.value)
  }
  return (
    <div>
      <Container>
        <Grid container justify="space-between">
          <Grid item xs={3}>
            <Select
              options={props.departments}
              valueKey="id"
              labelKey="name"
              idKey="id"
              placeholder="Filter Departments"
              onChange={handleDepartments}
              name="department"
              icon={<i className="fa fa-angle-down"></i>}
              noSelectionValue=""
            />
          </Grid>
          <Grid item xs={3}>
            <input type="text" placeholder="product name" className={styles.inputStyle} onChange={handleProductsNames} />
          </Grid>
          <Grid item xs={3}>
            <input type="text" placeholder="promotion code" className={styles.inputStyle} onChange={handlePromotionsSearch} />
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default AppFilters