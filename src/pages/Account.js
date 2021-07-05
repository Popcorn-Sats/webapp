import React from 'react'

import PageTitle from '../components/Typography/PageTitle'
import Transactions from '../components/Transactions'
import Server from '../utils/server'

export default class Wallet extends React.Component {
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
        <PageTitle>Account View</PageTitle>
        <Transactions transactions={this.state.transactions} /> 
      </>
    );
  }
}