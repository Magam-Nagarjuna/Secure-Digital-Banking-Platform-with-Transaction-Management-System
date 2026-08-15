package edu.infosys.finCoreBankApplication.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import edu.infosys.finCoreBankApplication.bean.LoanRepayment;

public interface LoanRepaymentRepository extends JpaRepository<LoanRepayment, String> {

    @Query("select max(repaymentId) from LoanRepayment")
    String getMaxRepaymentId();

    List<LoanRepayment> findByApplicationIdOrderByPaymentDateDesc(String applicationId);

    List<LoanRepayment> findByCustomerIdOrderByPaymentDateDesc(Long customerId);

    List<LoanRepayment> findByAccountNumberOrderByPaymentDateDesc(Long accountNumber);
}
