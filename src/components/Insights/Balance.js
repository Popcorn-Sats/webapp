import React from 'react'

import ChartCard from '../Chart/ChartCard'
import { Line } from 'react-chartjs-2'
import ChartLegend from '../Chart/ChartLegend'
import {
  lineOptions,
  lineLegends,
} from '../../utils/demo/chartsData'

function Balance() {

  return (
    <>

        <ChartCard title="Account Balance">
          <Line {...lineOptions} />
          <ChartLegend legends={lineLegends} />
        </ChartCard>
    </>
  )
}

export default Balance
