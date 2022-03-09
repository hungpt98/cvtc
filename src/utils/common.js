export const formatNumberWithCommas = (number) => {
  if (!number) return 0

  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export const getColor = (caseType) => {
  let color = '#BD2130'

  if (typeof caseType !== 'string' || caseType === undefined) return color

  switch (caseType) {
    case 'deaths':
      color = '#BDBDBD'
      break
    case 'recovered':
      color = '#A4C939'
      break
    default:
  }

  return color
}

export const getModelListCases = (currentList, limitLocation) => {
  if (!Array.isArray(currentList)) return

  const isCountries = limitLocation === 'countries'
  const result = []

  currentList.forEach((item) => {
    let itemRefactor = {
      name: item[isCountries ? 'country' : 'Province_Name'],
      confirmed: item[isCountries ? 'cases' : 'Confirmed'],
      recovered: item[isCountries ? 'recovered' : 'Recovered'],
      deaths: item[isCountries ? 'deaths' : 'Deaths'],
      flag: item?.countryInfo?.flag,
      lat: item?.Lat,
      long: item?.Long,
    }

    result.push(itemRefactor)
  })

  return result
}

export const getGlobalCaseList = (graphqlGlobalCases) => {
  const totalConfirmed = graphqlGlobalCases.data?.totalConfirmed
  const totalConfirmedLast = graphqlGlobalCases.data?.totalConfirmedLast
  const totalRecovered = graphqlGlobalCases.data?.totalRecovered
  const totalRecoveredLast = graphqlGlobalCases.data?.totalRecoveredLast
  const totalDeaths = graphqlGlobalCases.data?.totalDeaths
  const totalDeathsLast = graphqlGlobalCases.data?.totalDeathsLast

  const result = [
    {
      key: 'confirmed',
      title: 'Nhiễm bệnh',
      caseToday: totalConfirmed,
      todayUpTo: totalConfirmed - totalConfirmedLast,
    },
    {
      key: 'recovered',
      title: 'Hồi phục',
      caseToday: totalRecovered,
      todayUpTo: totalRecovered - totalRecoveredLast,
    },
    {
      key: 'deaths',
      title: 'Tử vong',
      caseToday: totalDeaths,
      todayUpTo: totalDeaths - totalDeathsLast,
    },
  ]

  return result
}
