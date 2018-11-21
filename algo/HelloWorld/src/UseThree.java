public class UseThree {
	public static void main(String[] args) {
		for (int i = args.length; 0 < i; i--) {
			UseArgument.main(args[i-1]);
		}
	}
}
