import edu.princeton.cs.introcs.StdOut;

public class TopDownFibonacci {
	
	private static long[] f = new long[92];
	
	public static long fibonacci(int n) {
		if (n == 0) return 0;
		if (n == 1) return 1;
		
		if (f[n] > 0) return f[n];
		
		f[n] = fibonacci(n-1) + fibonacci(n-2);
		
		return f[n];
	}
	
	public static void main(String[] args) {
		int n = Integer.parseInt(args[0]);
		
		StdOut.println(n + ': ' + fibonacci(n));
	}
	
}
