import React from 'react'

import PageTitle from '../components/Typography/PageTitle'
import Expenses from '../components/Insights/Expenses'
import Cashflow from '../components/Insights/Cashflow'
import Balance from '../components/Insights/Balance'
import Categories from '../components/Categories'
import Server from '../utils/server'

export default class Insights extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categories: [],
      categoryGraphData: {
        data: {
          datasets: [
            {
              data: [],
              backgroundColor: ['#0694a2', '#1c64f2', '#7e3af2', '#0694a2', '#1c64f2', '#7e3af2'],
              label: 'Expense Categories',
            },
          ],
          labels: [],
        },
        options: {
          responsive: true,
          cutoutPercentage: 50,
        },
        legend: {
          display: true,
        },
        labels: [
          { name: 'Coinjoin', color: 'bg-blue-500' },
          { name: 'Fees', color: 'bg-teal-600' },
          { name: 'Hardware', color: 'bg-purple-600' },
        ]
      },
    }
  }
  componentDidMount() {
    Server.categories()
      .then(categories => {
        let a = this.state.categoryGraphData
        categories.forEach(category => {
          a.data.datasets[0].data.push(category.balance)
          a.data.labels.push(category.name)
        })
        this.setState({categoryGraphData: a})
        this.setState({categories: categories})
      })
  }

  render() {
    return (
      <>
        <PageTitle>Insights</PageTitle>
        <div className="grid gap-6 mb-8 md:grid-cols-2">
          <Categories categories={this.state.categories} />
          <Expenses categories={this.state.categoryGraphData} />
          <Cashflow />
          <Balance />
        </div>
      </>
    );
  }
}