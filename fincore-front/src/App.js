import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import LoginPage from './Components/LoginComponent/LoginPage';
import RegisterUser from './Components/LoginComponent/RegisterUser';

import AdminMenu from './Components/LoginComponent/AdminMenu';
import CustomerMenu from './Components/LoginComponent/CustomerMenu';

import CustomerEntry from './Components/LoginComponent/CustomerEntry';
import CustomerReport from './Components/LoginComponent/CustomerReport';
import PendingCustomerList from './Components/LoginComponent/PendingCustomerList';
import CustomerEdit from './Components/LoginComponent/CustomerEdit';

import TransactionEntry from './Components/AccountTransactionComponent/TransactionEntry';
import AccountEntry from './Components/AccountTransactionComponent/AccountEntry';
import AccountDetails from './Components/AccountTransactionComponent/AccountDetails';
import AccountList from './Components/AccountTransactionComponent/AccountList';

import TransactionReport from './Components/AccountTransactionComponent/TransactionReport.jsx';
import AdminTransactionReport from './Components/AccountTransactionComponent/AdminTransactionReport.jsx';

import LoanEntry from './Components/LoanComponent/LoanEntry';
import LoanList from './Components/LoanComponent/LoanList';
import LoanApplication from './Components/LoanComponent/LoanApplication';
import LoanApplications from './Components/LoanComponent/LoanApplications';
import LoanApplicationReview from './Components/LoanComponent/LoanApplicationReview';
import LoanRepayment from './Components/LoanComponent/LoanRepayment';


function App() {

    return (

        <div className="App">

            <BrowserRouter>

                <Routes>

                    {/* =========================
                        LOGIN / REGISTER
                    ========================= */}

                    <Route
                        path="/"
                        element={<LoginPage />}
                    />

                    <Route
                        path="/register"
                        element={<RegisterUser />}
                    />


                    {/* =========================
                        ADMIN
                    ========================= */}

                    <Route
                        path="/admin-menu"
                        element={<AdminMenu />}
                    />

                    <Route
                        path="/admin-transaction-report"
                        element={<AdminTransactionReport />}
                    />


                    {/* =========================
                        CUSTOMER
                    ========================= */}

                    <Route
                        path="/customer-menu"
                        element={<CustomerMenu />}
                    />

                    <Route
                        path="/transaction-report"
                        element={<TransactionReport />}
                    />


                    {/* =========================
                        CUSTOMER MANAGEMENT
                    ========================= */}

                    <Route
                        path="/customer-req"
                        element={<CustomerEntry />}
                    />

                    <Route
                        path="/customer-repo"
                        element={<CustomerReport />}
                    />

                    <Route
                        path="/pending-customer"
                        element={<PendingCustomerList />}
                    />

                    <Route
                        path="/customer-edit/:cid/:pno"
                        element={<CustomerEdit />}
                    />


                    {/* =========================
                        TRANSACTIONS
                    ========================= */}

                    {/* =========================
                        LOANS
                    ========================= */}
                    <Route path="/loan-list" element={<LoanList />} />
                    <Route path="/loan-add" element={<LoanEntry />} />
                    <Route path="/loan-edit/:loanId" element={<LoanEntry />} />
                    <Route path="/loan-apply/:loanId" element={<LoanApplication />} />
                    <Route path="/loan-applications" element={<LoanApplications />} />
                    <Route path="/loan-application-review" element={<LoanApplicationReview />} />
                    <Route path="/loan-repayment/:applicationId" element={<LoanRepayment />} />

                    <Route
                        path="/transaction-entry/:tno"
                        element={<TransactionEntry />}
                    />


                    {/* =========================
                        ACCOUNTS
                    ========================= */}

                    <Route
                        path="/account-add"
                        element={<AccountEntry />}
                    />

                    <Route
                        path="/account-details/:accountNumber"
                        element={<AccountDetails />}
                    />

                    <Route
                        path="/account-list"
                        element={<AccountList />}
                    />

                </Routes>

            </BrowserRouter>

        </div>

    );

}

export default App;
