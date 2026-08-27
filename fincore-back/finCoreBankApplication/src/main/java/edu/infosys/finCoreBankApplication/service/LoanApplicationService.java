
package edu.infosys.finCoreBankApplication.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.bean.Customer;
import edu.infosys.finCoreBankApplication.bean.Loan;
import edu.infosys.finCoreBankApplication.bean.LoanApplication;
import edu.infosys.finCoreBankApplication.bean.LoanRepayment;
import edu.infosys.finCoreBankApplication.bean.Transaction;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.dao.CustomerDao;
import edu.infosys.finCoreBankApplication.dao.LoanApplicationDao;
import edu.infosys.finCoreBankApplication.dao.LoanDao;
import edu.infosys.finCoreBankApplication.dao.LoanRepaymentDao;
import edu.infosys.finCoreBankApplication.dao.TransactionDao;

@Service
public class LoanApplicationService {

    private static final String PENDING = "PENDING";
    private static final String APPROVED = "APPROVED";
    private static final String REJECTED = "REJECTED";
    private static final String CLOSED = "CLOSED";
    private static final String ACTIVE = "A";
    private static final String LOAN_ACCOUNT = "LOAN";

    private static final DateTimeFormatter FORMATTER =
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Autowired
    private LoanApplicationDao applicationDao;

    @Autowired
    private LoanRepaymentDao repaymentDao;

    @Autowired
    private LoanDao loanDao;

    @Autowired
    private CustomerDao customerDao;

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private TransactionDao transactionDao;

    @Autowired
    private AccountService accountService;

    @Autowired
    private TransactionService transactionService;

    private static final String APPLICATION_ID_PREFIX = "CL";
    private static final long APPLICATION_ID_START = 100001L;

    public String generateApplicationId() {

        String value = applicationDao.getMaxApplicationId();

        long nextId;

        if (value == null || value.isBlank()) {

            nextId = APPLICATION_ID_START;

        } else {

            String digits = value.replaceAll("\\D", "");

            long current = digits.isEmpty()
                    ? APPLICATION_ID_START - 1
                    : Long.parseLong(digits);

            nextId = current + 1;
        }

        return APPLICATION_ID_PREFIX + nextId;
    }

    public String generateRepaymentId() {

        String value = repaymentDao.getMaxRepaymentId();

        return value == null
                ? "RP1000001"
                : "RP" + (Long.parseLong(value.substring(2)) + 1);
    }

    @Transactional
    public LoanApplication apply(LoanApplication application) {

        if (application.getCustomerId() == null
                || application.getLoanId() == null
                || application.getSavingsAccountNumber() == null) {

            throw new RuntimeException(
                    "Customer, loan scheme and savings account are required");
        }

        Customer customer =
                customerDao.getCustomerById(application.getCustomerId());

        if (customer == null
                || !ACTIVE.equalsIgnoreCase(customer.getStatus())) {

            throw new RuntimeException("Customer is not active");
        }

        Account savings =
                accountDao.getAccountByAccountNumber(
                        application.getSavingsAccountNumber());

        if (savings == null
                || !ACTIVE.equalsIgnoreCase(savings.getStatus())) {

            throw new RuntimeException(
                    "Selected savings account is not active");
        }

        if (!application.getCustomerId().equals(savings.getCustomerId())) {

            throw new RuntimeException(
                    "Selected savings account does not belong to the customer");
        }

        if (LOAN_ACCOUNT.equalsIgnoreCase(savings.getAccountType())) {

            throw new RuntimeException(
                    "Please select a savings/current account for loan disbursement");
        }

        Loan scheme =
                loanDao.getLoanById(application.getLoanId());

        if (scheme == null
                || !ACTIVE.equalsIgnoreCase(scheme.getLoanStatus())) {

            throw new RuntimeException(
                    "Loan scheme is not available");
        }

        double amount =
                application.getLoanAmount() == null
                        || application.getLoanAmount() <= 0
                        ? scheme.getLoanAmount()
                        : application.getLoanAmount();

        if (amount < 100000) {

            throw new RuntimeException(
                    "Minimum loan amount should be 100000");
        }

   
        double years =
                application.getLoanTenure() == null
                        || application.getLoanTenure() <= 0
                        ? scheme.getLoanTenure()
                        : application.getLoanTenure();

        if (years <= 0) {

            throw new RuntimeException(
                    "Loan tenure should be greater than zero");
        }

        double rate =
                scheme.getInterestRate() == null
                        ? 0
                        : scheme.getInterestRate();

        if (rate <= 0) {

            throw new RuntimeException(
                    "Loan scheme has an invalid interest rate");
        }

       
        int months = (int) Math.round(years * 12);

        if (months <= 0) {

            throw new RuntimeException(
                    "Loan tenure must be at least 1 month");
        }

        double monthlyRate = rate / 1200.0;

        double factor =
                Math.pow(1 + monthlyRate, months);

        double exactEmi =
                (amount * monthlyRate * factor)
                        / (factor - 1);

        double emi = Math.round(exactEmi);

        double totalCost =
                Math.round(exactEmi * months);

        application.setApplicationId(
                generateApplicationId());

        application.setAccountNumber(null);

        application.setSavingsAccountNumber(
                savings.getAccountNumber());

        application.setPaymentAccountNumber(null);

        application.setLoanAmount(amount);

       
        application.setLoanTenure(years);

     
        application.setTotalTenure(months);

        application.setInterestRate(rate);

        application.setEmiPayable(emi);

        application.setTotalInterestPayable(
                totalCost - amount);

        application.setTotalCost(totalCost);

        application.setPaidAmount(0.0);

        application.setOutstandingAmount(0.0);

        application.setApplicationStatus(PENDING);

        application.setApplicationDate(now());

        application.setReviewedDate(null);

        application.setClosedDate(null);

        application.setRejectionReason(null);

        applicationDao.save(application);

        return application;
    }

