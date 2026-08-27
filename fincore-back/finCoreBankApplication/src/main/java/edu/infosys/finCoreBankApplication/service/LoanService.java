
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

            long current = digits.isEmpty()
                    ? LOAN_ID_START - 1
                    : Long.parseLong(digits);

            nextId = current + 1;
        }

        return LOAN_ID_PREFIX + nextId;
    }

    public List<Loan> getActiveLoans() {

        return loanDao.getLoansByStatus("A");
    }

    public Loan calculateLoanDetails(Loan loan) {

        Double amount = loan.getLoanAmount();

        if (amount == null || amount < 100000) {

            throw new RuntimeException(
                    "Minimum loan amount should be 100000");
        }

        

        Double years = loan.getLoanTenure();

        if (years == null || years <= 0) {

            throw new RuntimeException(
                    "Loan tenure should be greater than zero");
        }

       
        Integer months = (int) Math.round(years * 12);

        if (months <= 0) {

            throw new RuntimeException(
                    "Loan tenure must be at least 1 month");
        }

        loan.setTotalTenure(months);

        Double interestRate = loan.getInterestRate();

        if (interestRate == null || interestRate <= 0) {

            throw new RuntimeException(
                    "Interest rate should be greater than zero");
        }

        Double monthlyRate =
                interestRate / (12 * 100);

        Double factor =
                Math.pow(1 + monthlyRate, months);

        Double emi =
                (amount * monthlyRate * factor)
                        / (factor - 1);

        emi = (double) Math.round(emi);

        loan.setEmiPayable(emi);

        Double totalCost =
                (double) Math.round(emi * months);

        loan.setTotalCost(totalCost);

        loan.setTotalInterestPayable(
                totalCost - amount);

        return loan;
    }
}

