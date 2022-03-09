import { useMemo, useState, useEffect } from 'react'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import VietnamCaseChart from 'components/VietnamCaseChart'
import WrapContent from 'components/WrapContent'
import { formatNumberWithCommas, getColor } from 'utils'
import VietnamWeekAnalytics from 'components/VietnamWeekAnalytics'
import axios from 'axios'

const AnalyticsPage = ({ graphqlGlobalCases }) => {
  const [overview, setOverview] = useState([])
  const [isOverviewLoading, setIsOverviewLoading] = useState(true)

  const classes = useStyles()

  const liveCase = useMemo(() => {
    const totalConfirmed = graphqlGlobalCases.data?.totalConfirmed
    const totalRecovered = graphqlGlobalCases.data?.totalRecovered
    const totalDeaths = graphqlGlobalCases.data?.totalDeaths

    return totalConfirmed - totalRecovered - totalDeaths
  }, [graphqlGlobalCases.data])

  useEffect(() => {
    ;(async () => {
      axios
        .get('https://static.pipezero.com/covid/data.json')
        .then((res) => {
          setOverview(res.data.overview)
        })
        .catch((err) => {
          console.log(err)
        })
        .then(() => {
          setIsOverviewLoading(false)
        })
    })()
  }, [])

  return (
    <Box className={classes.analyticsPage}>
      <WrapContent
        className={classes.liveCase}
        isLoading={graphqlGlobalCases.loading}
      >
        <Box className={classes.liveCaseTitle}>
          Số người đang nhiễm bệnh trên thế giới
        </Box>
        <Box
          sx={{
            color: getColor(),
            fontSize: 24,
          }}
        >
          {formatNumberWithCommas(liveCase)} người
        </Box>
      </WrapContent>
      <VietnamWeekAnalytics overview={overview} isLoading={isOverviewLoading} />
      <VietnamCaseChart overview={overview} isLoading={isOverviewLoading} />
    </Box>
  )
}

const useStyles = makeStyles({
  analyticsPage: {},
  liveCase: {
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 8,
    marginBottom: 12,
  },
  liveCaseTitle: {
    fontSize: 32,
  },
})

export default AnalyticsPage
