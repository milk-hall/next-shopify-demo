import { AppBar, Badge, Button, Container, IconButton, Toolbar, Typography } from "@material-ui/core"
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { useRouter } from 'next/router'
const NavBar = () => {
  const router = useRouter();
  const handleGoto = (url) => {
    router.push(url)
  }
  return (
    <AppBar position="static" color='primary'>
      <Container>
        <Toolbar disableGutters>
          <Typography variant="h6" style={{ flexGrow: 1 }} color="inherit">
            Next Shopify Storefront
          </Typography>
          <Button size='large' color="inherit" onClick={()=>handleGoto('/')}>HOME</Button>
          <Button size='large' color="inherit" onClick={()=>handleGoto('/products')}>PRODUCTS</Button>
          <IconButton size='medium' color="inherit" onClick={()=>handleGoto('/cart')}>
            <Badge badgeContent={3} color="secondary">
              <ShoppingBasketIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar