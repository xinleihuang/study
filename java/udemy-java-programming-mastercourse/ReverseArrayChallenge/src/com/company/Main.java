package com.company;

import java.util.Arrays;
import java.util.Scanner;

public class Main {

    private static Scanner scanner = new Scanner(System.in);

    public static void main(String[] args) {
	// write your code here
        System.out.println("Enter count: ");
        int count = scanner.nextInt();
        int[] array = readIntegers(count);
        reverse(array);
        System.out.println("Reversed Array = " + Arrays.toString(array));
    }

    private static int[] readIntegers(int count) {
        System.out.println("Enter " + count + " integers:");
        int[] array = new int[count];
        for(int i = 0; i < count; i++)
            array[i] = scanner.nextInt();
        return array;
    }

    private static void reverse(int[] array) {
        int maxIndex = array.length - 1;
        int halfLength = array.length / 2;

        for(int i = 0; i < halfLength; i++) {
            int temp = array[i];
            array[i] = array[maxIndex - i];
            array[maxIndex - i] = temp;
        }
    }
}
