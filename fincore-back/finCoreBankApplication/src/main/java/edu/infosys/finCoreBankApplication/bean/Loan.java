package edu.infosys.finCoreBankApplication.bean;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity

public class Loan {
	
	@Id
	private String loanId;
	private Integer loanTenure;
	private Integer totalTenure;
	private Double interestRate;
	private Double emiPayable;
	private Double totalInterestPayable;
	private Double totalCost;
	private Double loanAmount;
	
	
	private String loanStatus;
	
	
	public Loan() {
		super();
		
	}


	public Loan(String loanId, Integer loanTenure, Integer totalTenure, Double interestRate, Double emiPayable,
			Double totalInterestPayable, Double totalCost, Double loanAmount, String loanStatus) {
		super();
		this.loanId = loanId;
		this.loanTenure = loanTenure;
		this.totalTenure = totalTenure;
		this.interestRate = interestRate;
		this.emiPayable = emiPayable;
		this.totalInterestPayable = totalInterestPayable;
		this.totalCost = totalCost;
		this.loanAmount = loanAmount;
		this.loanStatus = loanStatus;
	}

	
	public String getLoanId() {
		return loanId;
	}

	public void setLoanId(String loanId) {
		this.loanId = loanId;
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

	public Double getLoanAmount() {
		return loanAmount;
	}

	public void setLoanAmount(Double loanAmount) {
		this.loanAmount = loanAmount;
	}

	public String getLoanStatus() {
		return loanStatus;
	}

	public void setLoanStatus(String loanStatus) {
		this.loanStatus = loanStatus;
	}
}
