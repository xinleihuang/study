package com.company;

public class Motherboard {
    private String model;
    private String manufacturer;
    private int ramSlots;
    private int carSlots;
    private String bios;

    public Motherboard(String model, String manufacturer, int ramSlots, int carSlots, String bios) {
        this.model = model;
        this.manufacturer = manufacturer;
        this.ramSlots = ramSlots;
        this.carSlots = carSlots;
        this.bios = bios;
    }

    public void loadProgram(String programName) {
        System.out.println("Program " + programName + " is loading");
    }

    public String getModel() {
        return model;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public int getRamSlots() {
        return ramSlots;
    }

    public int getCarSlots() {
        return carSlots;
    }

    public String getBios() {
        return bios;
    }
}
