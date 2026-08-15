package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import edu.infosys.finCoreBankApplication.bean.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, String> {

	@Query(value = "SELECT MAX(CAST(SUBSTRING(transaction_id, 2) AS UNSIGNED)) FROM Transaction", nativeQuery = true)
    public Long getMaxTransactionId();

    @Query("SELECT a FROM Transaction a WHERE a.customerId = ?1")
    public List<Transaction> getTransactionIdByCustomer(Long customerId);

    @Query("SELECT a FROM Transaction a WHERE a.accountNumber = ?1")
    public List<Transaction> getTransactionIdByAccount(Long accountNumber);

    @Query("SELECT a FROM Transaction a WHERE a.transactionType = ?1")
    public List<Transaction> getTransactionIdByType(String type);

}