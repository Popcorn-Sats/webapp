import React from 'react'
import { EditIcon, DropdownIcon, TrashIcon } from '../icons'
import Server from '../services/server'

import {
    TableCell,
    TableRow,
    Button,
    Input,
  } from '@windmill/react-ui'

export class Category extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editView: false,
      category: this.props.category,
      savedCategory: this.props.savedCategory
    }
    this.onEditButtonClicked = this.onEditButtonClicked.bind(this)
    this.onSubmitButtonClicked = this.onSubmitButtonClicked.bind(this)
    this.cancelEdit = this.cancelEdit.bind(this)

    this.updateName = this.updateName.bind(this);
  }

  hasAllRequiredFields() {
    const category = this.state.category;
    if (!category.name) {
      return false;
    }
    return true;
  }

  hasChanges() {
    const category = this.state.category;
    const savedCategory = this.state.savedCategory;
    if (!savedCategory) {
      return false;
    }

    if (category.name === savedCategory.name) {
      return false;
    }

    return true;
  }

  onEditButtonClicked(){
    this.setState({
      editView: !this.state.editView
    })
  }

  updateName(event) {
    const category = JSON.parse(JSON.stringify(this.state.category))
    category.name = event.target.value
    this.setState({category: category})
    console.log(this.state.category.name)
  }

  cancelEdit() {
    this.setState({
      category: this.state.savedCategory,
      editView: !this.state.editView
    })
  }

  onSubmitButtonClicked() {
    Server.editCategory(JSON.parse(JSON.stringify(this.state.category))).then(category => {
      this.setState({
        savedCategory: this.state.category,
        editView: !this.state.editView
      })
    })
  }

  addCommas(nStr){
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
     x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
   }

  renderButtons() {
    let saveButton, cancelButton

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
          <TableRow key={this.props.category.id}>
                <TableCell>
                  <Input 
                    className="text-sm"
                    value={this.state.category.name}
                    onChange={this.updateName}
                  />
                </TableCell>
                <TableCell>
                  <span className="text-sm">{this.props.category.balance} sats</span>
                </TableCell>
                <TableCell>
                    {this.renderButtons()}
                </TableCell>
              </TableRow>
        )
      }

        return (
            <TableRow key={this.props.category.id}>
                <TableCell>
                    <p className="text-sm">{this.state.category.name}</p>
                </TableCell>
                <TableCell>
                  <span className="text-sm">{this.addCommas(this.props.category.balance)} sats</span>
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
              </TableRow>
              
        )
    }
}