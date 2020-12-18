import { InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core"
import { useEffect, useState } from "react";
import Layout from "../../components/Layout"
import DataCardList from "./components/DataCardList";
import useProducts from '../../models/products'
import { getFirstPage } from "../../services/api";

const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
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

const Products = ({initData}) => {
  const { init } = useProducts()
  const [selected, setSelected] = useState(0);
  
  const classes = useStyles();
  const handleChange = (e) => {
    setSelected(e.target.value)
  }
  useEffect(()=>{
    console.log(initData)
    init({initData})
  },[])
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
      <DataCardList />
    </Layout>
  )
}

export async function getStaticProps(context) {
  
  const { data } = await getFirstPage({
    query: "",
    sortKey: "BEST_SELLING",
    reverse: false,
  })
  return {
    props: {
      initData:data.products
    }, // will be passed to the page component as props
  }
}


export default Products