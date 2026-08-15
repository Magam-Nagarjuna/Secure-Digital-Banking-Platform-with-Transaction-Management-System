import axios from "axios";

const BASE_URL = "http://localhost:9797/fincore";
const LOAN_URL = `${BASE_URL}/loan`;
const APPLICATION_URL = `${BASE_URL}/loan-applications`;

const config = { withCredentials: true };

// ---------------- Loan schemes ----------------
export const addLoan = (loan) => axios.post(LOAN_URL, loan, config);
export const updateLoan = (loan) => axios.put(LOAN_URL, loan, config);
export const getLoanById = (loanId) => axios.get(`${LOAN_URL}/${loanId}`, config);
export const getLoans = () => axios.get(LOAN_URL, config);
export const deleteLoanById = (loanId) => axios.delete(`${LOAN_URL}/${loanId}`, config);
export const generateLoanId = () => axios.get(`${BASE_URL}/loan-id`, config);
export const getActiveLoans = () => axios.get(`${BASE_URL}/loan-list`, config);
export const getLoansByStatus = (status) => axios.get(`${BASE_URL}/loan-status/${status}`, config);

// ---------------- Loan applications ----------------
export const applyForLoan = (application) => axios.post(APPLICATION_URL, application, config);
export const getLoanApplications = () => axios.get(APPLICATION_URL, config);
export const getLoanApplicationById = (applicationId) =>
    axios.get(`${APPLICATION_URL}/${applicationId}`, config);
export const getLoanApplicationsByStatus = (status) =>
    axios.get(`${APPLICATION_URL}/status/${status}`, config);
export const getLoanApplicationsByCustomer = (customerId) =>
    axios.get(`${APPLICATION_URL}/customer/${customerId}`, config);
export const getLoanApplicationsByAccount = (accountNumber) =>
    axios.get(`${APPLICATION_URL}/account/${accountNumber}`, config);
export const approveLoanApplication = (applicationId) =>
    axios.put(`${APPLICATION_URL}/${applicationId}/approve`, {}, config);
export const rejectLoanApplication = (applicationId, reason) =>
    axios.put(`${APPLICATION_URL}/${applicationId}/reject`, { reason }, config);
export const generateLoanApplicationId = () =>
    axios.get(`${BASE_URL}/loan-application-id`, config);

// ---------------- Repayments ----------------
export const repayLoan = (applicationId, repayment) =>
    axios.post(`${APPLICATION_URL}/${applicationId}/repayments`, repayment, config);
export const getLoanRepayments = (applicationId) =>
    axios.get(`${APPLICATION_URL}/${applicationId}/repayments`, config);
export const getCustomerLoanRepayments = (customerId) =>
    axios.get(`${BASE_URL}/loan-repayments/customer/${customerId}`, config);
export const getAccountLoanRepayments = (accountNumber) =>
    axios.get(`${BASE_URL}/loan-repayments/account/${accountNumber}`, config);
export const generateLoanRepaymentId = () =>
    axios.get(`${BASE_URL}/loan-repayment-id`, config);
