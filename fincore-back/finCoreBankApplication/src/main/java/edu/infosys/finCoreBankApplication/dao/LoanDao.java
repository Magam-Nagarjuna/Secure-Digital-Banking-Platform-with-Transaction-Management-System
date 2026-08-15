package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import edu.infosys.finCoreBankApplication.bean.Loan;

public interface LoanDao {

    public void addLoan(Loan loan);

    public Loan getLoanById(String loanId);

    public List<Loan> getLoans();

    public void deleteLoanById(String loanId);

    public String getMaxLoanId();

    public List<Loan> getLoansByStatus(String status);

//previous you if they needed
//    public List<Loan> getLoansByCustomerId(Long customerId);
//    public List<Loan> getLoansByAccountNumber(Long accountNumber);
//    public List<Loan> getLoansByLoanAmount(Double loanAmount);
//    public List<Loan> getLoansByInterestRate(Double interestRate);
//    public List<Loan> getLoansByLoanTenure(Integer loanTenure);
//    public Double getOutstandingAmount(String loanId);
}
