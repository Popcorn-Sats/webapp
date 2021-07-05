import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Formik, Field } from 'formik'
import DatePicker from 'react-datepicker'
import Server from '../../utils/server'
import { Modal, ModalHeader, ModalBody, ModalFooter, Button, Input, Label, Select, Textarea } from '@windmill/react-ui'

import "react-datepicker/dist/react-datepicker.css";

function AddAccount(props) {
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
          Add Account
          <span className="ml-2" aria-hidden="true">
            +
          </span>
        </Button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
            <Formik
                initialValues={
                    { 
                        xpub: '',
                        name: '', 
                        notes: '',
                        birthday: '',
                        accountType: '' 
                    }
                }
                validate={values => {
                    const errors = {};
                    if (!values.xpub) {
                        errors.xpub = 'Required';
                    } 
                    if (!values.name) {
                        errors.name = 'Required';
                    }
                    if (!values.birthday) {
                        errors.birthday = 'Required';
                    }
                    if (!values.accountType) {
                        errors.accountType = 'Required';
                    }
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        Server.newAccount(JSON.stringify(values, null, 2));
                        setSubmitting(false);
                        closeModal();
                        history.push('/app/accounts');
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
                        <ModalHeader>Add account</ModalHeader>
                        <ModalBody>
                            <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">

                                <Label>
                                    <span>Account name</span>
                                    <Input 
                                        className="mt-1" 
                                        placeholder="Wasabi Wallet" 
                                        name="name" 
                                        id="name" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.name} 
                                    />
                                    {errors.name && touched.name && errors.name}
                                </Label>

                                <Label>
                                    <span>Public Key</span>
                                    <Input 
                                        className="mt-1" 
                                        placeholder="xpub5hjgms...98fgdbjnfg" 
                                        name="xpub" 
                                        id="xpub" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.xpub} 
                                    />
                                    
                                    {errors.xpub && touched.xpub && errors.xpub}
                                </Label>

                                <div className="mt-4">
                                    {/* TODO: Check if this label is accessible, or fallback */}
                                    {/* <span className="text-sm text-gray-700 dark:text-gray-400">Account Type</span> */}
                                    <Label id="accounttype-group">Account Type</Label>
                                    <div role="group" aria-labelledby="accounttype-group" className="mt-2">
                                        <Label radio>
                                            <Field 
                                                type="radio" 
                                                name="accountType"
                                                value="1"
                                            />
                                            <span className="ml-2">Hot wallet</span>
                                        </Label>
                                        <Label className="ml-6" radio>
                                            <Field 
                                                type="radio" 
                                                name="accountType" 
                                                value="2" 
                                            />
                                            <span className="ml-2">Vault</span>
                                        </Label>
                                        <Label className="ml-6" radio>
                                            <Field 
                                                disabled
                                                type="radio" 
                                                name="accountType" 
                                                value="5" 
                                            />
                                            <span className="ml-2">Lightning (soon™)</span>
                                        </Label>
                                        {errors.accountType && touched.accountType && errors.accountType}
                                    </div>
                                </div>

                                {/* TODO: DATEPICKER */}
                                <Label className="mt-4">
                                    <span>Wallet Birthday</span>
                                    {/*<DatePicker
                                        className="mt-1" 
                                        name="birthday" 
                                        id="birthday"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.birthday} 
                                    />*/}
                                    <Input 
                                        className="mt-1" 
                                        placeholder="TODO: Datepicker. Format: Date e.g 12/12/2012" 
                                        name="birthday" 
                                        id="birthday" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.birthday} 
                                    />
                                    {errors.birthday && touched.birthday && errors.birthday}
                                </Label>

                                <Label className="mt-4">
                                    <span>Notes</span>
                                    <Textarea 
                                        className="mt-1" 
                                        rows="3" 
                                        placeholder="Write any useful information about your account here." 
                                        name="notes" 
                                        id="notes" 
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.notes} 
                                    />
                                    {errors.notes && touched.notes && errors.notes}
                                </Label>
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
                                <Button type="submit" disabled={isSubmitting}>Create Account</Button>
                            </div>
                            <div className="block w-full sm:hidden">
                                <Button block size="large" layout="outline" onClick={closeModal}>
                                    Cancel
                                </Button>
                            </div>
                            <div className="block w-full sm:hidden">
                                <Button block size="large" type="submit" disabled={isSubmitting}>
                                    Create Account
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

export default AddAccount