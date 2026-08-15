package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.finCoreBankApplication.bean.Transaction;

@Repository
@Service
public class TransactionDaoImpl implements TransactionDao {

    @Autowired
    private TransactionRepository repository;

    @Override
    public Long getMaxTransactionId() {
        return repository.getMaxTransactionId();
    }

    @Override
    public List<Transaction> getTransactionIdByCustomer(Long customerId) {
        return repository.getTransactionIdByCustomer(customerId);
    }

    @Override
    public List<Transaction> getTransactionIdByAccount(Long accountNumber) {
        return repository.getTransactionIdByAccount(accountNumber);
    }

    @Override
    public List<Transaction> getTransactionIdByType(String type) {
        return repository.getTransactionIdByType(type);
    }

    @Override
    public void addTransaction(Transaction transaction) {
        repository.save(transaction);
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return repository.findAll();
    }

    @Override
    public Transaction getTransactionById(String transactionId) {
        return repository.findById(transactionId).orElse(null);
    }

    @Override
    public void deleteTransactionById(String transactionId) {
        repository.deleteById(transactionId);
    }
}