package com.company;

import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
	// write your code here
        inputThenPrintSumAndAverage();

    }

    public static void inputThenPrintSumAndAverage () {
        Scanner scanner = new Scanner(System.in);
        int count = 0, sum = 0;

        while(true) {
            boolean hasNextInt = scanner.hasNextInt();
            if (hasNextInt) {
                sum += scanner.nextInt();
                count ++;
            } else {
                break;
            }
        }
        scanner.close();
        System.out.println("SUM = " + sum + " AVG = " + sum / count);

    }
}
