package com.oliver.huang;

public class StackX {
    private int maxSize;
    private char[] stackArray;
    private int top;

    public StackX(int maxSize) {
        this.maxSize = maxSize;
        this.stackArray = new char[maxSize];
        top = -1;
    }
    // put item on top of stack
    public void push(char j) {
        this.stackArray[++top] = j;
    }
    // take item from top of stack
    public char pop() {
        return stackArray[top--];
    }

    // peek at top of stack
    public char peek() {
        return stackArray[top];
    }

    public boolean isEmpty() {
        return top == -1;
    }

    public boolean isFull() {
        return top == this.maxSize - 1;
    }
}
