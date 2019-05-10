package com.company;

public class MobilePhone implements ITelephone{
    private int myNumber;
    private boolean isRinging;
    private boolean isOn = false;

    public MobilePhone(int myNumber) {
        this.myNumber = myNumber;
    }

    @Override
    public void powerOn() {
        System.out.println("No action taken.");
    }

    @Override
    public void dail(int phoneNumber) {
        if (isOn) {
            System.out.println("Now ringing " + phoneNumber);
        } else {
            System.out.println("Phone is off");
        }

    }

    @Override
    public void answer() {
        if (isRinging) {
            System.out.println("Answering the mobile phone");
            isRinging = false;
        }
    }

    @Override
    public boolean callPhone(int phoneNumber) {
        if (phoneNumber == myNumber && isOn) {
            isRinging = true;
            System.out.println("Ring ring");
        }
        System.out.println("Number is wrong or poweroff");
        return false;
    }

    @Override
    public boolean isRinging() {
        return false;
    }
}
