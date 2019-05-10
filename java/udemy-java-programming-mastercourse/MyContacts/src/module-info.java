module MyContacts {
    requires javafx.fxml;
    requires javafx.controls;
    requires jlfgr;
    requires java.xml;

    opens sample;
    opens sample.datamodel;
}