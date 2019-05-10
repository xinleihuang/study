package com.company;

public class Main {

    public static void main(String[] args) {
	    byte byteNumber = 10;
	    short shortNumber = 20;
	    int intNumber = 50;
	    long longNumber = 50000L + 10L * (byteNumber + shortNumber + intNumber);

        System.out.println(longNumber);
    }
}
