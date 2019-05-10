package com.oliver.huang;

public class DoublyLink {
    public long dData;
    public DoublyLink next;
    public DoublyLink previous;

    public DoublyLink(long dData) {
        this.dData = dData;
    }

    public void displayLink() {
        System.out.print(this.dData + " ");
    }
}
