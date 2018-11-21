
public class AddInts {
	public static void main(String[] args)  {
		int n = Integer.parseInt(args[0]);
		int sum = 0;
		for (int i = 0; i < n; i++) {
			int value = Integer.parseInt(System.console().readLine());
			sum += value;
		}
		System.out.println("Sum is " + sum);
	}
}