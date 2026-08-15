import axios from 'axios';

const AC_URL='http://localhost:9797/fincore/account';
const AINFO_URL='http://localhost:9797/fincore/account-info';
const BINFO_URL='http://localhost:9797/fincore/balance-info';
const ID_URL='http://localhost:9797/fincore/account';

const LIST_URL='http://localhost:9797/fincore/id-list';

	
export const addAccount = (account) => {
    return axios.post(AC_URL, account, {
        withCredentials: true
    });
};


export const updateAccount = (account) => {
    return axios.put(AC_URL, account, {
        withCredentials: true
    });
};


export const getAccountByNumber = (accountNumber) => {
    return axios.get(`${ID_URL}/${accountNumber}`, {
        withCredentials: true
    });
};


export const getAccounts = () => {
    return axios.get(AC_URL, {
        withCredentials: true
    });
};

export const getAllAccountNumbers = () => {
    return getAccounts().then((response) => {
        let data = response?.data;

        if (Array.isArray(data)) {
            // API already returned the account list.
        }
        else if (data && Array.isArray(data.content)) {
            data = data.content;
        }
        else if (data && Array.isArray(data.data)) {
            data = data.data;
        }
        else if (data && Array.isArray(data.accounts)) {
            data = data.accounts;
        }
        else if (data && Array.isArray(data.result)) {
            data = data.result;
        }
        else {
            data = [];
        }

        const accountNumbers = data
            .map((account) =>
                account?.accountNumber ??
                account?.accountNo ??
                account?.account_number ??
                account?.number ??
                account?.accountId
            )
            .filter((accountNumber) =>
                accountNumber !== null &&
                accountNumber !== undefined &&
                String(accountNumber).trim() !== ""
            );

        response.data = [...new Set(accountNumbers.map(String))];

        return response;
    });
};


export const deleteAccountByNumber = (accountNumber) => {
    return axios.delete(`${AC_URL}/${accountNumber}`, {
        withCredentials: true
    });
};


export const generateAccountNumber = () => {
    return axios.get(AINFO_URL, {
        withCredentials: true
    });
};


export const getAccountsByCustomerId = (customerId) => {
    return axios.get(`${AINFO_URL}/${customerId}`, {
        withCredentials: true
    });
};


export const getBalanceByAccountNumber = (accountNumber) => {
    return axios.get(`${BINFO_URL}/${accountNumber}`, {
        withCredentials: true
    });
}
export const getAccountIdsByCustomerId = () => {
        return axios.get(LIST_URL, {
            withCredentials: true
        });
    };
