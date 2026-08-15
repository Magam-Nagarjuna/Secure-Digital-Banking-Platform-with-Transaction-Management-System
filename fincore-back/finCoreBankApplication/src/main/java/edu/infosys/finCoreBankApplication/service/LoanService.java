package edu.infosys.finCoreBankApplication.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.infosys.finCoreBankApplication.bean.Customer;
import edu.infosys.finCoreBankApplication.bean.Loan;
import edu.infosys.finCoreBankApplication.dao.CustomerDao;
import edu.infosys.finCoreBankApplication.dao.LoanDao;

@Service
public class LoanService {

    @Autowired
    private LoanDao loanDao;
    @Autowired
    private CustomerDao customerDao;
    @Autowired
    private BankUserService service;

    private static final String LOAN_ID_PREFIX = "LN";
    private static final long LOAN_ID_START = 100001L;

    public String generateLoanId() {
        String value = loanDao.getMaxLoanId();
        long nextId;
        if (value == null || value.isBlank()) {
            nextId = LOAN_ID_START;
        } else {
            
            String digits = value.replaceAll("\\D", "");
            long current = digits.isEmpty() ? LOAN_ID_START - 1 : Long.parseLong(digits);
            nextId = current + 1;
        }
        return LOAN_ID_PREFIX + nextId;
    }
 
 	public List<Loan> getActiveLoans(){

 		return loanDao.getLoansByStatus("A");

 	}

    public Loan calculateLoanDetails(Loan loan) {
        Double amount = loan.getLoanAmount();
       
        
        
        if(amount < 100000) 
            throw new RuntimeException("Minimum loan amount should be 100000");
       
        Integer months =  loan.getLoanTenure() * 12;
        loan.setTotalTenure(months);
        
        Double monthlyRate = loan.getInterestRate()/(12*100);
        
        Double emi =(double) Math.round(
        		 (amount *  monthlyRate * Math.pow(1 + monthlyRate, months))
        				/
        		(Math.pow(1 + monthlyRate, months)-1));


        loan.setEmiPayable(emi);

       
        Double totalCost =(double) Math.round( emi * months);
        loan.setTotalCost(totalCost);
        
        loan.setTotalInterestPayable(totalCost - amount);
        return loan;
    }
}
/*
@Service
public class LoanService {

    @Autowired
    private LoanDao loanDao;

    public String generateLoanId() {

        Long value = loanDao.getMaxLoanId();

        if (value == null)
            value = 1000001L;
        else
            value = value + 1;

        String newId = "LI" + value;

        return newId;
    }

    public Loan setLoan(Loan loan) {

        int totalTenure = loan.getLoanTenure() * 12;

        Double totalCost = loan.getTotalInterestPayable() + 100000.00;

        loan.setTotalTenure(totalTenure);
        loan.setTotalCost(totalCost);

        return loan;
    }
}
*/