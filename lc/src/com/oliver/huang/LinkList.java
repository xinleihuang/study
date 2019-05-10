package com.oliver.huang;

public class LinkList {
    private Link first;

    public LinkList() {
        this.first = null;
    }

    // is it empty
    public boolean isEmpty() {
        return this.first == null;
    }

    // insert at start of list
    public void insertFirst(int id, double dd) {
        Link newLink = new Link(id, dd);
        newLink.next = first;
        first = newLink;
    }

    // delete first link
    public Link deleteFirst() {
        Link temp = this.first;
        this.first = this.first.next;
        return temp;
    }

    // display the list
    public void displayList() {
        System.out.print("List first --> last: ");
        Link current = first;
        while (current != null) {
            current.displayLink();
            current = current.next;
        }
        System.out.println();
    }

    // find link with given key
    public Link find(int key) {
        Link current = this.first;
        while (current.iData != key) {
            if (current.next != null) {
                current = current.next;
            } else {
                return null;
            }
        }
        return current;
    }

    // delete link with given key
    public Link delete(int key) {
        Link current = first;
        Link previous = first;

        while (current.iData != key) {
            if (current.next == null)
                return null;
            previous = current;
            current = current.next;
        }

        if (current == this.first)
            this.first = this.first.next;
        else
            previous.next = current.next;
        return current;
    }
}
