const Server = {
    transactions() {
        return fetch(
            `http://localhost:2121/transactions`
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if (jsonResponse) {
                return jsonResponse.map(transaction => {
                    return {
                        id: transaction.id,
                        description: transaction.description,
                        category: transaction.category,
                        payee: transaction.payee,
                        block: transaction.block,
                        txid: transaction.txid,
                        balance_change: transaction.balance_change,
                        account: transaction.account,
                        address: transaction.address,
                        network_fee: transaction.network_fee,
                        size: transaction.size,
                        transactiontype: transaction.transactiontype,
                        transactionledgers: transaction.transactionledgers
                    }
                })
            }
        })
    },
    editTransaction(data) {
        console.log(data)
        const jsonData = JSON.stringify(data)
        return fetch(
            `http://localhost:2121/transactions`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            }
        ).then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    },
    newTransaction(data) {
        return fetch(
            'http://localhost:2121/transactions/add', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }
        ).then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    },
    accounts() {
        return fetch(
            `http://localhost:2121/accounts`
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if (jsonResponse) {
                return jsonResponse.map(account => {
                    return {
                        id: account.id,
                        name: account.name,
                        notes: account.notes,
                        birthday: account.birthday,
                        accounttype: account.accounttype,
                        xpub: account.xpub,
                        owned: account.owned
                    }
                })
            }
        })
    },
    newAccount(data) {
        return fetch(
            'http://localhost:2121/accounts/add', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }
        ).then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    },
    editAccount(data) {
        console.log(data)
        const jsonData = JSON.stringify(data)
        return fetch(
            `http://localhost:2121/accounts`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            }
        ).then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    },
    // TODO
    deleteAccount(data) {
        return fetch(
            `http://localhost:2121/accounts/delete?id=$data.props.id`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }
        ).then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    },
    /* 
    --------------------
    Categories API calls
    --------------------
    */
    categories() {
        return fetch(
            `http://localhost:2121/categories`
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if (jsonResponse) {
                return jsonResponse.map(category => {
                    return {
                        id: category.id,
                        name: category.name,
                        balance: category.balance
                    }
                })
            }
        })
    },
    // TODO
    newCategory(data) {
        return fetch(
            'http://localhost:2121/accounts/add', 
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }
        ).then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    },
    // TODO
    editCategory(data) {
        console.log(data)
        const jsonData = JSON.stringify(data)
        return fetch(
            `http://localhost:2121/accounts`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            }
        ).then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    },
    // TODO
    deleteCategory(data) {
        return fetch(
            `http://localhost:2121/accounts/delete?id=$data.props.id`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: data,
            }
        ).then(response => response.json())
        .then(data => {
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
    },
    // TODO
    search(term) {
        return fetch(
            `http://localhost:2121/search?term=${term}`
        ).then(response => {
            return response.json()
        }).then(jsonResponse => {
            if (jsonResponse.transactions) {
                return jsonResponse.transactions.map(transaction => {
                    return {
                        id: transaction.id,
                        description: transaction.description,
                        category: transaction.category,
                        payee: transaction.payee,
                        block_height: transaction.block_height,
                        txid: transaction.txid,
                        balance_change: transaction.balance_change,
                        account: transaction.account,
                        address: transaction.address,
                        fee: transaction.fee,
                        size: transaction.size
                    }
                })
            }
        })
    }
}

export default Server