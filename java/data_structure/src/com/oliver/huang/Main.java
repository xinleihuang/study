package com.oliver.huang;

import java.io.IOException;

public class Main {

    public static void main(String[] args) {
	    // reverse app
        reverse(("part"));

        // Brackets check app
        Brackets brackets = new Brackets("a{b(c]d}e");
        brackets.check();
    }

    public static void reverse(String input) {
        String output;
        Reverser theReverser = new Reverser(input);
        output = theReverser.doRev();
        System.out.println(output);
    }
}
