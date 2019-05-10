package com.oliver.huang;

public class Link {
    public int iData;
    public double dData;
    public Link next;

    public Link(int iData, double dData) {
        this.iData = iData;
        this.dData = dData;
    }

    // display the link
    public void displayLink() {
        System.out.print("{" + iData + ", " + dData + "}");
    }
}
