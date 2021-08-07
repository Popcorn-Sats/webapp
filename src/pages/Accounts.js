import React from 'react'

import PageTitle from '../components/Typography/PageTitle'
import Accounts from '../components/Accounts'
import Payees from '../components/Payees'
import Server from '../services/server'

export default class AccountsView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      accounts: []
    }
    //this.getTransactions = this.getTransactions.bind(this)
  }
  componentDidMount() {
    Server.accounts().then(accounts => {
      this.setState({accounts: accounts})
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
        <PageTitle>My Accounts</PageTitle>
        <Accounts accounts={this.state.accounts} /> 
        <PageTitle>Payees</PageTitle>
        <Payees accounts={this.state.accounts} /> 
      </>
    );
  }
}