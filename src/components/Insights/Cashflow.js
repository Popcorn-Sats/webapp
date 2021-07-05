import React from 'react'

import ChartCard from '../Chart/ChartCard'
import { Bar } from 'react-chartjs-2'
import ChartLegend from '../Chart/ChartLegend'
import {
  barOptions,
  barLegends,
} from '../../utils/demo/chartsData'

function Cashflow() {

  return (
    <>
        <ChartCard title="Cashflow">
          <Bar {...barOptions} />
          <ChartLegend legends={barLegends} />
        </ChartCard>
    </>
  )
}

export default Cashflow
