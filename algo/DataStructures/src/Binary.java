import edu.princeton.cs.introcs.StdOut;

public class Binary {

	public static void main(String[] args) {
		int n = Integer.parseInt(args[0]);
		
		int power = 1;
		while (power <= n/2) {
			power *= 2;
		}
		
		while (power > 0) {
			
			if (n < power) {
				StdOut.print(0);
			}
			else {
				StdOut.print(1);
				n -= power;
			}
			
			power /= 2;
		}
		
		StdOut.println();
		
	}

}
