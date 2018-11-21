import edu.princeton.cs.introcs.In;
import edu.princeton.cs.introcs.StdIn;
import edu.princeton.cs.introcs.StdOut;
import java.util.Arrays;

public class BinarySearch {
	
	public static int search(String key, String[] a) {
		return search(key, a, 0, a.length);
	}
	
	public static int search(String key, String[] a, int lo, int hi) {
		StdOut.println("lo = " + lo);
		StdOut.println("hi = " + hi);
		if (hi <= lo) return -1;
		int mid = lo + (hi - lo) / 2;
		int cmp = a[mid].compareTo(key);
		if (cmp > 0) return search(key, a, lo, mid);
		else if (cmp < 0) return search(key, a, mid + 1, hi);
		else return mid;
	}
	
	public static void main(String[] args) {
		In in = new In(args[0]);
		String s = in.readAll();
		String[] words = s.split("\\s+");
		System.err.println("Done reading words");
		
		Arrays.sort(words);
		System.err.println("Done sorting words");
		
		while (!StdIn.isEmpty()) {
			String key = StdIn.readString();
			if (search(key, words) < 0) {
				StdOut.println(key);
			}
		}
	}
	
}
