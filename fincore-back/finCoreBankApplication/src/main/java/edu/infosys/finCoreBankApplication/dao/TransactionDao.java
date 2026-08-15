package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import edu.infosys.finCoreBankApplication.bean.Transaction;

public interface TransactionDao {

    public Long getMaxTransactionId();

    public List<Transaction> getTransactionIdByCustomer(Long customerId);

    public List<Transaction> getTransactionIdByAccount(Long accountNumber);

    public List<Transaction> getTransactionIdByType(String type);

    public void addTransaction(Transaction transaction);

    public List<Transaction> getAllTransactions();

    public Transaction getTransactionById(String transactionId);

    public void deleteTransactionById(String transactionId);

}