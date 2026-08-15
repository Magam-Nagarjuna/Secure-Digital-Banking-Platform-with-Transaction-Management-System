package edu.infosys.finCoreBankApplication.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.infosys.finCoreBankApplication.bean.Loan;
import edu.infosys.finCoreBankApplication.dao.LoanDao;
import edu.infosys.finCoreBankApplication.service.LoanService;

@RestController
@RequestMapping("/fincore/")
@CrossOrigin(origins="http://localhost:3737",allowCredentials = "true")

public class LoanController {

	@Autowired
	private LoanDao loanDao;
	@Autowired
	private LoanService service;

	@PostMapping("/loan")
	public void addLoan(@RequestBody Loan loan) {
		loan.setLoanId(service.generateLoanId());
		loan =service.calculateLoanDetails(loan);
		loan.setLoanStatus("A");
		loanDao.addLoan(loan);
	}

	@PutMapping("/loan")
	public void updateLoan(@RequestBody Loan loan) {
		loan = service.calculateLoanDetails(loan);
		loanDao.addLoan(loan);
	}

	@GetMapping("/loan/{loanId}")
	public Loan getLoanById(@PathVariable String loanId) {
		return loanDao.getLoanById(loanId);
	}

	@GetMapping("/loan")
	public List<Loan> getLoans(){
		return loanDao.getLoans();
	}

	@DeleteMapping("/loan/{loanId}")
	public void deleteLoanById(@PathVariable String loanId) {
		loanDao.deleteLoanById(loanId);
	}

	
	@GetMapping("/loan-list")
	public List<Loan> getActiveLoans(){

		return service.getActiveLoans();

	}
	@GetMapping("/loan-id")
	public String generateLoanId() {
		return service.generateLoanId();
	}


	@GetMapping("/loan-status/{status}")
	public List<Loan> getLoansByStatus(@PathVariable String status) {
		return loanDao.getLoansByStatus(status);
	}
}