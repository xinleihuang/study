public class PowerOfTwo {
	public static void main(String[] args) {
		int limit = Integer.parseInt(args[0]);
		int startPoint = 0;
		
		while (Math.pow(2, startPoint) <= limit)
		{
			System.out.println(startPoint);
			startPoint++;
		}
	}
}
