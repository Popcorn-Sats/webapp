import React, { useState, useEffect } from 'react'
import { Category } from './Category'
import SectionTitle from '../components/Typography/SectionTitle'

import {
    TableBody,
    TableContainer,
    Table,
    TableHeader,
    TableCell,
    TableFooter,
    Pagination,
  } from '@windmill/react-ui'

function Categories (props) {
    // setup pages control for every table
    const [page, setPage] = useState(1)
    const [data, setData] = useState([])

    // pagination setup
    const resultsPerPage = 10
    const totalResults = props.categories.length

    // pagination change control
    function onPageChange(p) {
        setPage(p)
    }

    // on page change, load new sliced data
    // here you would make another server request for new data
    useEffect(() => {
        setData(props.categories.slice((page - 1) * resultsPerPage, page * resultsPerPage))
    }, [page])

        return (
            <TableContainer>
                <SectionTitle>Transaction Categories</SectionTitle>
                <Table>
                    <TableHeader>
                        <tr>
                        <TableCell>Category</TableCell>
                        <TableCell>Balance</TableCell>
                        <TableCell>Actions</TableCell>
                        </tr>
                    </TableHeader>
                    <TableBody>
                        {
                            props.categories.map(category => {
                                return <Category key={category.id} category={category} savedCategory={category} />
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

    export default Categories