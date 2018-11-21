import edu.princeton.cs.introcs.StdOut;
import edu.princeton.cs.introcs.StdIn;

public class LongestRun {
	public static void main(String[] args) {
		int prevNum = StdIn.readInt();
		int run = 1;
		int longestRun = run;
		int consecNum = prevNum;
		
		while (!StdIn.isEmpty()) {
			int value = StdIn.readInt();
			if (value == prevNum) {
				++ run;
				if (run > longestRun) {
					longestRun = run;
					consecNum = value;
				}
			} else {
				prevNum = value;
				run = 1;
			}
		}
		
		StdOut.println("Longest run: " + longestRun);
		StdOut.println("consecutive " + consecNum);
	}
}
