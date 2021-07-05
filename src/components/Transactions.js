import React, { useState, useEffect } from 'react'
import { Transaction } from './Transaction'

import {
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableFooter,
    Pagination,
  } from '@windmill/react-ui'

function Transactions (props) {
    // setup pages control for every table
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])

    // pagination setup
    const resultsPerPage = 10
    const totalResults = props.transactions.length

    // pagination change control
    function onPageChange(p) {
        setPage(p)
    }

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        setData(props.transactions.slice((page - 1) * resultsPerPage, page * resultsPerPage))
    }, [page])

        return (
            <TableContainer>
                <Table>
                    <TableHeader>
                        <tr>
                        <TableCell>Date</TableCell>
                        <TableCell>From</TableCell>
                        <TableCell>To</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Category</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {
                            props.transactions.map(transaction => {
                                return <Transaction key={transaction.id} transaction={transaction} savedTransaction={transaction} />
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

    export default Transactions