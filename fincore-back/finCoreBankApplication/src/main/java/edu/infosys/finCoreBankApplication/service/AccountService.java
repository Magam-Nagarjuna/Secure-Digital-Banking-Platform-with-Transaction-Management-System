package edu.infosys.finCoreBankApplication.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.bean.Customer;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.dao.CustomerDao;

@Service
public class AccountService {

    private static final String ACTIVE = "A";
    private static final String LOAN = "LOAN";
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

    @Autowired private AccountDao accountDao;
    @Autowired private CustomerDao customerDao;
    @Autowired private BankUserService service;

    public Account createAccount(Account account) {
        if (account.getCustomerId() == null) {
            throw new IllegalArgumentException("Customer ID is required to create an account");
        }

        Customer customer = customerDao.getCustomerById(account.getCustomerId());
        if (customer == null) {
            throw new IllegalArgumentException("No customer found for customerId: " + account.getCustomerId());
        }

        account.setStatus(customer.getStatus());
        accountDao.addAccount(account);
        return account;
    }

    
    public Account createLoanAccount(Long customerId, Double openingBalance) {
        if (customerId == null) throw new IllegalArgumentException("Customer ID is required");

        Customer customer = customerDao.getCustomerById(customerId);
        if (customer == null || !ACTIVE.equalsIgnoreCase(customer.getStatus())) {
            throw new IllegalArgumentException("Customer is not active");
        }

        Account account = new Account();
        account.setAccountNumber(generateAccountNumber());
        account.setCustomerId(customerId);
        account.setAccountType(LOAN);
        account.setBalance(openingBalance == null ? 0.0 : openingBalance);
        account.setStatus(ACTIVE);
        account.setAccountOpenDate(LocalDateTime.now().format(FORMATTER));

        accountDao.addAccount(account);
        return account;
    }

    public Long generateAccountNumber() {
        Long value = accountDao.getMaxAccountNumber();
        return value == null ? 8000001001L : value + 1;
    }

    public List<Account> getAccountsByCustomerId() {
        String userId = service.getUserId();
        Customer customer = customerDao.getCustomerByUsername(userId);
        if (customer == null) throw new RuntimeException("Customer not found");
        return accountDao.getAccountsByCustomerId(customer.getCustomerId());
    }

    public List<Long> getAccountIdsByCustomerId() {
        List<Long> numberList = new ArrayList<>();
        for (Account account : getAccountsByCustomerId()) {
            numberList.add(account.getAccountNumber());
        }
        return numberList;
    }

    public List<Account> getAccountsByCustomerId1() {
        return getAccountsByCustomerId();
    }
}