    public List<LoanApplication> getAll() {

        return applicationDao.findAll();
    }

    public List<LoanApplication> getByStatus(String status) {

        return applicationDao.findByStatus(status);
    }

    public List<LoanApplication> getByCustomer(Long customerId) {

        return applicationDao.findByCustomerId(customerId);
    }

    public List<LoanApplication> getByAccount(Long accountNumber) {

        return applicationDao.findByAccountNumber(accountNumber);
    }

    public LoanApplication getById(String id) {

        LoanApplication application =
                applicationDao.findById(id);

        if (application == null) {

            throw new RuntimeException(
                    "Loan application not found");
        }

        return application;
    }

    @Transactional
    public LoanApplication approve(String applicationId) {

        LoanApplication application =
                getById(applicationId);

        if (!PENDING.equals(application.getApplicationStatus())) {

            throw new RuntimeException(
                    "Only pending applications can be approved");
        }

        if (application.getSavingsAccountNumber() == null) {

            throw new RuntimeException(
                    "Savings account was not selected in the application");
        }

        Account savings =
                accountDao.getAccountByAccountNumber(
                        application.getSavingsAccountNumber());

        if (savings == null
                || !application.getCustomerId()
                        .equals(savings.getCustomerId())
                || !ACTIVE.equalsIgnoreCase(savings.getStatus())
                || LOAN_ACCOUNT.equalsIgnoreCase(
                        savings.getAccountType())) {

            throw new RuntimeException(
                    "Selected savings account is invalid");
        }

        double balance =
                savings.getBalance() == null
                        ? 0.0
                        : savings.getBalance();

        savings.setBalance(
                round2(balance + application.getLoanAmount()));

        accountDao.addAccount(savings);

        Account payment =
                accountService.createLoanAccount(
                        application.getCustomerId(),
                        0.0);

        application.setPaymentAccountNumber(
                payment.getAccountNumber());

        application.setAccountNumber(
                payment.getAccountNumber());

        application.setApplicationStatus(APPROVED);

        application.setPaidAmount(0.0);

        application.setOutstandingAmount(
                application.getTotalCost());

        application.setReviewedDate(now());

        application.setRejectionReason(null);

        applicationDao.save(application);

        Transaction transaction =
                new Transaction();

        transaction.setTransactionId(
                transactionService.generateTransactionNumber());

        transaction.setAccountNumber(
                savings.getAccountNumber());

        transaction.setCustomerId(
                application.getCustomerId());

        transaction.setTransactionAmount(
                application.getLoanAmount());

        transaction.setTransactionType(
                "Loan Disbursement");

        transaction.setTransactionDate(now());

        transactionDao.addTransaction(transaction);

        return application;
    }

    @Transactional
    public LoanApplication reject(
            String applicationId,
            String reason) {

        LoanApplication application =
                getById(applicationId);

        if (!PENDING.equals(application.getApplicationStatus())) {

            throw new RuntimeException(
                    "Only pending applications can be rejected");
        }

        application.setApplicationStatus(REJECTED);

        application.setAccountNumber(null);

        application.setPaymentAccountNumber(null);

        application.setOutstandingAmount(0.0);

        application.setReviewedDate(now());

        application.setClosedDate(null);

        application.setRejectionReason(
                reason == null || reason.isBlank()
                        ? "Application rejected by bank"
                        : reason);

        applicationDao.save(application);

        return application;
    }

