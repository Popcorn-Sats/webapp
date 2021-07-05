import React, { useState, useEffect } from 'react'
import { Account } from './Account'

import {
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableFooter,
    Pagination,
  } from '@windmill/react-ui'

function Accounts (props) {
    // setup pages control for every table
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])

    // pagination setup
    const resultsPerPage = 10
    const totalResults = props.accounts.length

    // pagination change control
    function onPageChange(p) {
        setPage(p)
    }

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        setData(props.accounts.slice((page - 1) * resultsPerPage, page * resultsPerPage))
    }, [page])

        return (
            <TableContainer>
                <Table>
                    <TableHeader>
                        <tr>
                        <TableCell>Name</TableCell>
                        <TableCell>Notes</TableCell>
                        <TableCell>XPub</TableCell>
                        <TableCell>Account Type</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {
                            props.accounts.map(account => {
                                if (account.owned) {
                                    return <Account key={account.id} account={account} savedAccount={account} /> 
                                }
                            })
                        }
                    </TableBody>
                </Table>
                <TableFooter>
                    <Pagination
                        totalResults={totalResults}
                        resultsPerPage={resultsPerPage}
                        label="Table navigation"
                        onChange={onPageChange}
                    />
                </TableFooter>
            </TableContainer>
        )
    }

    export default Accounts