package edu.infosys.finCoreBankApplication.dao;

import java.util.List;
import edu.infosys.finCoreBankApplication.bean.LoanRepayment;

public interface LoanRepaymentDao {

    void save(LoanRepayment repayment);

    List<LoanRepayment> findByApplicationId(String applicationId);

    List<LoanRepayment> findByCustomerId(Long customerId);

    List<LoanRepayment> findByAccountNumber(Long accountNumber);

    String getMaxRepaymentId();
}
