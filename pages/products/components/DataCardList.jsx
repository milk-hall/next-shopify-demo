import { Button, CircularProgress, Grid } from "@material-ui/core"
import DataCard from "./DataCard"
import useProducts from '../../../models/products'


const DataCardList = () => {
  const { fetchMore, data, loading } = useProducts()
  const { edges=[], pageInfo } = data
  const hasNext = pageInfo.hasNextPage
  const handleMore = () => {
    fetchMore()
  }
  return (
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
          <Button variant="contained" color="primary" onClick={handleMore} disabled={!hasNext}>{ hasNext? 'LOAD MORE' : 'NO MORE'}</Button>}
      </div>
    </>
  )
}
export default DataCardList 