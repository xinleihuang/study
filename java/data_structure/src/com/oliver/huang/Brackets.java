package com.oliver.huang;

public class Brackets {
    private String input;
    private BracketChecker bracketChecker;

    public Brackets(String input) {
        this.input = input;
        this.bracketChecker = new BracketChecker(input);
    }

    public void check() {
        this.bracketChecker.check();
    }

    class StackX {
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

    class BracketChecker {
        private String input;

        public BracketChecker(String input) {
            this.input = input;
        }

        public void check() {
            int stackSize = input.length();
            StackX theStack = new StackX(stackSize);

            for (int i = 0; i < stackSize; i++) {
                char ch = input.charAt(i);
                switch (ch) {
                    case '{':
                    case '[':
                    case '(':
                        theStack.push(ch);
                        break;
                    case '}':
                    case ']':
                    case ')':
                        if (!theStack.isEmpty()) {
                            char chx = theStack.pop();
                            if (chx == '{' && ch != '}' ||
                                chx == '[' && ch != ']' ||
                                chx == '(' && ch != ')')
                                System.out.println("Error: " + ch + " at " + i);
                        }
                        else
                            System.out.println("Error: " + ch + " at " + i);
                        break;
                }
            }

            if (!theStack.isEmpty())
                System.out.println("Error: missing right delimiter");
        }
    }
}
