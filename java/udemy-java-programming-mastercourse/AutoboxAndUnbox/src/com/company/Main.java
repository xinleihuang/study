package com.company;

import java.util.ArrayList;

public class Main {

    public static void main(String[] args) {
	// write your code here
        ArrayList<Integer> integerArrayList = new ArrayList<Integer>();
        for (int i = 0; i < 10; i++) {
            // autoboxing
            integerArrayList.add(Integer.valueOf(i));
        }

        for (int i = 0; i < 10; i++) {
            // unboxing
            System.out.println(i + " -> " + integerArrayList.get(i).intValue());
        }

        Integer myIntValue = 56; // Integer.valueOf(56)
        int myInt = myIntValue; // myIntValue.intValue();
        System.out.println(myIntValue.intValue());
        System.out.println(myInt);

        ArrayList<Double> doubleArrayList = new ArrayList<Double>();
        for (double dbl = 0.0; dbl <= 10.0; dbl += 0.5) {
            doubleArrayList.add(dbl);
        }

        for (int i = 0; i < doubleArrayList.size(); i++) {
            double value = doubleArrayList.get(i);
            System.out.println(i + " -> " + value);
        }
    }
}
