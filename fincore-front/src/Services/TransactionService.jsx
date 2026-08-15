import axios from 'axios';

const BASE_URL = 'http://localhost:9797/fincore';

const TR_URL = `${BASE_URL}/trans`;
const TINFO_URL = `${BASE_URL}/trans-info`;

// Add Transaction
export const addTransaction = (transaction) => {
    return axios.post(TR_URL, transaction, {
        withCredentials: true
    });
};

// Generate Transaction ID
export const generateTransactionId = () => {
    return axios.get(TINFO_URL, {
        withCredentials: true
    });
};

// Get All Transactions
export const getAllTransactions = () => {
    return axios.get(TR_URL, {
        withCredentials: true
    });
};

// Get Transaction By ID
export const getTransactionById = (transactionId) => {
    return axios.get(`${TR_URL}/${transactionId}`, {
        withCredentials: true
    });
};

// Delete Transaction
export const deleteTransactionById = (transactionId) => {
    return axios.delete(`${TR_URL}/${transactionId}`, {
        withCredentials: true
    });
};

// Get Transactions By Customer
export const getTransactionsByCustomer = (customerId) => {
    return axios.get(`${TR_URL}/customer/${customerId}`, {
        withCredentials: true
    });
};

// Get Transactions By Account
export const getTransactionsByAccount = (accountNumber) => {
    return axios.get(`${TR_URL}/account/${accountNumber}`, {
        withCredentials: true
    });
};

// Get Transactions By Type
export const getTransactionsByType = (type) => {
    return axios.get(`${TR_URL}/type/${type}`, {
        withCredentials: true
    });
};