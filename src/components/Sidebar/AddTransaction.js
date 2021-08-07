import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Field } from 'formik'
import Server from '../../services/server'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Select, Textarea } from '@windmill/react-ui'

import "react-datepicker/dist/react-datepicker.css";

function AddTransaction(props) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  let history = useHistory()

  function openModal() {
    setIsModalOpen(true)
  }

  function closeModal() {
    setIsModalOpen(false)
  }

  return (
      <div className="px-6 my-6">
        <Button onClick={openModal}>
          Add Transaction
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <Formik
                initialValues={
                    { 
                        blockHeight: '',
                        txid: '', 
                        balance_change: '',
                        address: '',
                        network_fee: '',
                        size: '',
                        description: '',
                        category: '',
                        sender: '',
                        recipient: ''
                    }
                }
                validate={values => {
                    const errors = {};
                    if (!values.balance_change) {
                        errors.balance_change = 'Required';
                    } 
                    if (!values.sender) {
                        errors.sender = 'Required';
                    }
                    if (!values.recipient) {
                        errors.recipient = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        Server.newTransaction(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        closeModal();
                        history.push('/app/wallet');
                        // TODO: make sure the accounts data pulls fresh from DB (actually, res should send new object back)
                    }, 400)
                }}
                
            >

                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */
                }) => (
                    <form onSubmit={handleSubmit}>
                        <ModalHeader>Add transaction</ModalHeader>
                        <ModalBody>
                            <div className="grid gap-6 mb-8 md:grid-cols-2 bg-white rounded-lg shadow-md dark:bg-gray-800">

                                <Label>
                                    <span>Sender</span>
                                    <Input 
                                        className="mt-1" 
                                        placeholder="Wasabi Wallet" 
                                        name="sender" 
                                        id="sender" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.sender} 
                                    />
                                    {errors.sender && touched.sender && errors.sender}
                                </Label>

                                <Label>
                                    <span>Recipient</span>
                                    <Input 
                                        className="mt-1" 
                                        placeholder="Citadel21" 
                                        name="recipient" 
                                        id="recipient" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.recipient} 
                                    />
                                    
                                    {errors.recipient && touched.recipient && errors.recipient}
                                </Label>

                                <Label className="mt-4">
                                    <span>Category</span>
                                    <Input 
                                        className="mt-1" 
                                        rows="3" 
                                        placeholder="Spending" 
                                        name="category" 
                                        id="category" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.category} 
                                    />
                                    {errors.category && touched.category && errors.category}
                                </Label>

                                <Label className="mt-4">
                                    <span>Balance Change (sats, incl. fee)</span>
                                    <Input 
                                        className="mt-1" 
                                        rows="3" 
                                        placeholder="123098" 
                                        name="balance_change" 
                                        id="balance_change" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.balance_change} 
                                    />
                                    {errors.balance_change && touched.balance_change && errors.balance_change}
                                </Label>

                                <Label className="mt-4">
                                    <span>Network Fee</span>
                                    <Input 
                                        className="mt-1" 
                                        rows="3" 
                                        placeholder="172" 
                                        name="network_fee" 
                                        id="network_fee" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.network_fee} 
                                    />
                                    {errors.network_fee && touched.network_fee && errors.network_fee}
                                </Label>

                                <Label className="mt-4">
                                    <span>Address</span>
                                    <Input 
                                        className="mt-1" 
                                        rows="3" 
                                        placeholder="123,098" 
                                        name="address" 
                                        id="address" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.address} 
                                    />
                                    {errors.address && touched.address && errors.address}
                                </Label>

                                <Label className="mt-4">
                                    <span>Size</span>
                                    <Input 
                                        className="mt-1" 
                                        rows="3" 
                                        placeholder="172" 
                                        name="size" 
                                        id="size" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.size} 
                                    />
                                    {errors.size && touched.size && errors.size}
                                </Label>

                                <Label className="mt-4">
                                    <span>Block Height</span>
                                    <Input 
                                        className="mt-1" 
                                        rows="3" 
                                        placeholder="123,098" 
                                        name="blockHeight" 
                                        id="blockHeight" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.blockHeight} 
                                    />
                                    {errors.blockHeight && touched.blockHeight && errors.blockHeight}
                                </Label>

                                <Label className="mt-4">
                                    <span>TXID</span>
                                    <Input 
                                        className="mt-1" 
                                        rows="3" 
                                        placeholder="172" 
                                        name="txid" 
                                        id="txid" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.txid} 
                                    />
                                    {errors.txid && touched.txid && errors.txid}
                                </Label>

                                <Label className="mt-4">
                                    <span>Description</span>
                                    <Input 
                                        className="mt-1" 
                                        rows="3" 
                                        placeholder="Write any useful information about your account here." 
                                        name="description" 
                                        id="description" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.description} 
                                    />
                                    {errors.description && touched.description && errors.description}
                                </Label>
                                <br />
                            </div>
                        </ModalBody>
                        <ModalFooter>
                            {/* I don't like this approach. Consider passing a prop to ModalFooter
                            * that if present, would duplicate the buttons in a way similar to this.
                            * Or, maybe find some way to pass something like size="large md:regular"
                            * to Button
                            */}
                            <div className="hidden sm:block">
                                <Button layout="outline" onClick={closeModal}>
                                    Cancel
                                </Button>
                            </div>
                            <div className="hidden sm:block">
                                <Button type="submit" disabled={isSubmitting}>Create Transaction</Button>
                            </div>
                            <div className="block w-full sm:hidden">
                                <Button block size="large" layout="outline" onClick={closeModal}>
                                    Cancel
                                </Button>
                            </div>
                            <div className="block w-full sm:hidden">
                                <Button block size="large" type="submit" disabled={isSubmitting}>
                                    Create Transaction
                                </Button>
                            </div>
                        </ModalFooter>
                    </form>
                )}
            </Formik>
        </Modal>
      </div>
  )
}

export default AddTransaction