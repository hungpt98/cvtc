import { useState, useMemo } from 'react'
import { makeStyles } from '@mui/styles'
import WrapContent from './WrapContent'
import { Bar } from 'react-chartjs-2'
import { getColor } from 'utils'

const chartOptions = {
  responsive: true,
  legend: {
    display: false,
  },
  type: 'bar',
  scales: {
    xAxes: [
      {
        stacked: true,
      },
    ],
    yAxes: [
      {
        stacked: true,
      },
    ],
  },
}

const chartTypes = [
  {
    value: 'cases',
    label: 'Ca nhiễm',
  },
  {
    value: 'recovered',
    label: 'Hồi phục',
  },
  {
    value: 'death',
    label: 'Tử vong',
  },
]

const VietnamCaseChart = ({ overview, isLoading }) => {
  const [chartType, setChartType] = useState(() => chartTypes[0].value)

  const classes = useStyles()

  const vietnamCaseChart = useMemo(() => {
    return {
      labels: overview.map((item) => `${item.date}-2022`),
      datasets: [
        {
          label: chartTypes.find(
            (chartTypeItem) => chartTypeItem.value === chartType
          ).label,
          backgroundColor: getColor(
            chartType === 'cases'
              ? 'confirmed'
              : chartType === 'recovered'
              ? 'recovered'
              : 'deaths'
          ),
          borderColor: '#363636',
          borderWidth: 1,
          stack: 1,
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: overview.map((item) => item[chartType]),
        },
      ],
    }
  }, [overview, chartType])

  const onChartTypeChange = (event) => {
    const newChartType = event.target.value

    setChartType(newChartType)
  }

  return (
    <WrapContent className={classes.vietnamCaseChart} isLoading={isLoading}>
      <select className={classes.selectChartType} onChange={onChartTypeChange}>
        {chartTypes.map((chartTypeItem) => (
          <option key={chartTypeItem.value} value={chartTypeItem.value}>
            {chartTypeItem.label}
          </option>
        ))}
      </select>
      <Bar
        data={vietnamCaseChart}
        width={null}
        height={null}
        options={chartOptions}
      />
    </WrapContent>
  )
}

const useStyles = makeStyles({
  vietnamCaseChart: {
    marginTop: 12,
    position: 'relative',
    marginBottom: 12,
  },
  selectChartType: {
    position: 'absolute',
    left: 58,
    color: '#bdbdbd',
    backgroundColor: '#212121',
  },
})

export default VietnamCaseChart
