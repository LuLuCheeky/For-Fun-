import javax.swing.*;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

public class FlashScreen {
    public static void main(String[] args) {
        JFrame frame = new JFrame("Screen Flash");
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setSize(500, 500);

        // Create main panel
        JPanel panel = new JPanel();
        frame.add(panel);

        // Timer to toggle colors every 250 milliseconds
        Timer timer = new Timer(250, new ActionListener() {
            private boolean isWhite = true;

            @Override
            public void actionPerformed(ActionEvent e) {
                if (isWhite) {
                    panel.setBackground(Color.WHITE);
                } else {
                    panel.setBackground(Color.BLACK);
                }
                panel.repaint();
                isWhite = !isWhite;
            }
        });

        timer.start();
        frame.setVisible(true);
    }
}
