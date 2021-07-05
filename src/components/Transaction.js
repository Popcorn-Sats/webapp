import React from 'react'
import { EditIcon, MenuIcon } from '../icons'
import Server from '../utils/server'

import {
    TableCell,
    TableRow,
    Button,
    Input,
  } from '@windmill/react-ui'

export class Transaction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editView: false,
      transaction: this.props.transaction,
      savedTransaction: this.props.savedTransaction
    }
    this.onEditButtonClicked = this.onEditButtonClicked.bind(this)
    this.onSubmitButtonClicked = this.onSubmitButtonClicked.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)

    this.updatePayee = this.updatePayee.bind(this);
    this.updateDescription = this.updateDescription.bind(this);
    this.updateCategory = this.updateCategory.bind(this);
  }

  hasAllRequiredFields() {
    const transaction = this.state.transaction;
    if (!transaction.payee || !transaction.category) {
      return false;
    }
    return true;
  }

  hasChanges() {
    const transaction = this.state.transaction;
    const savedTransaction = this.state.savedTransaction;
    if (!savedTransaction) {
      return false;
    }

    if (transaction.payee === savedTransaction.payee &&
        transaction.description === savedTransaction.description &&
        transaction.category === savedTransaction.category) {
      return false;
    }

    return true;
  }

  onEditButtonClicked(){
    this.setState({
      editView: !this.state.editView
    })
  }

  updatePayee(event) {
    const transaction = JSON.parse(JSON.stringify(this.state.transaction))
    transaction.payee = event.target.value
    this.setState({transaction: transaction})
    console.log(this.state.transaction.payee)
  }

  updateDescription(event) {
    const transaction = JSON.parse(JSON.stringify(this.state.transaction))
    transaction.description = event.target.value
    this.setState({transaction: transaction})
  }

  updateCategory(event) {
    const transaction = JSON.parse(JSON.stringify(this.state.transaction))
    transaction.category = event.target.value
    this.setState({transaction: transaction})
  }

  cancelEdit() {
    this.setState({
      transaction: this.state.savedTransaction,
      editView: !this.state.editView
    })
  }

  onSubmitButtonClicked() {
    Server.editTransaction(JSON.parse(JSON.stringify(this.state.transaction))).then(transaction => {
      this.setState({
        savedTransaction: this.state.transaction,
        editView: !this.state.editView
      })
    })
  }

  renderDescription() {
    let descriptionField
    if (this.state.transaction.description != null) {
      descriptionField = this.state.transaction.description
    } else if (this.state.transaction.txid) {
      descriptionField = `TXID: ${this.state.transaction.txid}`
    } else {
      descriptionField = "Manual transaction"
    }
    return (
      <span className="text-sm"> 
        {descriptionField}
      </span>
    )
  }

  renderSender() {
    let payeeField
    if (this.state.transaction.transactionledgers[1].accountId != null) {
      payeeField = this.state.transaction.transactionledgers[1].account.name
    } else if (this.state.transaction.transactionledgers[1].address) {
      payeeField = `Address: ${this.state.transaction.transactionledgers[1].address}`
    } else {
      payeeField = ""
    }
    return (
      <span className="text-sm"> 
        {payeeField}
      </span>
    )
  }

  renderRecipient() {
    let payeeField
    if (this.state.transaction.transactionledgers[0].accountId != null) {
      payeeField = this.state.transaction.transactionledgers[0].account.name
    } else if (this.state.transaction.transactionledgers[0].address) {
      payeeField = `Address: ${this.state.transaction.transactionledgers[0].address}`
    } else {
      payeeField = ""
    }
    return (
      <span className="text-sm"> 
        {payeeField}
      </span>
    )
  }

  renderButtons() {
    let saveButton, cancelButton, deleteButton

    if (this.hasChanges() && this.hasAllRequiredFields()){
      saveButton = <Button aria-label="Delete" block size="small" onClick={this.onSubmitButtonClicked}>Save</Button>
    } else {
      saveButton = <Button disabled aria-label="Delete" block size="small" onClick={this.onSubmitButtonClicked}>Save</Button>
    }

    if (this.hasChanges()) {
      // Note: need to revert state on cancel
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
        <TableRow key={this.props.transaction.id}>
          <TableCell>
            <span className="text-sm">{new Date(this.state.transaction.block.date).toLocaleDateString()}</span>
          </TableCell>
          <TableCell>
            <Input 
              className="text-sm"
              value={this.state.transaction.transactionledgers[1].account.name /*TODO: Find these objects by transactiontype in case order gets whacked*/}
              onChange={this.updatePayee}
            />
          </TableCell>
          <TableCell>
            <Input 
              className="text-sm"
              value={this.state.transaction.transactionledgers[0].account.name /*TODO: Catch if there are no transaction ledgers. This shouldn't happen, but need to just in case*/}
              onChange={this.updatePayee}
            />
          </TableCell>
          <TableCell>
            <Input 
              className="text-sm" 
              value={this.state.transaction.description} 
              onChange={this.updateDescription} 
            />
          </TableCell>
          <TableCell>
            <Input 
              className="text-sm"
              value={this.state.transaction.category.name}
              onChange={this.updateCategory}
            />
          </TableCell>
          <TableCell>
            <span className="text-sm">{this.props.transaction.balance_change} sats</span>
          </TableCell>
          <TableCell>
            {this.renderButtons()}
          </TableCell>
        </TableRow>
      )
    }

    return (
      <TableRow key={this.props.transaction.id}>
          <TableCell>
            <span className="text-sm">{new Date(this.state.transaction.block.date).toLocaleDateString()}</span>
          </TableCell>
          <TableCell>
            {this.renderSender()}
          </TableCell>
          <TableCell>
            {this.renderRecipient()}
          </TableCell>
          <TableCell>
            {this.renderDescription()}
          </TableCell>
          <TableCell>
            <span className="text-sm"> {this.state.transaction.category.name}</span>
          </TableCell>
          <TableCell>
            <span className="text-sm">{this.props.transaction.balance_change} sats</span>
          </TableCell>
          <TableCell>
            <div className="flex items-center space-x-4">
              <Button layout="link" size="icon" aria-label="Edit" onClick={this.onEditButtonClicked}>
                <EditIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button layout="link" size="icon" aria-label="Delete">
                <MenuIcon className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </TableCell>
        </TableRow>
      )
  }
}

// export default Transaction