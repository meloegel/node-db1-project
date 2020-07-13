const express = require('express');

const Accounts = require('../data/dbConfig.js');

const router = express.Router();

router.get('/', (req, res) => {
    Accounts.select('*')
        .from('accounts')
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            handleError(error)
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Accounts.select('*')
        .from('accounts')
        .where({ id })
        .first()
        .then(account => {
            res.status(200).json(account)
        })
        .catch(error => {
            handleError(error)
        })
})

router.post('/', validateAccount, (req, res) => {
    const accountData = req.body
    Accounts('accounts')
        .insert(accountData, 'id')
        .then(ids => {
            Accounts('accounts')
                .where({ id: ids[0] })
                .first()
                .then(account => {
                    res.status(200).json(account)
                })
                .catch(error => {
                    handleError(error)
                })
        })
})

router.put('/:id', (req, res) => {
    const changes = req.body
    const { id } = req.params
    Accounts.select('*')
        .from('accounts')
        .where({ id })
        .update(changes)
        .then(count => {
            if (count > 0) {
                res.status(200).json({ data: count })
            } else {
                res.status(404).json({ errorMessage: 'There is not record to update' })
            }
        })
        .catch(handleError)
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Accounts.select('*')
        .from('accounts')
        .where({ id })
        .del()
        .then(count => {
            if (count > 0) {
                res.status(200).json(count)
            } else {
                res.status(404).json({ errorMessage: 'No record to delete' })
            }
        })
        .catch(error => {
            handleError(error)
        })
})

function validateAccount(req, res, next) {
    if (!req.body) {
        res.status(400).json({ message: 'Missing Account Information' })
    } else if (!req.body.name || !req.body.budget) {
        res.status(400).json({ message: 'missing required field' })
    } else {
        next()
    }
}

function handleError(error) {
    console.log(error)
    res.status(500).json({ message: error.message })
}

module.exports = router;