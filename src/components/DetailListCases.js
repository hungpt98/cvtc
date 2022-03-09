import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import clsx from 'clsx'
import { formatNumberWithCommas, getColor } from 'utils'
import WrapContent from './WrapContent'

const DetailListCases = ({
  isLoading,
  title,
  listCases,
  totalConfirmed,
  totalRecovered,
  totalDeaths,
}) => {
  const classes = useStyles()

  const statusList = [
    {
      id: 1,
      label: 'Nhiễm bệnh',
      total: formatNumberWithCommas(totalConfirmed),
      color: getColor('confirmed'),
    },
    {
      id: 2,
      label: 'Hồi phục',
      total: formatNumberWithCommas(totalRecovered),
      color: getColor('recovered'),
    },
    {
      id: 3,
      label: 'Tử vong',
      total: formatNumberWithCommas(totalDeaths),
      color: getColor('deaths'),
    },
  ]

  return (
    <WrapContent className={classes.detailListCases} isLoading={isLoading}>
      <Box className={classes.title}>{title}</Box>
      <Box className={classes.statusList}>
        {statusList.map((statusItem) => (
          <Box className={classes.statusItem} key={statusItem.id}>
            <Box
              sx={{
                backgroundColor: statusItem.color,
                height: 12,
                width: 12,
                borderRadius: '50%',
              }}
            ></Box>
            <Box className={classes.fs14}>{statusItem.label}</Box>
            {!!statusItem.total && (
              <Box className={classes.fs14}>({statusItem.total})</Box>
            )}
          </Box>
        ))}
      </Box>
      <Box className={clsx(classes.listCases, 'scroll-bar')}>
        {!!listCases?.length &&
          listCases.map((caseItem, index) => (
            <Box className={classes.caseItem} key={index}>
              <Box className={classes.caseItemName}>
                {!!caseItem.flag && (
                  <img
                    className={classes.flag}
                    src={caseItem.flag}
                    alt={caseItem.name}
                  />
                )}
                <Box>{caseItem.name}</Box>
              </Box>
              <Box className={classes.caseInfo}>
                {!!Number(caseItem.confirmed) && (
                  <Box
                    sx={{
                      backgroundColor: getColor('confirmed'),
                    }}
                  >
                    {formatNumberWithCommas(caseItem.confirmed)}
                  </Box>
                )}
                {!!Number(caseItem.recovered) && (
                  <Box
                    sx={{
                      backgroundColor: getColor('recovered'),
                    }}
                  >
                    {formatNumberWithCommas(caseItem.recovered)}
                  </Box>
                )}
                {!!Number(caseItem.deaths) && (
                  <Box
                    sx={{
                      backgroundColor: getColor('deaths'),
                    }}
                  >
                    {formatNumberWithCommas(caseItem.deaths)}
                  </Box>
                )}
              </Box>
            </Box>
          ))}
      </Box>
    </WrapContent>
  )
}

const useStyles = makeStyles({
  detailListCases: {
    // width: '20%',
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  statusList: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    margin: '12px 0',
  },
  statusItem: {
    display: 'flex',
    gap: 8,
    alignItems: 'center',
  },
  fs14: {
    fontSize: 14,
  },
  listCases: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  caseItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  caseItemName: {
    display: 'flex',
    gap: 4,
    alignItems: 'center',
  },
  flag: {
    width: 25,
    height: 15,
  },
  caseInfo: {
    display: 'flex',
    gap: 4,
    '& div': {
      borderRadius: 8,
      padding: '2px 4px',
      color: '#ffffff',
      fontSize: 14,
    },
  },
})

export default DetailListCases
