import edu.princeton.cs.introcs.StdOut;

public class Gaussian {
	
	public static double pdf(double x) {
		return Math.exp(-x * x / 2.0) / Math.sqrt(2 * Math.PI);
	}
	
	public static double pdf(double x, double mu, double sigma) {
		return pdf((x - mu) / sigma) / sigma;
	}
	
	public static double cdf(double z) {
		if (z < -8.0) return 0.0;
		else if (z > 8.0) return 1.0;
		
		double sum = 0.0, term = z;
		
		for (int i = 3; sum + term != sum; i += 2) {
			sum += term;
			term *= (z * z / i);
		}
		
		return 0.5 + sum * pdf(z);
	}
	
	public static double cdf(double z, double mu, double sigma) {
		return cdf((z - mu) / sigma);
	}
	
	public static double inverseCDF(double y) {
		return inverseCDF(y, 1e-8, -8, 8);
	}
	
	public static double inverseCDF(double y, double delta, double lo, double hi) {
		double mid = lo + (hi - lo) / 2;
		if (hi - lo < delta) return mid;
		if (cdf(mid) > y) return inverseCDF(y, delta, lo, mid);
		else			  return inverseCDF(y, delta, mid, hi);
	}
	
	@Deprecated
	public static double phi(double z) {
		return pdf(z);
	}
	
	@Deprecated
	public static double Phi(double z) {
		return cdf(z);
	}
	
	public static void main(String[] args) {
		double z = Double.parseDouble(args[0]);
		double mu = Double.parseDouble(args[1]);
		double sigma = Double.parseDouble(args[2]);
		StdOut.println(cdf(z, mu, sigma));
		double y = cdf(z);
		StdOut.println(inverseCDF(y));
		StdOut.println(Phi(z));
	}
}
