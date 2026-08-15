package edu.infosys.finCoreBankApplication.dao;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import edu.infosys.finCoreBankApplication.bean.LoanApplication;

@Repository
public class LoanApplicationDaoImpl implements LoanApplicationDao {

    @Autowired
    private LoanApplicationRepository repository;

    @Override
    public void save(LoanApplication application) {
        repository.save(application);
    }

    @Override
    public LoanApplication findById(String applicationId) {
        return repository.findById(applicationId).orElse(null);
    }

    @Override
    public List<LoanApplication> findAll() {
        return repository.findAll();
    }

    @Override
    public List<LoanApplication> findByStatus(String status) {
        return repository.findByApplicationStatusOrderByApplicationDateDesc(status);
    }

    @Override
    public List<LoanApplication> findByCustomerId(Long customerId) {
        return repository.findByCustomerIdOrderByApplicationDateDesc(customerId);
    }

    @Override
    public List<LoanApplication> findByAccountNumber(Long accountNumber) {
        return repository.findByAccountNumberOrderByApplicationDateDesc(accountNumber);
    }

    @Override
    public String getMaxApplicationId() {
        return repository.getMaxApplicationId();
    }
}
