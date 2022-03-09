import { Fragment, useMemo } from 'react'
import CircleLoading from './CircleLoading'
import WrapContent from './WrapContent'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { formatNumberWithCommas } from 'utils'
import { ArrowUpward } from '@mui/icons-material'

const GlobalCaseItem = ({ title, caseToday, todayUpTo, color, isLoading }) => {
  const classes = useStyles()

  const todayUpToLabel = useMemo(() => {
    const percent = ((todayUpTo / caseToday) * 100).toFixed(1)

    return `${formatNumberWithCommas(todayUpTo)} (${percent}%) hôm nay`
  }, [caseToday, todayUpTo])

  return (
    <WrapContent className={classes.root}>
      {isLoading ? (
        <CircleLoading />
      ) : (
        <Fragment>
          <Box className={classes.title} sx={{ color }}>
            {title}
          </Box>
          <Box className={classes.caseToday} sx={{ color }}>
            {formatNumberWithCommas(caseToday)}
          </Box>
          <Box className={classes.todayUpTo} sx={{ color }}>
            <ArrowUpward className={classes.icon} />
            {todayUpToLabel}
          </Box>
        </Fragment>
      )}
    </WrapContent>
  )
}

const useStyles = makeStyles({
  root: {
    width: 'calc(100% / 3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '8px',
  },
  title: {
    fontSize: 10,
  },
  caseToday: {
    fontSize: 12,
    fontWeight: 700,
  },
  todayUpTo: {
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontWeight: 700,
  },
  icon: {
    fontSize: '16px !important',
  },
})

export default GlobalCaseItem
