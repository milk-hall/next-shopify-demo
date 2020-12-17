import { useApolloClient } from "@apollo/client"
import { InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core"
import { useState } from "react";
import Layout from "../../components/Layout"
import { initializeApollo } from "../../lib/apollo"

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
  }
}));

const sortOpts = [
  {
    name: 'Best Selling',
    sortKey: 'best_selling',
    reverse: false
  },
  {
    name: 'Newest',
    sortKey: 'created_at',
    reverse: true
  },
  {
    name: 'Oldest',
    sortKey: 'created_at',
    reverse: false
  },
  {
    name: 'Price (Low > High)',
    sortKey: 'price',
    reverse: false
  },
  {
    name: 'Price (High > Low)',
    sortKey: 'price',
    reverse: true
  },
  {
    name: 'Title (A - Z)',
    sortKey: 'title',
    reverse: false
  },
  {
    name: 'Title (Z - A)',
    sortKey: 'title',
    reverse: true
  }
];

const Products = () => {
  const apolloClient = initializeApollo()
  const [selected,setSelected]=useState(6)
  const classes = useStyles();
  const handleChange = (e) => {
    setSelected(e.target.value)
  }
  return (
    <Layout title='Products'>
      <div className={classes.toolbar}>
        <TextField id="standard-basic" label="Standard" />
        <div>
          <InputLabel className='MuiInputLabel-root MuiInputLabel-animated MuiInputLabel-shrink MuiFormLabel-filled'>Sort By</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selected}
            onChange={handleChange}
          >
            {sortOpts.map(({ name }, index) => (
              <MenuItem key={name} value={index}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </div>
      </div>
      Products
    </Layout>
  )
}

export default Products