package edu.infosys.finCoreBankApplication.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.bean.BankUser;
import edu.infosys.finCoreBankApplication.bean.Customer;
import edu.infosys.finCoreBankApplication.bean.LoanApplication;
import edu.infosys.finCoreBankApplication.bean.LoanRepayment;
import edu.infosys.finCoreBankApplication.bean.Transaction;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.dao.CustomerDao;
import edu.infosys.finCoreBankApplication.dao.LoanApplicationDao;
import edu.infosys.finCoreBankApplication.dao.LoanRepaymentDao;
import edu.infosys.finCoreBankApplication.dao.TransactionDao;

@Service
public class CustomerService {
	
	@Autowired
	private BankUserService service;
	
	@Autowired
	private CustomerDao customerDao;

	@Autowired
	private AccountDao accountDao;

	@Autowired
	private TransactionDao transactionDao;

	@Autowired
	private LoanApplicationDao loanApplicationDao;

	@Autowired
	private LoanRepaymentDao loanRepaymentDao;
	
	public Long generateCustomerId() {
		Long value=customerDao.getMaxCustomerId();
		 if(value==null)
			 value=1000001L;
		 else
			 value=value+1;
		
		 return value;
		 
	}
	
	public Customer setCustomerDetails(Customer customer) {
		BankUser user=service.getUser();
		customer.setCustomerName(user.getPersonalName());
		customer.setUsername(user.getUsername());
		customer.setEmail(user.getEmail());
		return customer;
	}
	public Boolean checkCustomer() {
		String username=service.getUserId();
		Customer customer=customerDao.getCustomerByUsername(username);
		if(customer==null || customer.getStatus().equalsIgnoreCase("R"))
			return true;
		else
			return false;
	}
	public Customer getCustomerByUsername(){
		String username=service.getUserId();
		return customerDao.getCustomerByUsername(username);
	}

	/**
	 * Permanently deletes a customer along with every record that references
	 * them, in an order that respects the database's foreign key constraints:
	 * loan repayments -> loan applications -> transactions -> accounts -> customer.
	 * Runs in a single transaction, so if any step fails nothing is deleted.
	 */
	@Transactional
	public void deleteCustomerCascade(Long customerId) {

		List<LoanRepayment> repayments = loanRepaymentDao.findByCustomerId(customerId);
		if (repayments != null) {
			for (LoanRepayment repayment : repayments) {
				loanRepaymentDao.deleteById(repayment.getRepaymentId());
			}
		}

		List<LoanApplication> applications = loanApplicationDao.findByCustomerId(customerId);
		if (applications != null) {
			for (LoanApplication application : applications) {
				loanApplicationDao.deleteById(application.getApplicationId());
			}
		}

		List<Transaction> transactions = transactionDao.getTransactionIdByCustomer(customerId);
		if (transactions != null) {
			for (Transaction transaction : transactions) {
				transactionDao.deleteTransactionById(transaction.getTransactionId());
			}
		}

		List<Account> accounts = accountDao.getAccountsByCustomerId(customerId);
		if (accounts != null) {
			for (Account account : accounts) {
				accountDao.deleteAccountByAccountNumber(account.getAccountNumber());
			}
		}

		customerDao.deleteCustomerById(customerId);
	}

}