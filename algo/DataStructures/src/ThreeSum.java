import edu.princeton.cs.introcs.StdIn;
import edu.princeton.cs.introcs.StdOut;

public class ThreeSum {
	
	public static void printAll(int[] a) {
		int n = a.length;
		for (int i = 0; i < n; i ++) {
			for (int j = i + 1; j < n; j ++) {
				for (int k = j + 1; k < n; k++) {
					if (a[k] + a[j] + a[i] == 0) {
						StdOut.println(a[i] + ' ' + a[j] + ' ' + a[k]);
					}
				}
			}
		}
	}
	
	public static int count(int[] a) {
		int n = a.length;
		int count = 0;
		for (int i = 0; i < n; i ++) {
			for (int j = i + 1; j < n; j ++) {
				for (int k = j + 1; k < n; k++) {
					if (a[k] + a[j] + a[i] == 0) {
						count++;
					}
				}
			}
		}
		return count;
	}
	
	public static void main(String[] args) {
		int [] a = StdIn.readAllInts();
		StopWatch timer = new StopWatch();
		int count = count(a);
		StdOut.println("elapsed time: " + timer.elapsedTime());
		StdOut.println(count);
	}
}
