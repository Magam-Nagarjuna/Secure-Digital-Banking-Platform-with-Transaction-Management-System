package edu.infosys.finCoreBankApplication.dao;

import java.util.List;
import edu.infosys.finCoreBankApplication.bean.LoanApplication;

public interface LoanApplicationDao {

    void save(LoanApplication application);

    LoanApplication findById(String applicationId);

    List<LoanApplication> findAll();

    List<LoanApplication> findByStatus(String status);

    List<LoanApplication> findByCustomerId(Long customerId);

    List<LoanApplication> findByAccountNumber(Long accountNumber);

    String getMaxApplicationId();
}
