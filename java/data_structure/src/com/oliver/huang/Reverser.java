package com.oliver.huang;

public class Reverser {
    private String input;
    private String output;

    public Reverser(String input) {
        this.input = input;
    }
    // reverse the string
    public String doRev() {
        int stackSize = input.length();
        StackX theStack = new StackX(stackSize);

        for (int i = 0; i < stackSize; i++) {
            char ch = input.charAt(i);
            theStack.push(ch);
        }
        output = "";
        while (!theStack.isEmpty()) {
            output += theStack.pop();
        }

        return output;
    }
}
