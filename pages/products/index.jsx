import { InputLabel, makeStyles, MenuItem, Select, TextField } from "@material-ui/core"
import { useEffect, useRef, useState } from "react";
import isServer from 'detect-node';
import Layout from "../../components/Layout"
import DataCardList from "../../components/products/DataCardList";
import useProducts from '../../models/products'
import { getFirstPage } from "../../services/api";
import { useRouter } from "next/router";
import { sortOpts } from '../../models/map'
const useStyles = makeStyles((theme) => ({
  root: {},
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  }
}));


const Products = ({ initData, query }) => {
  const { init } = useProducts()
  const ref = useRef(false);
  if (!ref.current) {
    init({ initData })
    ref.current = true;
  }
  const router = useRouter()
  const [selected, setSelected] = useState(0);
  const [searchValue, setSearchValue] = useState('');
  const [variables, setVariables] = useState(query);
  const classes = useStyles();
  const handleChange = (e) => {
    const key = e.target.value
    const selectItem = sortOpts[key];
    setSelected(e.target.value);
    setVariables(state => ({ query: '', sortKey: 0, ...state, reverse: selectItem.reverse, sortKey: key }))
  }

  useEffect(() => {
    if (query === variables) return;
    router.push({ pathname: '/products', query: variables })
    init({ variables: variables })
  }, [variables])

  return (
    <Layout title='Products'>
      <div className={classes.toolbar}>
        <TextField id="standard-basic"
          label="Standard"
          onBlur={(e) => {
            if(e.target.value===searchValue) return;
            setSearchValue(e.target.value)
            setVariables(state => ({ reverse:'false',sortKey: 0, ...state, query: e.target.value }))
          }}
          />
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

Products.getInitialProps = async context => {
  const query = JSON.stringify(context.query) === '{}' ? {
    query: "",
    sortKey: 0,
    reverse: false,
  } : context.query;
  if (isServer) {
    const { data } = await getFirstPage({ ...query })
    if (!data) {
      return {
        notFound: true,
      }
    }
    return {
      initData: data.products,
      query
    }
  }
  return {
    props: {
      query
    }, // will be passed to the page component as props
  }
}


export default Products