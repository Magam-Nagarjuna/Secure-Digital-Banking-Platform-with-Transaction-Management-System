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
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Autowired private LoanApplicationDao applicationDao;
    @Autowired private LoanRepaymentDao repaymentDao;
    @Autowired private LoanDao loanDao;
    @Autowired private CustomerDao customerDao;
    @Autowired private AccountDao accountDao;
    @Autowired private TransactionDao transactionDao;
    @Autowired private AccountService accountService;
    @Autowired private TransactionService transactionService;

    private static final String APPLICATION_ID_PREFIX = "CL";
    private static final long APPLICATION_ID_START = 100001L;

    public String generateApplicationId() {
        String value = applicationDao.getMaxApplicationId();
        long nextId;
        if (value == null || value.isBlank()) {
            nextId = APPLICATION_ID_START;
        } else {
            String digits = value.replaceAll("\\D", "");
            long current = digits.isEmpty() ? APPLICATION_ID_START - 1 : Long.parseLong(digits);
            nextId = current + 1;
        }
        return APPLICATION_ID_PREFIX + nextId;
    }

    public String generateRepaymentId() {
        String value = repaymentDao.getMaxRepaymentId();
        return value == null ? "RP1000001" : "RP" + (Long.parseLong(value.substring(2)) + 1);
    }

    @Transactional
    public LoanApplication apply(LoanApplication application) {
        if (application.getCustomerId() == null || application.getLoanId() == null
                || application.getSavingsAccountNumber() == null) {
            throw new RuntimeException("Customer, loan scheme and savings account are required");
        }

        Customer customer = customerDao.getCustomerById(application.getCustomerId());
        if (customer == null || !ACTIVE.equalsIgnoreCase(customer.getStatus())) {
            throw new RuntimeException("Customer is not active");
        }

        Account savings = accountDao.getAccountByAccountNumber(application.getSavingsAccountNumber());
        if (savings == null || !ACTIVE.equalsIgnoreCase(savings.getStatus())) {
            throw new RuntimeException("Selected savings account is not active");
        }
        if (!application.getCustomerId().equals(savings.getCustomerId())) {
            throw new RuntimeException("Selected savings account does not belong to the customer");
        }
        if (LOAN_ACCOUNT.equalsIgnoreCase(savings.getAccountType())) {
            throw new RuntimeException("Please select a savings/current account for loan disbursement");
        }

        Loan scheme = loanDao.getLoanById(application.getLoanId());
        if (scheme == null || !ACTIVE.equalsIgnoreCase(scheme.getLoanStatus())) {
            throw new RuntimeException("Loan scheme is not available");
        }

        for (LoanApplication item : applicationDao.findByCustomerId(application.getCustomerId())) {
            if (application.getLoanId().equals(item.getLoanId())
                    && (PENDING.equals(item.getApplicationStatus()) || APPROVED.equals(item.getApplicationStatus()))) {
                throw new RuntimeException("Customer already has an active application for this loan scheme");
            }
        }

        double amount = application.getLoanAmount() == null || application.getLoanAmount() <= 0
                ? scheme.getLoanAmount() : application.getLoanAmount();
        if (amount < 100000) throw new RuntimeException("Minimum loan amount should be 100000");

        int years = application.getLoanTenure() == null || application.getLoanTenure() <= 0
                ? scheme.getLoanTenure() : application.getLoanTenure();
        if (years <= 0) throw new RuntimeException("Loan tenure should be greater than zero");

        double rate = scheme.getInterestRate() == null ? 0 : scheme.getInterestRate();
        if (rate <= 0) throw new RuntimeException("Loan scheme has an invalid interest rate");

        int months = years * 12;
        double monthlyRate = rate / 1200.0;
        double factor = Math.pow(1 + monthlyRate, months);
        double exactEmi = (amount * monthlyRate * factor) / (factor - 1);
        double emi = Math.round(exactEmi);
        double totalCost = Math.round(exactEmi * months);

        application.setApplicationId(generateApplicationId());
        application.setAccountNumber(null);
        application.setSavingsAccountNumber(savings.getAccountNumber());
        application.setPaymentAccountNumber(null);
        application.setLoanAmount(amount);
        application.setLoanTenure(years);
        application.setTotalTenure(months);
        application.setInterestRate(rate);
        application.setEmiPayable(emi);
        application.setTotalInterestPayable(totalCost - amount);
        application.setTotalCost(totalCost);
        application.setPaidAmount(0.0);
        application.setOutstandingAmount(0.0);
        application.setApplicationStatus(PENDING);
        application.setApplicationDate(now());
        application.setReviewedDate(null);
        application.setRejectionReason(null);
        applicationDao.save(application);
        return application;
    }

    public List<LoanApplication> getAll() { return applicationDao.findAll(); }
    public List<LoanApplication> getByStatus(String status) { return applicationDao.findByStatus(status); }
    public List<LoanApplication> getByCustomer(Long customerId) { return applicationDao.findByCustomerId(customerId); }
    public List<LoanApplication> getByAccount(Long accountNumber) { return applicationDao.findByAccountNumber(accountNumber); }

    public LoanApplication getById(String id) {
        LoanApplication application = applicationDao.findById(id);
        if (application == null) throw new RuntimeException("Loan application not found");
        return application;
    }

    @Transactional
    public LoanApplication approve(String applicationId) {
        LoanApplication application = getById(applicationId);
        if (!PENDING.equals(application.getApplicationStatus())) {
            throw new RuntimeException("Only pending applications can be approved");
        }
        if (application.getSavingsAccountNumber() == null) {
            throw new RuntimeException("Savings account was not selected in the application");
        }

        Account savings = accountDao.getAccountByAccountNumber(application.getSavingsAccountNumber());
        if (savings == null || !application.getCustomerId().equals(savings.getCustomerId())
                || !ACTIVE.equalsIgnoreCase(savings.getStatus())
                || LOAN_ACCOUNT.equalsIgnoreCase(savings.getAccountType())) {
            throw new RuntimeException("Selected savings account is invalid");
        }

       
        double balance = savings.getBalance() == null ? 0.0 : savings.getBalance();
        savings.setBalance(round2(balance + application.getLoanAmount()));
        accountDao.addAccount(savings);

      
        Account payment = accountService.createLoanAccount(application.getCustomerId(), 0.0);
        application.setPaymentAccountNumber(payment.getAccountNumber());
        application.setAccountNumber(payment.getAccountNumber()); 
        application.setApplicationStatus(APPROVED);
        application.setPaidAmount(0.0);
        application.setOutstandingAmount(application.getTotalCost());
        application.setReviewedDate(now());
        application.setRejectionReason(null);
        applicationDao.save(application);

        Transaction transaction = new Transaction();
        transaction.setTransactionId(transactionService.generateTransactionNumber());
        transaction.setAccountNumber(savings.getAccountNumber());
        transaction.setCustomerId(application.getCustomerId());
        transaction.setTransactionAmount(application.getLoanAmount());
        transaction.setTransactionType("Loan Disbursement");
        transaction.setTransactionDate(now());
        transactionDao.addTransaction(transaction);
        return application;
    }

    @Transactional
    public LoanApplication reject(String applicationId, String reason) {
        LoanApplication application = getById(applicationId);
        if (!PENDING.equals(application.getApplicationStatus())) {
            throw new RuntimeException("Only pending applications can be rejected");
        }
        application.setApplicationStatus(REJECTED);
        application.setAccountNumber(null);
        application.setPaymentAccountNumber(null);
        application.setOutstandingAmount(0.0);
        application.setReviewedDate(now());
        application.setRejectionReason(reason == null || reason.isBlank() ? "Application rejected by bank" : reason);
        applicationDao.save(application);
        return application;
    }

    @Transactional
    public LoanRepayment repay(String applicationId, LoanRepayment request) {
        LoanApplication application = getById(applicationId);
        if (!APPROVED.equals(application.getApplicationStatus())) {
            throw new RuntimeException("Repayment is allowed only for approved loans");
        }
        double outstanding = application.getOutstandingAmount() == null ? 0.0 : application.getOutstandingAmount();
        if (outstanding <= 0) throw new RuntimeException("Loan has no outstanding amount");

        Double amount = request.getPaymentAmount();
        if (amount == null || amount <= 0) throw new RuntimeException("Repayment amount should be greater than zero");
        amount = round2(amount);
        if (amount > outstanding) throw new RuntimeException("Repayment cannot exceed outstanding amount");

        Long paymentId = application.getPaymentAccountNumber();
        if (paymentId == null) paymentId = application.getAccountNumber();
        if (paymentId == null) throw new RuntimeException("Repayment account has not been created");

        Account payment = accountDao.getAccountByAccountNumber(paymentId);
        if (payment == null || !LOAN_ACCOUNT.equalsIgnoreCase(payment.getAccountType())
                || !application.getCustomerId().equals(payment.getCustomerId())) {
            throw new RuntimeException("Dedicated loan repayment account not found");
        }

        double balance = payment.getBalance() == null ? 0.0 : payment.getBalance();
        if (balance < amount) throw new RuntimeException("Insufficient balance in the loan repayment account");

        double remaining = round2(outstanding - amount);
        double paid = round2((application.getPaidAmount() == null ? 0.0 : application.getPaidAmount()) + amount);
        payment.setBalance(round2(balance - amount));
        accountDao.addAccount(payment);

        Transaction transaction = new Transaction();
        transaction.setTransactionId(transactionService.generateTransactionNumber());
        transaction.setAccountNumber(paymentId);
        transaction.setCustomerId(application.getCustomerId());
        transaction.setTransactionAmount(amount);
        transaction.setTransactionType("Loan Repayment");
        transaction.setTransactionDate(now());
        transactionDao.addTransaction(transaction);

        application.setPaidAmount(paid);
        application.setOutstandingAmount(remaining);
        if (remaining <= 0) application.setApplicationStatus(CLOSED);
        applicationDao.save(application);

        LoanRepayment repayment = new LoanRepayment();
        repayment.setRepaymentId(generateRepaymentId());
        repayment.setApplicationId(applicationId);
        repayment.setCustomerId(application.getCustomerId());
        repayment.setAccountNumber(paymentId);
        repayment.setPaymentAmount(amount);
        repayment.setPaymentDate(now());
        repayment.setPaymentMode("ACCOUNT");
        repayment.setRemainingOutstanding(remaining);
        repaymentDao.save(repayment);
        return repayment;
    }

    public List<LoanRepayment> getRepayments(String applicationId) 
    { 
    	return repaymentDao.findByApplicationId(applicationId); 
    }
    
    public List<LoanRepayment> getRepaymentsByCustomer(Long customerId) 
    {
    	return repaymentDao.findByCustomerId(customerId); 
    	}
    
    public List<LoanRepayment> getRepaymentsByAccount(Long accountNumber) 
    {
    	return repaymentDao.findByAccountNumber(accountNumber);
    	}
    
    private String now() { return LocalDateTime.now().format(FORMATTER); }
    private double round2(double value) { return Math.round(value * 100.0) / 100.0; }
}