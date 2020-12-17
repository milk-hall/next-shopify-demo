import { Button, makeStyles, Typography } from "@material-ui/core";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    textAlign:"center",
  },
}));

export default function Home() {
  const classes = useStyles();
  const router = useRouter();
  const handleGoto = (url) => {
    router.push(url)
  }
  return (
    <Layout title="">
      <Typography
        variant="h5"
        gutterBottom
        align="center"
        style={{ marginTop: 32 }}
      >
        Next Shopify Storefront
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        align="center"
        style={{ maxWidth: 500, margin: "0 auto" }}
      >
        A Shopping Cart built with TypeScript, NextJS, React, Redux, Apollo
        Client, Shopify Storefront GraphQL API, ... and Material UI.
      </Typography>
      <div className={classes.root}>
        <Button variant="contained" color="primary" onClick={()=>handleGoto('/products')}>
          BROWSE PRODUCTS
        </Button>
        <Button variant="contained" onClick={()=>{ router.push('https://github.com/milk-hall/next-shopify-demo')}}>GET SOURCE CODE</Button>
      </div>
    </Layout>
  );
}
