package edu.infosys.finCoreBankApplication.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import edu.infosys.finCoreBankApplication.bean.Account;
import edu.infosys.finCoreBankApplication.bean.Customer;
import edu.infosys.finCoreBankApplication.dao.AccountDao;
import edu.infosys.finCoreBankApplication.dao.CustomerDao;
import edu.infosys.finCoreBankApplication.service.CustomerService;

@RestController
@RequestMapping("/fincore/")
@CrossOrigin(origins = "http://localhost:3737", allowCredentials = "true")
public class CustomerController {

    @Autowired
    private CustomerDao customerDao;

    @Autowired
    private CustomerService service;

    @Autowired
    private AccountDao accountDao;

    @PostMapping("/customer")
    public void addCustomer(@RequestBody Customer customer) {
        Customer newCustomer = service.setCustomerDetails(customer);
        customerDao.addCustomer(newCustomer);
    }

    @GetMapping("/customer/{customerid}")
    public Customer getCustomerById(@PathVariable("customerid") Long customerId) {
        return customerDao.getCustomerById(customerId);
    }

    @GetMapping("/customer")
    public List<Customer> getCustomers() {
        return customerDao.getCustomers();
    }

    @DeleteMapping("/customer/{customerid}")
    public void deleteCustomerById(@PathVariable("customerid") Long customerId) {
        customerDao.deleteCustomerById(customerId);
    }

    @PutMapping("/customer")
    public void updateCustomer(@RequestBody Customer customer) {

        customerDao.addCustomer(customer);

        
        List<Account> accounts =
                accountDao.getAccountsByCustomerId(customer.getCustomerId());

        if (accounts != null) {
            for (Account account : accounts) {
                account.setStatus(customer.getStatus());
                accountDao.addAccount(account);
            }
        }
    }

    @GetMapping("/cust-info")
    public Long generateCustomerId() {
        return service.generateCustomerId();
    }

    @GetMapping("/cust-info/{status}")
    public List<Customer> getCustomerByStatus(@PathVariable String status) {
        return customerDao.getCustomerByStatus(status);
    }

    @GetMapping("/cust-chk")
    public Integer checkCustomer() {
        int flag = -1;

        if (service.checkCustomer())
            flag = 1;
        else
            flag = 0;

        return flag;
    }

    @GetMapping("/cust-user")
    public Customer getCustomerByUsername() {
        return service.getCustomerByUsername();
    }

    @GetMapping("/cust-ids")
    public List<Long> getAllCustomerIds() {
        return customerDao.getAllCustomerIds();
    }

}
