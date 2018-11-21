import edu.princeton.cs.introcs.StdDraw;
import edu.princeton.cs.introcs.StdIn;
import edu.princeton.cs.introcs.StdOut;

public class FunctionExamples {
	
	public static int abs(int x) {
		if (x < 0) return -x;
		else	return x;
	}
	
	public static double abs(double x) {
		if (x < 0) return -x;
		else	return x;
	}
	
	public static boolean isPrime(int n) {
		if (n < 2) return false;
		
		for (int i = 2; i <= n/i; i++) {
			if (n % i == 0) return false;
		}
		
		return true;
	}
	
	public static double harmonic(int n) {
		double sum = 0.0;
		
		for (int i = 1; i <= n; i++) {
			sum += 1.0/i;
		}
		
		return sum;
	}
	
	public static int uniform(int n) {
		return (int) (Math.random() * n);
	}
	
	public static void drawTriangle(double x0, double y0, double x1, double y1, double x2, double y2) {
		StdDraw.line(x0, y0, x1, y1);
		StdDraw.line(x0, y0, x2, y2);
		StdDraw.line(x2, y2, x1, y1);
	}
	
	public static void main(String[] args) {
		StdOut.println(abs(Integer.parseInt(args[0])));
		StdOut.println(abs(Double.parseDouble(args[1])));
		StdOut.println(isPrime(Integer.parseInt(args[2])));
		StdOut.println(harmonic(Integer.parseInt(args[3])));
		StdOut.println(uniform(Integer.parseInt(args[4])));
		drawTriangle(Double.parseDouble(args[5]), Double.parseDouble(args[6]), Double.parseDouble(args[7]), Double.parseDouble(args[8]), Double.parseDouble(args[1]), Double.parseDouble(args[9]));
	}
	
}
