package com.company;

public class Ceiling {
    private int height;
    private String paintedColor;

    public int getHeight() {
        return height;
    }

    public String getPaintedColor() {
        return paintedColor;
    }

    public Ceiling(int height, String paintedColor) {
        this.height = height;
        this.paintedColor = paintedColor;
    }
}
