import axios from 'axios';

const BASE_URL = 'http://localhost:9797/fincore';

const LOGIN_URL = `${BASE_URL}/login`;
const ROLE_URL = `${BASE_URL}/role`;
const LOGOUT_URL = `${BASE_URL}/logout`;
const USR_URL = `${BASE_URL}/user`;

export const registerNewUser = (user) => {
    return axios.post(LOGIN_URL, user, {
        withCredentials: true
    });
};

export const validateUser = (userId, password) => {
    return axios.get(`${LOGIN_URL}/${userId}/${password}`, {
        withCredentials: true
    });
};

export const getUserDetails = () => {
    return axios.get(LOGIN_URL, {
        withCredentials: true
    });
};

export const getRole = () => {
    return axios.get(ROLE_URL, {
        withCredentials: true
    });
};

export const getUserId = () => {
    return axios.get(USR_URL, {
        withCredentials: true
    });
};

export const logoutUser = () => {
    return axios.post(
        LOGOUT_URL,
        {},
        {
            withCredentials: true
        }
    );
};



export const addLoan = (loan) => {
    return axios.post(`${BASE_URL}/loan`, loan, {
        withCredentials: true
    });
};


export const updateLoan = (loan) => {
    return axios.put(`${BASE_URL}/loan`, loan, {
        withCredentials: true
    });
};


export const getLoanById = (loanId) => {
    return axios.get(`${BASE_URL}/loan/${loanId}`, {
        withCredentials: true
    });
};


export const getLoans = () => {
    return axios.get(`${BASE_URL}/loan`, {
        withCredentials: true
    });
};


export const deleteLoanById = (loanId) => {
    return axios.delete(`${BASE_URL}/loan/${loanId}`, {
        withCredentials: true
    });
};


export const getActiveLoans = () => {
    return axios.get(`${BASE_URL}/loan-list`, {
        withCredentials: true
    });
};


export const generateLoanId = () => {
    return axios.get(`${BASE_URL}/loan-id`, {
        withCredentials: true
    });
};


export const getLoansByStatus = (status) => {
    return axios.get(`${BASE_URL}/loan-status/${status}`, {
        withCredentials: true
    });
};



export const applyForLoan = (application) => {
    return axios.post(
        `${BASE_URL}/loan-applications`,
        application,
        {
            withCredentials: true
        }
    );
};


export const getLoanApplications = () => {
    return axios.get(
        `${BASE_URL}/loan-applications`,
        {
            withCredentials: true
        }
    );
};


export const getLoanApplicationById = (applicationId) => {
    return axios.get(
        `${BASE_URL}/loan-applications/${applicationId}`,
        {
            withCredentials: true
        }
    );
};


export const getLoanApplicationsByStatus = (status) => {
    return axios.get(
        `${BASE_URL}/loan-applications/status/${status}`,
        {
            withCredentials: true
        }
    );
};


export const getLoanApplicationsByCustomer = (customerId) => {
    return axios.get(
        `${BASE_URL}/loan-applications/customer/${customerId}`,
        {
            withCredentials: true
        }
    );
};


export const getLoanApplicationsByAccount = (accountNumber) => {
    return axios.get(
        `${BASE_URL}/loan-applications/account/${accountNumber}`,
        {
            withCredentials: true
        }
    );
};


export const approveLoanApplication = (applicationId) => {
    return axios.put(
        `${BASE_URL}/loan-applications/${applicationId}/approve`,
        {},
        {
            withCredentials: true
        }
    );
};


export const rejectLoanApplication = (applicationId, reason) => {
    return axios.put(
        `${BASE_URL}/loan-applications/${applicationId}/reject`,
        {
            reason: reason
        },
        {
            withCredentials: true
        }
    );
};



export const repayLoan = (applicationId, repayment) => {
    return axios.post(
        `${BASE_URL}/loan-applications/${applicationId}/repayments`,
        repayment,
        {
            withCredentials: true
        }
    );
};


export const getLoanRepayments = (applicationId) => {
    return axios.get(
        `${BASE_URL}/loan-applications/${applicationId}/repayments`,
        {
            withCredentials: true
        }
    );
};


export const getLoanRepaymentsByCustomer = (customerId) => {
    return axios.get(
        `${BASE_URL}/loan-repayments/customer/${customerId}`,
        {
            withCredentials: true
        }
    );
};



export const generateApplicationId = () => {
    return axios.get(
        `${BASE_URL}/loan-application-id`,
        {
            withCredentials: true
        }
    );
};


export const generateRepaymentId = () => {
    return axios.get(
        `${BASE_URL}/loan-repayment-id`,
        {
            withCredentials: true
        }
    );
};
