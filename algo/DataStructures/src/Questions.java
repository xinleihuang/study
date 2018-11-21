import edu.princeton.cs.introcs.StdIn;
import edu.princeton.cs.introcs.StdOut;

public class Questions {
	
	public static int search(int lo, int hi) {
		if (hi - lo == 1) return lo;
		int mid = lo + (hi - lo) / 2;
		StdOut.printf("Is it less than %d?  ", mid);
		if (StdIn.readBoolean()) return search(lo, mid);
		else return search(mid, hi);
	}
	
	public static void main(String[] args) {
		int k = Integer.parseInt(args[0]);
		int n = (int) Math.pow(2, k);
		StdOut.printf("Think of an integer between %d and %d\n", 0, n - 1);
		int secret = search(0, n);
		StdOut.printf("Your number is %d\n", secret);
	}
	
}
