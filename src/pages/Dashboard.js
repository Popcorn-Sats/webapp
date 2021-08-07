import React from 'react'

import PageTitle from '../components/Typography/PageTitle'
import Transactions from '../components/Transactions'
import BlockHeight from '../components/Dashboard/BlockHeight'
import AccountBalance from '../components/Dashboard/TotalBalance'
import New from '../components/Dashboard/New'
import Unconfirmed from '../components/Dashboard/Unconfirmed'
import { Charts } from '../components/Dashboard/Charts'
import Server from '../services/server'

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      transactions: []
    }
    //this.getTransactions = this.getTransactions.bind(this)
  }
  componentDidMount() {
    Server.transactions().then(transactions => {
      this.setState({transactions: transactions})
    })
  }
  /*getTransactions() {
    Server.transactions().then(transactions => {
      this.setState({transactions: transactions})
    })
  }*/
  render() {
    return (
      <>
        {/*<SearchBar searchYelp={this.searchYelp} />*/}
        <PageTitle>Dashboard</PageTitle>
        <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
          <BlockHeight />
          <Unconfirmed />
          <AccountBalance />
          <New />
        </div>
        <Charts />
        <Transactions transactions={this.state.transactions} /> 
      </>
    );
  }
}