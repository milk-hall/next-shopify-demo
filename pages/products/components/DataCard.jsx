import { IconButton } from "@material-ui/core"
import InfoIcon from '@material-ui/icons/Info';
import useProducts from '../../../models/products'

const DataCard = ({ cursor, node }) => {
  const { title, priceRange: { maxVariantPrice: { amount } }, images: { edges } } = node
  return (
    <div style={{ width: '100%', height: '505px', overflow: 'hidden', position: "relative" }}>
      <img src={edges[0].node.transformedSrc} style={{ width: "120%", height: "100%", objectFit: 'cover', position: "absolute", left: '50%', transform: 'translateX(-50%)' }} />
      <div style={{ background: 'rgba(0, 0, 0, 0.5)', display: "flex", justifyContent: 'space-between', padding: 16, color: '#FFF', height: '68px', width: '100%', position: 'absolute', bottom: 0, left: 0 }}>
        <div style={{width:'90%'}}>
          <div style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
            {title}
          </div>
          <div style={{ fontSize: 12 }}>
            ${amount}
          </div>
        </div>
        <IconButton size='medium' color="inherit">
          <InfoIcon />
        </IconButton>
      </div>
    </div>
  )

}

export default DataCard