import WrapContent from './WrapContent'
import { makeStyles } from '@mui/styles'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Box } from '@mui/material'
import leaflet from 'leaflet'
import { formatNumberWithCommas } from 'utils'

const VietnamMapCases = ({ center, zoom, isLoading, listMakers }) => {
  const classes = useStyles()

  const iconMarker = () => {
    return new leaflet.divIcon({
      className: classes.iconMarkerContainer,
      html: `<div class="icon-marker"></div>`,
      iconSize: [20, 20],
    })
  }

  return (
    <WrapContent className={classes.vietnamMapCases} isLoading={isLoading}>
      <MapContainer
        className={classes.mapContainer}
        center={center}
        zoom={zoom}
      >
        <TileLayer url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png" />
        {!!listMakers?.length &&
          listMakers.map((markerItem, index) => (
            <Marker
              position={[markerItem.lat, markerItem.long]}
              key={index}
              icon={iconMarker()}
            >
              <Popup>
                <Box className={classes.markerItemName}>{markerItem.name}</Box>
                <Box className={classes.markerItemConfirmed}>
                  <Box component="span">Số ca mắc: </Box>
                  <Box component="span">
                    {formatNumberWithCommas(markerItem.confirmed)} ca
                  </Box>
                </Box>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </WrapContent>
  )
}

const useStyles = makeStyles({
  vietnamMapCases: {
    width: '80%',
    height: '100%',
  },
  mapContainer: {
    width: '100%',
    height: '100%',
  },
  iconMarkerContainer: {
    backgroundColor: 'rgb(230, 0, 0)',
    opacity: 0.5,
    borderRadius: '50%',
  },
  markerItemName: {
    fontSize: 24,
  },
  markerItemConfirmed: {
    fontSize: 16,
    fontWeight: 700,
  },
})

export default VietnamMapCases
