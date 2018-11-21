public class Flip {
	public static void main(String[] args) {
		double randNum =  Math.random();
		
		if (randNum < 0.5) {
			System.out.println("Head");
		} else {
			System.out.println("Tail");
		}
	}
}
