package sample;

import javafx.application.Platform;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.Label;
import javafx.scene.control.TextField;

public class Controller {
    @FXML
    private TextField nameField;
    @FXML
    private Button helloButton;
    @FXML
    private Button byeButton;
    @FXML
    private CheckBox checkBox;
    @FXML
    private Label label;

    @FXML
    public void initialize() {
        helloButton.setDisable(true);
        byeButton.setDisable(true);
    }

    @FXML
    public void onButtonClicked(ActionEvent evt) {
        if (evt.getSource().equals(helloButton)) {
            System.out.println("Hello, " + nameField.getText());
        } else if (evt.getSource().equals(byeButton)) {
            System.out.println("Bye, " + nameField.getText());
        }

        Runnable task = new Runnable() {
            @Override
            public void run() {
                try {
                    Thread.sleep(5000);
                    Platform.runLater(new Runnable() {
                        @Override
                        public void run() {
                            String s = Platform.isFxApplicationThread() ? "UI Thread" : "Background Thread";
                            System.out.println("I am updating the label on the: " + s);
                            label.setText("We did something");
                        }
                    });

                } catch (InterruptedException evt) {

                }
            }
        };

        new Thread(task).start();

        if(checkBox.isSelected()) {
            nameField.clear();
            initialize();
        }
    }
    @FXML
    public void handleKeyRelease() {
        String text = nameField.getText();
        boolean disableButtons = text.isEmpty() || text.trim().isEmpty();
        helloButton.setDisable(disableButtons);
        byeButton.setDisable(disableButtons);
    }
    @FXML
    public void handleChange() {
        System.out.println("Checkbox is " + (checkBox.isSelected() ? "checked" : "not checked"));

    }
}
