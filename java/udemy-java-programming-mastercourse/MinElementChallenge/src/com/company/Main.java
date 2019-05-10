package com.company;

import java.util.Arrays;
import java.util.Scanner;

public class Main {
    private static Scanner scanner =  new Scanner(System.in);

    public static void main(String[] args) {
	// write your code here
        System.out.println("Enter count:");
        int count = scanner.nextInt();
        int[] array = Arrays.copyOf(readIntegers(count),count);
        System.out.println("The minimum of the array: " + findMin(array));
    }

    private static int[] readIntegers(int number) {
        int[] array = new int[number];
        System.out.println("Enter " + number + " integers:");
        for(int i = 0; i < number; i++) {
            array[i] = scanner.nextInt();
        }
        return array;
    }

    private static int findMin(int[] array) {
        int minimum = Integer.MAX_VALUE;
        for(int i = 0; i < array.length; i++) {
            if (minimum > array[i])
                minimum = array[i];
        }
        return minimum;
    }
}
