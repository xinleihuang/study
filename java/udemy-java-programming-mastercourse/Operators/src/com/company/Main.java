package com.company;

public class Main {

    public static void main(String[] args) {
	    int result = 1 + 2;
        System.out.println(result);

        int previousResult = result;

        result -= 1;
        System.out.println(previousResult + " - 1 = " + result);

        boolean isAlien = false;
        if (!isAlien) {
            System.out.println("It is not an alien!");
        } else {
            System.out.println("It is an alien!");
        }

        int topScore = 100;
        if (topScore == 100) {
            System.out.println("You got the high score!");
        }

        boolean isCar = true;
        if (isCar = false) {
            System.out.println("This is a bug");
        }

        boolean wasCar = isCar ? true : false;

    }
}
