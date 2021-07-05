import React from 'react'

import ChartCard from '../Chart/ChartCard'
import { Doughnut } from 'react-chartjs-2'
import ChartLegend from '../Chart/ChartLegend'

function Expenses (props) {

  const expensesData = props.categories

    return (
      <>      
          <ChartCard title="Expenses">
            <Doughnut {...expensesData} />
            <ChartLegend legends={expensesData.labels} />
          </ChartCard>
      </>
    )
}

export default Expenses