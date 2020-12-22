import { Button, CircularProgress, Grid } from "@material-ui/core"
import DataCard from "./DataCard"
import useProducts from '../../../models/products'
import { useRouter } from "next/router"


const DataCardList = () => {
  const router = useRouter()
  const { fetchMore, data, loading, initLoading } = useProducts();
  const { edges = [], pageInfo } = data
  const hasNext = pageInfo.hasNextPage
  const handleMore = () => {
    fetchMore({ ...router.query, cursor: edges[edges.length - 1].cursor });
  }
  return (
    <>
      <div>
        {initLoading ?
          <div style={{ textAlign: 'center' }}><CircularProgress disableShrink size={30} /></div>
          :
          <>
            <Grid container spacing={4}>
              {edges?.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.cursor}>
                  <DataCard {...item} />
                </Grid>
              ))}
            </Grid>
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              {loading ?
                <div style={{ textAlign: 'center' }}><CircularProgress disableShrink size={30} /></div>
                :
                <Button variant="contained" color="primary" onClick={handleMore} disabled={!hasNext}>{hasNext ? 'LOAD MORE' : 'NO MORE'}</Button>}
            </div>
          </>
        }
      </div>

    </>
  )
}
export default DataCardList 