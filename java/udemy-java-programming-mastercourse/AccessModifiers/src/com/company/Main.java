package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        Account timesAccount = new Account("Tim");
        timesAccount.deposit(1000);
        timesAccount.withdraw(500);;
        timesAccount.withdraw(-200);
        timesAccount.deposit(-20);
        timesAccount.calculateBalance();

        System.out.println("Balance on account is " + timesAccount.getBalance());
    }
}
