package edu.infosys.finCoreBankApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.bean.Transaction;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.dao.TransactionDao;
import edu.infosys.finCoreBankApplication.service.TransactionService;

@RestController
@RequestMapping("/fincore")
@CrossOrigin(origins = "http://localhost:3737", allowCredentials = "true")
public class TransactionController {

    @Autowired
    private TransactionDao transactionDao;
    @Autowired
    private AccountDao accountDao;
    @Autowired
    private TransactionService service;

    @GetMapping("/trans-info")
    public String generateTransactionNumber() {
        return service.generateTransactionNumber();
    }

    @PostMapping("/trans")
    public Integer addTransaction(@RequestBody Transaction transaction) {
        Account account = accountDao.getAccountByAccountNumber(transaction.getAccountNumber());
        if (account == null)
            return 0;

        double amount = transaction.getTransactionAmount() == null ? 0.0 : transaction.getTransactionAmount();
        if (amount <= 0)
            return 1;

        if ("Withdraw".equalsIgnoreCase(transaction.getTransactionType())) {
            double balance = account.getBalance() == null ? 0.0 : account.getBalance();

            // LOAN accounts are normal transactional accounts and do not have the
            // normal savings/current ₹5,000 minimum-balance restriction.
            if ("LOAN".equalsIgnoreCase(account.getAccountType())) {
                if (balance < amount)
                    return 1;
            } else if (balance - amount < 5000) {
                return 1;
            }
        }

        service.balanceUpdate(transaction);
        transactionDao.addTransaction(transaction);
        return 2;
    }

    @GetMapping("/trans")
    public List<Transaction> getAllTransactions() {
        return transactionDao.getAllTransactions();
    }

    @GetMapping("/trans/{transactionId}")
    public Transaction getTransactionById(@PathVariable String transactionId) {
        return transactionDao.getTransactionById(transactionId);
    }

    @DeleteMapping("/trans/{transactionId}")
    public void deleteTransactionById(@PathVariable String transactionId) {
        transactionDao.deleteTransactionById(transactionId);
    }

    @GetMapping("/trans/customer/{customerId}")
    public List<Transaction> getTransactionByCustomer(@PathVariable Long customerId) {
        return transactionDao.getTransactionIdByCustomer(customerId);
    }

    @GetMapping("/trans/account/{accountNumber}")
    public List<Transaction> getTransactionByAccount(@PathVariable Long accountNumber) {
        return transactionDao.getTransactionIdByAccount(accountNumber);
    }

    @GetMapping("/trans/type/{type}")
    public List<Transaction> getTransactionByType(@PathVariable String type) {
        return transactionDao.getTransactionIdByType(type);
    }
}
