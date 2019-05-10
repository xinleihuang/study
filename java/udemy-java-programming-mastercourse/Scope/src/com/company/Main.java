package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        String varFour = "this is private to main()";

        ScopeCheck scopeInstance = new ScopeCheck();
//        System.out.println("scopeInstance varOne is " + scopeInstance.getVarOne());
//        System.out.println(varFour);
//
//        scopeInstance.timesTwo();
        ScopeCheck.InnerClass innerClass = scopeInstance.new InnerClass();
//        innerClass.timesTwo();

        scopeInstance.useInner();
        System.out.println("varThree is not accessible here " + innerClass.varThree);
    }
}
