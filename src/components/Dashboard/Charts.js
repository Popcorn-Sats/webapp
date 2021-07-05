import React from 'react'

import ChartCard from '../Chart/ChartCard'
import ChartLegend from '../Chart/ChartLegend'
import { Doughnut, Line } from 'react-chartjs-2'
import {
    doughnutOptions,
    lineOptions,
    doughnutLegends,
    lineLegends,
  } from '../../utils/demo/chartsData'

  export class Charts extends React.Component {
      render() {
          return (
            <div className="grid gap-6 mb-8 md:grid-cols-2">
                <ChartCard title="Expense categories">
                <Doughnut {...doughnutOptions} />
                <ChartLegend legends={doughnutLegends} />
                </ChartCard>
        
                <ChartCard title="Balance">
                <Line {...lineOptions} />
                <ChartLegend legends={lineLegends} />
                </ChartCard>
            </div>
          )
      }
  }