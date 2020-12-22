import { Grid, InputLabel, makeStyles, TextField, Typography, Select, MenuItem, Button, CircularProgress } from "@material-ui/core"
import { useEffect, useState } from "react";
import { getHandleProduct } from '../../services/api'
import Layout from '../../components/Layout'
import useCarts from '../../models/carts'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(4),
  },
  item: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 286,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));
const ProductDetail = ({ data }) => {
  const classes = useStyles();
  const { addLineItem, loading } = useCarts();
  const variants = data.variants.edges.map(({ node }) => ({ ...node }));
  const [values, setValues] = useState({
    variantId: '',
    quantity: 1
  });
  const defaultSelectedOptions = variants[0].selectedOptions.reduce((options, { name, value }) => {
    return { ...options, [name]: value };
  }, {});

  const [selectedOptions, setSelectedOptions] = useState(defaultSelectedOptions);

  function handleChangeSelect(event) {
    const { name, value } = event.target;
    setSelectedOptions({ ...selectedOptions, [name]: value });
  }

  const handleSubmit = (e) => {
    addLineItem(values.variantId, values.quantity)
  }

  const handleGetVariantId = variantId => setValues({ ...values, variantId })

  useEffect(() => {
    const selectedVariant = variants.find(variant => {
      const _selectedOptions = variant.selectedOptions.reduce((options, { name, value }) => {
        return { ...options, [name]: value };
      }, {});

      return JSON.stringify(_selectedOptions) === JSON.stringify(selectedOptions)
    });

    handleGetVariantId(selectedVariant ? selectedVariant.id : null);
  }, [selectedOptions]);

  return (
    <Layout title={data.title}>
      <div className={classes.root}>
        <Grid container spacing={2}>
          <Grid item>
            <img className={classes.image} alt="complex" src={data.images.edges[0].node.transformedSrc} />
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="h4">
                  {data.title}
                </Typography>
                <Typography variant="body2" gutterBottom className={classes.item}>
                  {data.description}
                </Typography>
                <TextField
                  id="standard-number"
                  label="Number"
                  type="number"
                  defaultValue={1}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  className={classes.item}
                  onChange={quantity => setValues({ ...values, quantity })}
                />
                {data.options.map(({ name, values }) => (
                  <div key={name} className={classes.item}>
                    <InputLabel className={classes.formLabel} htmlFor={`product-option-${name}`}>
                      {name}
                    </InputLabel>
                    <Select
                      native
                      value={selectedOptions[name]}
                      onChange={handleChangeSelect}
                      inputProps={{
                        name: name,
                        id: `product-option-${name}`
                      }}
                    >
                      {values.map(value => {
                        return (
                          <option value={value} key={value}>
                            {value}
                          </option>
                        );
                      })}
                    </Select>
                  </div>
                ))}
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                  className={classes.item}
                  disabled={loading}
                  >
                  {loading&&<CircularProgress disableShrink size={10} style={{color:'#fff'}} />}
                  ADD TO CART
                  </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { data } = await getHandleProduct({ handle: context.query.product_title });
  return {
    props: {
      data: data.productByHandle,
      handle: context.query.product_title
    }, // will be passed to the page component as props
  }
}


export default ProductDetail