package edu.infosys.finCoreBankApplication.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import edu.infosys.finCoreBankApplication.bean.LoanRepayment;

@Repository
public class LoanRepaymentDaoImpl implements LoanRepaymentDao {

    @Autowired
    private LoanRepaymentRepository repository;

    @Override
    public void save(LoanRepayment repayment) {
        repository.save(repayment);
    }

    @Override
    public List<LoanRepayment> findByApplicationId(String applicationId) {
        return repository.findByApplicationIdOrderByPaymentDateDesc(applicationId);
    }

    @Override
    public List<LoanRepayment> findByCustomerId(Long customerId) {
        return repository.findByCustomerIdOrderByPaymentDateDesc(customerId);
    }

    @Override
    public List<LoanRepayment> findByAccountNumber(Long accountNumber) {
        return repository.findByAccountNumberOrderByPaymentDateDesc(accountNumber);
    }

    @Override
    public String getMaxRepaymentId() {
        return repository.getMaxRepaymentId();
    }
}
