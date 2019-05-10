package com.oliver.huang;

public class DoublyLinkedList {
    private DoublyLink first;
    private DoublyLink last;

    public DoublyLinkedList() {
        this.first = null;
        this.last = null;
    }

    public boolean isEmpty() {
        return this.first == null;
    }

    public void insertFirst(long dd) {
        DoublyLink newLink = new DoublyLink(dd);

        if (isEmpty()) {
            last = newLink;
        } else {
            first.previous = newLink;
        }

        newLink.next = first;
        first = newLink;
    }
}
