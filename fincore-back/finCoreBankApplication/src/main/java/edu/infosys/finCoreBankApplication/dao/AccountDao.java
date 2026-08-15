package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import edu.infosys.finCoreBankApplication.bean.Account;

public interface AccountDao {
	
	  	public void addAccount(Account account);
	  	public Account getAccountByAccountNumber(Long accountNumber);
	    public List<Account> getAccounts();
	    public void deleteAccountByAccountNumber(Long accountNumber);
	    public Long getMaxAccountNumber();
	    public List<Account> getAccountsByCustomerId(Long customerId);
	    public List<Account> getAccountsByStatus(String status);
	    public List<Account> getAccountsByAccountType(String accountType);

}
