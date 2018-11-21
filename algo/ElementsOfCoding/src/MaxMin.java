import edu.princeton.cs.introcs.StdOut;

public class MaxMin {
	public static void main(String[] args) {
		int max = StdIn.readInt();
		int min = StdIn.readInt();
		
		while (!StdIn.isEmpty()) {
			int value = StdIn.readInt();
			max = Math.max(max, value);
			min = Math.min(min, value);
		}
		
		StdOut.println("Maximum value is " + max);
		StdOut.println("Minimum value is " + min);
	}
}
