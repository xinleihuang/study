import edu.princeton.cs.introcs.StdOut;

public class ArrayFunctionExamples {
	
	public static double mean(double[] a) {
		double sum = 0.0;
		
		for (int i = 0; i < a.length; i++) {
			sum += a[i];
		}
		
		return sum / a.length;
	}
	
	public static void exchange(String[] a, int i, int j) {
		String temp = a[i];
		a[i] = a[j];
		a[j] = temp;
	}
	
	public static int uniform(int n) {
		return (int) (Math.random() * n);
	}
	
	public static void shaffle(String[] a) {
		int n = a.length;
		for (int i = 0; i <  n; i++) {
			int r = i + uniform(n - i);
			exchange(a, i, r);
		}
	}
	
	public double dot(double[] a, double[] b) {
		double sum = 0.0;
		
		for (int i = 0; i < a.length; i++) {
			sum += a[i] * b[i];
		}
		
		return sum;
	}
	
	public static void print(double[] a) {
		StdOut.println(a.length);
		
		for (int i = 0; i < a.length; i++) {
			StdOut.println(a[i]);
		}
	}
	
}