    @Transactional
    public LoanRepayment repay(
            String applicationId,
            LoanRepayment request) {

        LoanApplication application =
                getById(applicationId);

        if (!APPROVED.equals(application.getApplicationStatus())) {

            throw new RuntimeException(
                    "Repayment is allowed only for approved loans");
        }

        double outstanding =
                application.getOutstandingAmount() == null
                        ? 0.0
                        : round2(
                                application.getOutstandingAmount());

        if (outstanding <= 0) {

            throw new RuntimeException(
                    "Loan has no outstanding amount");
        }

        double emi =
                application.getEmiPayable() == null
                        ? 0.0
                        : round2(
                                application.getEmiPayable());

        if (emi <= 0) {

            throw new RuntimeException(
                    "Loan EMI is not available");
        }

        double amount;

        int paidTenures =
                application.getPaidTenure() == null
                        ? 0
                        : application.getPaidTenure();

        int totalTenures =
                application.getTotalTenure() == null
                        ? 0
                        : application.getTotalTenure();

        if (paidTenures + 1 >= totalTenures
                || outstanding <= emi + 10) {

            amount = outstanding;

        } else {

            amount = emi;
        }

        Long loanAccountNumber =
                application.getPaymentAccountNumber();

        if (loanAccountNumber == null) {

            loanAccountNumber =
                    application.getAccountNumber();
        }

        if (loanAccountNumber == null) {

            throw new RuntimeException(
                    "Loan account has not been created");
        }

        Account loanAccount =
                accountDao.getAccountByAccountNumber(
                        loanAccountNumber);

        if (loanAccount == null
                || !LOAN_ACCOUNT.equalsIgnoreCase(
                        loanAccount.getAccountType())
                || !application.getCustomerId().equals(
                        loanAccount.getCustomerId())) {

            throw new RuntimeException(
                    "Loan payment account not found");
        }

        Long savingsAccountNumber =
                application.getSavingsAccountNumber();

        if (savingsAccountNumber == null) {

            throw new RuntimeException(
                    "No savings account is linked to this loan");
        }

        Account savings =
                accountDao.getAccountByAccountNumber(
                        savingsAccountNumber);

        if (savings == null
                || !ACTIVE.equalsIgnoreCase(
                        savings.getStatus())
                || !application.getCustomerId().equals(
                        savings.getCustomerId())
                || LOAN_ACCOUNT.equalsIgnoreCase(
                        savings.getAccountType())) {

            throw new RuntimeException(
                    "Savings account linked to this loan is not available");
        }

        double savingsBalance =
                savings.getBalance() == null
                        ? 0.0
                        : round2(
                                savings.getBalance());

        if (savingsBalance < amount) {

            throw new RuntimeException(
                    "Insufficient balance in savings account "
                            + savings.getAccountNumber());
        }

        double remaining =
                round2(outstanding - amount);

        double paid =
                round2(
                        (application.getPaidAmount() == null
                                ? 0.0
                                : application.getPaidAmount())
                                + amount);

        int nextPaidTenure =
                (application.getPaidTenure() == null
                        ? 0
                        : application.getPaidTenure()) + 1;

        savings.setBalance(
                round2(savingsBalance - amount));

        accountDao.addAccount(savings);

        double loanBalance =
                loanAccount.getBalance() == null
                        ? 0.0
                        : loanAccount.getBalance();

        loanAccount.setBalance(
                round2(loanBalance + amount));

        accountDao.addAccount(loanAccount);

        Transaction debit =
                new Transaction();

        debit.setTransactionId(
                transactionService.generateTransactionNumber());

        debit.setAccountNumber(
                savings.getAccountNumber());

        debit.setCustomerId(
                application.getCustomerId());

        debit.setTransactionAmount(amount);

        debit.setTransactionType(
                "Loan Repayment (Debit)");

        debit.setTransactionDate(now());

        transactionDao.addTransaction(debit);

        Transaction credit =
                new Transaction();

        credit.setTransactionId(
                transactionService.generateTransactionNumber());

        credit.setAccountNumber(
                loanAccount.getAccountNumber());

        credit.setCustomerId(
                application.getCustomerId());

        credit.setTransactionAmount(amount);

        credit.setTransactionType(
                "Loan Repayment (Credit)");

        credit.setTransactionDate(now());

        transactionDao.addTransaction(credit);

        application.setPaidAmount(paid);

        application.setOutstandingAmount(remaining);

        application.setPaidTenure(nextPaidTenure);

        if (remaining <= 0) {

            application.setApplicationStatus(CLOSED);

            application.setClosedDate(now());
        }

        applicationDao.save(application);

        LoanRepayment repayment =
                new LoanRepayment();

        repayment.setRepaymentId(
                generateRepaymentId());

        repayment.setApplicationId(
                applicationId);

        repayment.setCustomerId(
                application.getCustomerId());

        repayment.setPaymentAmount(amount);

        repayment.setPaymentDate(now());

        repayment.setPaymentMode("ACCOUNT");

        repayment.setRemainingOutstanding(
                remaining);

        repaymentDao.save(repayment);

        return repayment;
    }

    public List<LoanRepayment> getRepayments(
            String applicationId) {

        return repaymentDao.findByApplicationId(
                applicationId);
    }

    public List<LoanRepayment> getRepaymentsByCustomer(
            Long customerId) {

        return repaymentDao.findByCustomerId(
                customerId);
    }

    private String now() {

        return LocalDateTime.now()
                .format(FORMATTER);
    }

    private double round2(double value) {

        return Math.round(value * 100.0) / 100.0;
    }
}

