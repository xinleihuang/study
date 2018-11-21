import edu.princeton.cs.introcs.In;
import edu.princeton.cs.introcs.StdOut;

public class StockQuote {

	private static String readHTML(String symbol) {
		In page = new In("http://finance.yahoo.com/quote/" + symbol);
		String html = page.readAll();
		if (html.contains("<title></title>")) return null;
		else return html;
	}
	
	public static double priceOf(String html) {
		int p = html.indexOf("price.0", 0);
		int from = html.indexOf(">", p);
		int to = html.indexOf("</span>", from);
		String price = html.substring(from + 1, to);
		
		return Double.parseDouble(price.replaceAll(",", ""));
	}
	
	public static String nameOf(String html) {
		int p = html.indexOf("symbol.$companyName", 0);
		int from = html.indexOf(">", p);
		int to = html.indexOf("</h6", from);
		String name = html.substring(from + 1, to);
		return name;
	}
	
	public static void main(String[] args) {
		String symbol = args[0];
		String html = readHTML(symbol);
		if (html == null) StdOut.println("Invalid symbol: " + symbol);
		else {
			StdOut.println(priceOf(html));
			StdOut.println(nameOf(html));
		}
	}
	
}
