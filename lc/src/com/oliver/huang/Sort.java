package com.oliver.huang;

import java.util.Arrays;

public class Sort {
    int[] array;
    boolean ascending;

    public Sort(int[] array, boolean ascending) {
        this.array = array;
        this.ascending = ascending;
    }

    public int[] getArray() {
        return array;
    }

    public void setArray(int[] array) {
        this.array = array;
    }

    public boolean isAscending() {
        return ascending;
    }

    public void setAscending(boolean ascending) {
        this.ascending = ascending;
    }

    @Override
    public String toString() {
        return "Sort{" +
                "array=" + Arrays.toString(array) +
                '}';
    }

    public void selection() {
        int min = 0;
        for (int i = 0; i < this.array.length - 1; i++) {
            min = i;
            for (int j = i + 1; j < this.array.length; j++) {
                if (this.array[j] < this.array[min])
                    min = j;
            }
            this.swap(i, min);
        }
    }

    private void swap(int i, int j) {
        if (i == j) return;
        int temp = this.array[i];
        this.array[i] = this.array[j];
        this.array[j] = temp;
    }
}
