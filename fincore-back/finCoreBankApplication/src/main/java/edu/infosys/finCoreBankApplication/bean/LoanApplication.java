package edu.infosys.finCoreBankApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class LoanApplication {

    @Id
    private String applicationId;
    private String loanId;
    private Long customerId;
    private Long accountNumber; 
    private Long savingsAccountNumber;
    private Long paymentAccountNumber;
    private Double loanAmount;
    private Integer loanTenure;
    private Integer totalTenure;
    private Double interestRate;
    private Double emiPayable;
    private Double totalInterestPayable;
    private Double totalCost;
    private Double paidAmount;
    private Double outstandingAmount;
    private String applicationStatus;
    private String applicationDate;
    private String reviewedDate;
    private String rejectionReason;

    public LoanApplication() {
    }

    public String getApplicationId() {
        return applicationId;
    }

    public void setApplicationId(String applicationId) {
        this.applicationId = applicationId;
    }

    public String getLoanId() {
        return loanId;
    }

    public void setLoanId(String loanId) {
        this.loanId = loanId;
    }

    public Long getCustomerId() {
        return customerId;
    }

    public void setCustomerId(Long customerId) {
        this.customerId = customerId;
    }

    public Long getAccountNumber() {
        return accountNumber;
    }

    public void setAccountNumber(Long accountNumber) {
        this.accountNumber = accountNumber;
    }

    public Long getSavingsAccountNumber() {
        return savingsAccountNumber;
    }

    public void setSavingsAccountNumber(Long savingsAccountNumber) {
        this.savingsAccountNumber = savingsAccountNumber;
    }

    public Long getPaymentAccountNumber() {
        return paymentAccountNumber;
    }

    public void setPaymentAccountNumber(Long paymentAccountNumber) {
        this.paymentAccountNumber = paymentAccountNumber;
    }

    public Double getLoanAmount() {
        return loanAmount;

    }

    public void setLoanAmount(Double loanAmount) {
        this.loanAmount = loanAmount;

    }

    public Integer getLoanTenure() {
        return loanTenure;
    }

    public void setLoanTenure(Integer loanTenure) {
        this.loanTenure = loanTenure;
    }

    public Integer getTotalTenure() {
        return totalTenure;
    }

    public void setTotalTenure(Integer totalTenure) {
        this.totalTenure = totalTenure;
    }

    public Double getInterestRate() {
        return interestRate;
    }

    public void setInterestRate(Double interestRate) {
        this.interestRate = interestRate;
    }

    public Double getEmiPayable() {
        return emiPayable;
    }

    public void setEmiPayable(Double emiPayable) {
        this.emiPayable = emiPayable;
    }

    public Double getTotalInterestPayable() {
        return totalInterestPayable;
    }

    public void setTotalInterestPayable(Double totalInterestPayable) {
        this.totalInterestPayable = totalInterestPayable;
    }

    public Double getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(Double totalCost) {
        this.totalCost = totalCost;
    }

    public Double getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(Double paidAmount) {
        this.paidAmount = paidAmount;
    }

    public Double getOutstandingAmount() {
        return outstandingAmount;
    }

    public void setOutstandingAmount(Double outstandingAmount) {
        this.outstandingAmount = outstandingAmount;
    }

    public String getApplicationStatus() {
        return applicationStatus;
    }

    public void setApplicationStatus(String applicationStatus) {
        this.applicationStatus = applicationStatus;
    }

    public String getApplicationDate() {
        return applicationDate;
    }

    public void setApplicationDate(String applicationDate) {
        this.applicationDate = applicationDate;
    }

    public String getReviewedDate() {
        return reviewedDate;
    }

    public void setReviewedDate(String reviewedDate) {
        this.reviewedDate = reviewedDate;
    }

    public String getRejectionReason() {
        return rejectionReason;
    }

    public void setRejectionReason(String rejectionReason) {
        this.rejectionReason = rejectionReason;
    }
}
