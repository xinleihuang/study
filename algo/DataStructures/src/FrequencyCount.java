import edu.princeton.cs.introcs.StdIn;
import edu.princeton.cs.introcs.StdOut;

public class FrequencyCount {
	
	public static void main(String[] args) {
		String s = StdIn.readAll();
		String[] words = s.split("\\s+");
		
		Merge.sort(words);
		
		Counter[] zipf = new Counter[words.length];
		int m = 0;
		for (int i = 0; i < words.length; i++) {
			if (i == 0 || !words[i].equals(words[i-1])) {
				zipf[m++] = new Counter(words[i], words.length);
			}
			zipf[m-1].increment();
		}
		
		Merge.sort(zipf, 0, m);
		for (int j = m - 1; j >= 0; j--) {
			StdOut.println(zipf[j]);
		}
	}
	
}
