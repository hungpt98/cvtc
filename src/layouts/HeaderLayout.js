import React, { useEffect, useMemo, useRef, useState } from 'react'
import WrapContent from '../components/WrapContent'
import MenuBars from 'components/MenuBars'
import GlobalCaseItem from '../components/GlobalCaseItem'
import { Box } from '@mui/material'
import { makeStyles } from '@mui/styles'
import {
  Coronavirus as CoronavirusIcon,
  List as MenuIcon,
} from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { getGlobalCases } from 'store/covidSlice'
import { getDateByTimestamp, getGlobalCaseList } from 'utils'
import { getColor } from 'utils'
import { headerElementSuccess } from 'store/elementSlice'
import clsx from 'clsx'
import { useNavigate } from 'react-router-dom'

const HeaderLayout = ({ graphqlGlobalCases }) => {
  const [isShowMenu, setIsShowMenu] = useState(false)

  const classes = useStyles()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const headerLayoutRef = useRef(null)

  const pathname = window.location.pathname

  const [globalCases, globalCasesPromise] = useSelector(({ covidStore }) => [
    covidStore.globalCases.data,
    covidStore.globalCases.promiseStatus,
  ])

  const { updated } = globalCases

  const isAnalyticsPage = useMemo(() => {
    return pathname === '/analytics'
  }, [pathname])

  const isConversationLoading = useMemo(() => {
    return globalCasesPromise === 'pending'
  }, [globalCasesPromise])

  const lastTimeUpdated = useMemo(() => {
    const dateFormat = getDateByTimestamp(updated)
    const { hhMMss, ddMMyy } = dateFormat

    return `Cập nhật lần cuối lúc: ${hhMMss} - ${ddMMyy}`
  }, [updated])

  const globalCaseList = getGlobalCaseList(graphqlGlobalCases)

  const handleToggleMenu = () => {
    setIsShowMenu((prevState) => !prevState)
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  useEffect(() => {
    dispatch(getGlobalCases())
  }, [dispatch])

  useEffect(() => {
    const headerElement = headerLayoutRef.current
    const headerElementClientHeight = headerElement.clientHeight

    dispatch(headerElementSuccess(headerElementClientHeight))
  }, [dispatch])

  return (
    <Box className={classes.headerLayout} ref={headerLayoutRef}>
      <WrapContent
        className={clsx(
          classes.conversation,
          isAnalyticsPage && classes.conversationAnalytics
        )}
        isLoading={isConversationLoading}
      >
        <Box className={classes.logo} onClick={handleLogoClick}>
          <CoronavirusIcon />
          <Box component="span">COVID19 TRACKER</Box>
        </Box>
        <Box className={classes.title}>
          <Box className={classes.typoPrimary}>
            Cổng thông tin các ca nhiễm Covid19
          </Box>
          <Box className={classes.lastTime} component="span">
            {lastTimeUpdated}
          </Box>
        </Box>
        <Box className={classes.menuBars}>
          <MenuIcon className={classes.menuIcon} onClick={handleToggleMenu} />
          {isShowMenu && <MenuBars setIsShowMenu={setIsShowMenu} />}
        </Box>
      </WrapContent>
      {!isAnalyticsPage && (
        <Box className={classes.globalCaseList}>
          {globalCaseList.map((globalCaseItem) => (
            <GlobalCaseItem
              key={globalCaseItem.key}
              title={globalCaseItem.title}
              caseToday={globalCaseItem.caseToday}
              todayUpTo={globalCaseItem.todayUpTo}
              isLoading={graphqlGlobalCases.loading}
              color={getColor(globalCaseItem.key)}
            />
          ))}
        </Box>
      )}
    </Box>
  )
}

const useStyles = makeStyles({
  headerLayout: {
    display: 'flex',
    gap: '12px',
    flexGrow: 1,
  },
  conversation: {
    width: '60%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
  },
  logo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  title: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '12px',
  },
  menuBars: {
    position: 'relative',
  },
  menuIcon: {
    cursor: 'pointer',
  },
  globalCaseList: {
    display: 'flex',
    gap: '12px',
    flexGrow: 1,
  },
  typoPrimary: {
    fontSize: '24px',
  },
  lastTime: {
    fontSize: '16px',
  },
  conversationAnalytics: {
    width: '100%',
  },
})

export default HeaderLayout
