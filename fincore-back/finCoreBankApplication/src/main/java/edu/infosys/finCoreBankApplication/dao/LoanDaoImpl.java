package edu.infosys.finCoreBankApplication.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;

import edu.infosys.finCoreBankApplication.bean.Loan;

@Repository
@Service
public class LoanDaoImpl implements LoanDao {

    @Autowired
    private LoanRepository repository;

    @Override
    public void addLoan(Loan loan) {
        repository.save(loan);
    }

    @Override
    public Loan getLoanById(String loanId) {
        return repository.findById(loanId).get();
    }

    @Override
    public List<Loan> getLoans() {
        return repository.findAll();
    }

    @Override
    public void deleteLoanById(String loanId) {
        repository.deleteById(loanId);
    }

    @Override
    public String getMaxLoanId() {
        return repository.getMaxLoanId();
    }

    @Override
    public List<Loan> getLoansByStatus(String loanStatus) {
        return repository.getLoansByStatus(loanStatus);
    }

}
