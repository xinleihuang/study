package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        Bank bank = new Bank("National US Bank");
        bank.addBranch("Chicago");
        bank.addCustomer("Chicago", "Oliver", 1.0);
        bank.addCustomer("Chicago", "Time",2.0);
        bank.addCustomer("Chicago","Jim",3.0);

        bank.addBranch("Urbana");
        bank.addCustomer("Urbana", "Oliver", 1.0);
        bank.addCustomer("Urbana", "Time",2.0);
        bank.addCustomer("Urbana","Jim",3.0);

        bank.listCustomers("Chicago", true);

        bank.listCustomers("Urbana",true);

        if(!bank.addCustomer("Champaign","Oliver",1.1)) {
            System.out.println("Error Champaign does not exist");
        }

        if(!bank.addCustomer("Chicago", "Oliver", 12.21)) {
            System.out.println("Customer already exist");
        }

    }
}
