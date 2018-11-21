import edu.princeton.cs.introcs.StdAudio;
import edu.princeton.cs.introcs.StdIn;

public class PlayThatTuneDeluxe {
	
	public static double[] sum(double[] a, double[] b, double awt, double bwt) {
		
		assert a.length == b.length;
		
		double[] c = new double[a.length];
		for (int i = 0; i < a.length; i++) {
			c[i] = a[i]*awt + b[i]*bwt;
		}
		
		return c;
		
	}
	
	public static double[] tone(double hz, double duration) {
		int n = (int) (StdAudio.SAMPLE_RATE * duration);
		double[] a = new double[n + 1];
		
		for (int i = 0; i <= n; i++) {
			a[i] = Math.sin(2 * Math.PI * i * hz / StdAudio.SAMPLE_RATE);
		}
		
		return a;
	}
	
	public static double[] note(int pitch, double duration) {
		double hz = 440.0 * Math.pow(2, pitch / 12.0);
		double[] a = tone(hz, duration);
		double[] hi = tone(2*hz, duration);
		double[] lo = tone(hz/2.0, duration);
		double[] h = sum(hi, lo, 0.5, 0.5);
		return sum(a, h, 0.5, 0.5);
	}
	
	public static void main(String[] args) {
		
		while (!StdIn.isEmpty()) {
			int pitch = StdIn.readInt();
			double duration = StdIn.readDouble();
			double[] a = note(pitch, duration);
			StdAudio.play(a);
		}
		
	}
	
}
