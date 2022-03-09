import { makeStyles } from '@mui/styles'
import WrapContent from 'components/WrapContent.js'
import { Box } from '@mui/material'
import { formatNumberWithCommas, getColor } from 'utils'

const VietnamWeekAnalytics = ({ overview, isLoading }) => {
  const classes = useStyles()

  const getWeekAverage = (field, overview) => {
    let total = 0

    for (let i = 0; i < overview.length; i++) {
      total += overview[i][field]
    }

    return formatNumberWithCommas(Math.ceil(total / overview.length))
  }

  const averageConfirmed = getWeekAverage('cases', overview)
  const averageRecovered = getWeekAverage('recovered', overview)
  const averageDeaths = getWeekAverage('death', overview)

  return (
    <WrapContent className={classes.vietnamWeekAnalytics} isLoading={isLoading}>
      <Box className={classes.title}>Trung bình 7 ngày vừa qua</Box>
      <Box className={classes.average} sx={{ color: getColor('confirmed') }}>
        {averageConfirmed} ca nhiễm
      </Box>
      <Box className={classes.average} sx={{ color: getColor('recovered') }}>
        {averageRecovered} ca hồi phục
      </Box>
      <Box className={classes.average} sx={{ color: getColor('deaths') }}>
        {averageDeaths} ca tử vong
      </Box>
    </WrapContent>
  )
}

const useStyles = makeStyles({
  vietnamWeekAnalytics: {
    textAlign: 'center',
    padding: 12,
  },
  title: {
    fontSize: 32,
    marginBottom: 12,
  },
  average: {
    fontSize: 24,
  },
})

export default VietnamWeekAnalytics
