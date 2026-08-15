package edu.infosys.finCoreBankApplication.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import edu.infosys.finCoreBankApplication.bean.LoanApplication;
import edu.infosys.finCoreBankApplication.bean.LoanRepayment;
import edu.infosys.finCoreBankApplication.service.LoanApplicationService;

@RestController
@RequestMapping("/fincore")
@CrossOrigin(origins = "http://localhost:3737", allowCredentials = "true")
public class LoanApplicationController {

    @Autowired
    private LoanApplicationService service;

    @PostMapping("/loan-applications")
    public ResponseEntity<LoanApplication> apply(@RequestBody LoanApplication application) {
        return ResponseEntity.ok(service.apply(application));
    }

    @GetMapping("/loan-applications")
    public List<LoanApplication> getAll() {
        return service.getAll();
    }

    @GetMapping("/loan-applications/{applicationId}")
    public LoanApplication getById(@PathVariable String applicationId) {
        return service.getById(applicationId);
    }

    @GetMapping("/loan-applications/status/{status}")
    public List<LoanApplication> getByStatus(@PathVariable String status) {
        return service.getByStatus(status.toUpperCase());
    }

    @GetMapping("/loan-applications/customer/{customerId}")
    public List<LoanApplication> getByCustomer(@PathVariable Long customerId) {
        return service.getByCustomer(customerId);
    }

    @GetMapping("/loan-applications/account/{accountNumber}")
    public List<LoanApplication> getByAccount(@PathVariable Long accountNumber) {
        return service.getByAccount(accountNumber);
    }

    @PutMapping("/loan-applications/{applicationId}/approve")
    public LoanApplication approve(@PathVariable String applicationId) {
        return service.approve(applicationId);
    }

    @PutMapping("/loan-applications/{applicationId}/reject")
    public LoanApplication reject(@PathVariable String applicationId, @RequestBody(required = false) Map<String, String> body) {
        String reason = body == null ? null : body.get("reason");
        return service.reject(applicationId, reason);
    }

    @PostMapping("/loan-applications/{applicationId}/repayments")
    public LoanRepayment repay(@PathVariable String applicationId, @RequestBody LoanRepayment repayment) {
        return service.repay(applicationId, repayment);
    }

    @GetMapping("/loan-applications/{applicationId}/repayments")
    public List<LoanRepayment> getRepayments(@PathVariable String applicationId) {
        return service.getRepayments(applicationId);
    }

    @GetMapping("/loan-repayments/customer/{customerId}")
    public List<LoanRepayment> getRepaymentsByCustomer(@PathVariable Long customerId) {
        return service.getRepaymentsByCustomer(customerId);
    }

    @GetMapping("/loan-repayments/account/{accountNumber}")
    public List<LoanRepayment> getRepaymentsByAccount(@PathVariable Long accountNumber) {
        return service.getRepaymentsByAccount(accountNumber);
    }

    @GetMapping("/loan-application-id")
    public String generateApplicationId() {
        return service.generateApplicationId();
    }

    @GetMapping("/loan-repayment-id")
    public String generateRepaymentId() {
        return service.generateRepaymentId();
    }
}
