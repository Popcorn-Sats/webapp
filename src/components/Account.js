import React from 'react'
import { Link } from 'react-router-dom'
import { EditIcon, DropdownIcon, TrashIcon } from '../icons'
import Server from '../services/server'

import {
    TableCell,
    TableRow,
    Button,
    Input,
  } from '@windmill/react-ui'

export class Account extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editView: false,
      account: this.props.account,
      savedAccount: this.props.savedAccount
    }
    this.onEditButtonClicked = this.onEditButtonClicked.bind(this)
    this.onSubmitButtonClicked = this.onSubmitButtonClicked.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)

    this.updateName = this.updateName.bind(this);
    this.updateNotes = this.updateNotes.bind(this);
    this.updateType = this.updateType.bind(this);
    this.getAccountType = this.getAccountType.bind(this);
  }

  hasAllRequiredFields() {
    const account = this.state.account;
    if (!account.name || !account.accounttype) {
      return false;
    }
    return true;
  }

  hasChanges() {
    const account = this.state.account;
    const savedAccount = this.state.savedAccount;
    if (!savedAccount) {
      return false;
    }

    if (account.name === savedAccount.name &&
        account.notes === savedAccount.notes &&
        account.accounttype === savedAccount.accounttype) {
      return false;
    }

    return true;
  }

  onEditButtonClicked(){
    //console.log(this.state.account.name)
    this.setState({
      editView: !this.state.editView
    })
  }

  updateName(event) {
    const account = JSON.parse(JSON.stringify(this.state.account))
    account.name = event.target.value
    this.setState({account: account})
    console.log(this.state.account.name)
  }

  updateNotes(event) {
    const account = JSON.parse(JSON.stringify(this.state.account))
    account.notes = event.target.value
    this.setState({account: account})
  }

  updateType(event) {
    const account = JSON.parse(JSON.stringify(this.state.account))
    account.accounttype = event.target.value
    this.setState({account: account})
  }

  cancelEdit() {
    this.setState({
      account: this.state.savedAccount,
      editView: !this.state.editView
    })
  }

  onSubmitButtonClicked() {
    Server.editAccount(JSON.parse(JSON.stringify(this.state.account))).then(account => {
      this.setState({
        savedAccount: this.state.account,
        editView: !this.state.editView
      })
    })
  }

  getAccountType(typeId) {
    let accountType = typeId
    switch (accountType) {
      case 1:
        return 'Hot Wallet';
      case 2: 
        return 'Vault';
      case 3:
        return 'Expense';
      case 4:
        return 'Income';
      default:
        return '';
    }
  }

  renderButtons() {
    let saveButton, cancelButton

    if (this.hasChanges() && this.hasAllRequiredFields()){
      saveButton = <Button aria-label="Delete" block size="small" onClick={this.onSubmitButtonClicked}>Save</Button>
    } else {
      saveButton = <Button disabled aria-label="Delete" block size="small" onClick={this.onSubmitButtonClicked}>Save</Button>
    }

    if (this.hasChanges()) {
      // TODO: need to revert state on cancel
      cancelButton = <Button layout="outline" aria-label="Cancel" onClick={this.cancelEdit} block size="small">Cancel</Button>
    } else {
      cancelButton = <Button layout="outline" aria-label="Cancel" onClick={this.onEditButtonClicked} block size="small">Cancel</Button>
    }

    return (
      <div className="flex items-center space-x-4">
        {saveButton}
        {cancelButton}
      </div>
    )
  }
    
  render() {
      const editClicked = this.state.editView
      if (editClicked) {
        return (
          <TableRow key={this.props.account.id}>
                <TableCell>
                  <Input 
                    className="text-sm"
                    value={this.state.account.name}
                    onChange={this.updateName}
                  />
                </TableCell>
                <TableCell>
                  <Input 
                    className="text-sm"
                    value={this.state.account.notes}
                    onChange={this.updateNotes}
                  />
                </TableCell>
                <TableCell>
                  <span className="text-sm">{this.state.account.xpub.name}</span>
                </TableCell>
                <TableCell>
                  <Input 
                    className="text-sm"
                    value={this.state.account.accounttype}
                    onChange={this.updateType}
                    //placeholder={this.getAccountType(this.props.account.accounttype)}
                  />
                </TableCell>
                <TableCell>
                  <span className="text-sm">{this.props.account.balance} sats</span>
                </TableCell>
                <TableCell>
                    {this.renderButtons()}
                </TableCell>
              </TableRow>
        )
      }

        return (
            <TableRow key={this.props.account.id}>
                <TableCell>
                <Link to="/app/account">
                <span className="text-sm">{this.state.account.name}</span>
                </Link>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{this.state.account.notes}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{this.state.account.xpub.name}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{this.getAccountType(this.state.account.accounttype)}</span>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{this.props.account.balance} sats</span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-4">
                    <Button layout="link" size="icon" aria-label="Delete">
                      <DropdownIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Edit" onClick={this.onEditButtonClicked}>
                      <EditIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                    <Button layout="link" size="icon" aria-label="Delete">
                      <TrashIcon className="w-5 h-5" aria-hidden="true" />
                    </Button>
                  </div>
                </TableCell>
                {/* To Add In Dropdown
              
                <TableCell>
                  <span className="text-sm">{this.props.account.xpub}</span>
                </TableCell>

                <TableCell>
                  <span className="text-sm">{new Date(this.props.account.birthday).toLocaleDateString()}</span>
                </TableCell>
              
              */}
              </TableRow>
              
        )
    }
}