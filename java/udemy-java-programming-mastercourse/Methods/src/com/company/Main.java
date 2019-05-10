package com.company;

public class Main {

    public static void main(String[] args) {
        System.out.println("Your final score was " + calculateScore(true, 800, 8, 200));
        System.out.println("Your final score was " + calculateScore(true, 10000, 8,200));
    }

    public static int calculateScore(boolean gameOver, int score, int levelCompleted, int bonus) {
        if (gameOver) {
            int finalScore = score + (levelCompleted * bonus);
            finalScore += 1000;
            return finalScore;
        }
        return -1;
    }
}
