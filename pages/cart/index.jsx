import { Button, CircularProgress, IconButton, makeStyles, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { useEffect } from "react";
import DeleteIcon from '@material-ui/icons/Delete';
import Layout from "../../components/Layout"
import useCarts from '../../models/carts'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 650,
  },
}));

const Cart = () => {
  const classes = useStyles();
  const { fetchCheckout, data, loading, removeLineItem } = useCarts();
  
  const handleDeleteItem = (id)=>{
    removeLineItem(id)
  }

  useEffect(() => {
    fetchCheckout()
  }, [])

  return (
    <Layout title="Cart">
      <Typography variant='h4' className={classes.title}>Your Cart</Typography>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Product Variants</TableCell>
              <TableCell align="right">Quantity	</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!loading&&data?.lineItems.edges.map((row) => (
                <TableRow key={row.node.id}>
                  <TableCell component="th" scope="row">
                    {row.node.title}
                  </TableCell>
                  <TableCell align="right">{row.node.quantity}</TableCell>
                  <TableCell align="right">
                    <IconButton onClick={()=>handleDeleteItem(row.node.variant.id)} >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {loading&&<div style={{ textAlign: 'center' }}>
          <CircularProgress size={30} />
        </div>}
      </TableContainer>
      <Typography paragraph className={classes.title}>Subtotal:${data?.subtotalPriceV2.amount}</Typography>
      <Typography paragraph className={classes.title}>Taxes:${data?.totalTaxV2.amount}</Typography>
      <Typography paragraph className={classes.title}>Total:${data?.totalPriceV2.amount}</Typography>
      <Button variant='contained' color='primary' href={data.webUrl}>CHECKOUT</Button>
    </Layout>
  )
}

export default Cart