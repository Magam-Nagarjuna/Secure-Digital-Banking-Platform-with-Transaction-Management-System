package edu.infosys.finCoreBankApplication.dao;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import edu.infosys.finCoreBankApplication.bean.LoanApplication;

public interface LoanApplicationRepository extends JpaRepository<LoanApplication, String> {


    @Query(value = "SELECT application_id FROM loan_application ORDER BY CAST(REGEXP_REPLACE(application_id, '[^0-9]', '') AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    String getMaxApplicationId();

    List<LoanApplication> findByApplicationStatusOrderByApplicationDateDesc(String status);

    List<LoanApplication> findByCustomerIdOrderByApplicationDateDesc(Long customerId);

    List<LoanApplication> findByAccountNumberOrderByApplicationDateDesc(Long accountNumber);
}