package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        ITelephone oliversPhone;
        oliversPhone = new DeskPhone(12345);
        oliversPhone.powerOn();
        oliversPhone.callPhone(12345);
        oliversPhone.answer();

        oliversPhone = new MobilePhone(23456);
        oliversPhone.powerOn();
        oliversPhone.callPhone(23456);
        oliversPhone.answer();
    }
}
