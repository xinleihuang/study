package com.oliver.huang;

public class PriorityQ {
    private int maxSize;
    private long[] queArray;
    private int nItems;

    public PriorityQ(int maxSize) {
        this.maxSize = maxSize;
        this.queArray = new long[maxSize];
        this.nItems = 0;
    }

    public void insert(long item) {
        int i;

        if (nItems == 0)
            queArray[nItems++] = item;
        else {
            for (i = nItems - 1; i > 0; i--) {
                if (item > queArray[j])
                    queArray[j+1] = queArray[j];
                else
                    break;
            }
            queArray[j+1] = item;
            nItems++;
        }
    }

    public long remove() {
        return queArray[--nItems];
    }

    public long peekMin() {
        return queArray[nItems-1];
    }

    public boolean isEmpty() {
        return nItems == 0;
    }

    public boolean isFull() {
        return nItems == maxSize;
    }
}
