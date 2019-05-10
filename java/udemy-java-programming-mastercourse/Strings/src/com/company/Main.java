package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        String myString = "This is a string";
        System.out.println(myString);
        myString += ", and this is more.";
        System.out.println(myString);

        String lastString = "10";
        int myInt = 50;
        lastString = lastString + myInt;
        System.out.println(lastString);

        double doubleNumber = 120.4d;
        lastString += doubleNumber;
        System.out.println(lastString);
    }
}
