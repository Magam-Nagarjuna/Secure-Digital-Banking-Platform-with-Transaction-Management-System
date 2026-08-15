package edu.infosys.finCoreBankApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.service.AccountService;

@RestController
@RequestMapping("/fincore/")
@CrossOrigin(origins = "http://localhost:3737", allowCredentials = "true")
public class AccountController {

    @Autowired
    private AccountDao accountDao;

    @Autowired
    private AccountService service;

    @PostMapping("/account")
    public ResponseEntity<?> addAccount(@RequestBody Account account) {
        try {
            Account saved = service.createAccount(account);
            return ResponseEntity.ok(saved);
        } catch (IllegalArgumentException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @PutMapping("/account")
    public void updateAccount(@RequestBody Account account) {
        accountDao.addAccount(account);
    }

    @GetMapping("/account/{accountNumber}")
    public Account getAccountByNumber(@PathVariable Long accountNumber) {
        return accountDao.getAccountByAccountNumber(accountNumber);
    }

    @GetMapping("/account")
    public List<Account> getAccounts() {
        return accountDao.getAccounts();
    }

    @DeleteMapping("/account/{accountNumber}")
    public void deleteAccountByNumber(@PathVariable Long accountNumber) {
        accountDao.deleteAccountByAccountNumber(accountNumber);
    }

    @GetMapping("/account-info")
    public Long getMaxAccountNumber() {
        return service.generateAccountNumber();
    }

    @GetMapping("/account-info/{customerId}")
    public List<Account> getAccountsByCustomerId(@PathVariable Long customerId) {
        return accountDao.getAccountsByCustomerId(customerId);
    }

    @GetMapping("/balance-info/{accountNumber}")
    public Account getBalanceByAccountNumber(@PathVariable Long accountNumber) {
        return accountDao.getAccountByAccountNumber(accountNumber);
    }
    @GetMapping("/id-list")
	public List<Long> getAccountIdsByCustomerId(){
		return service.getAccountIdsByCustomerId();
	}
    @GetMapping("/customer-accounts")
    public List<Account> getCustomerAccounts() {
        return service.getAccountsByCustomerId();
    }
    
  
}