public class SumOfTwoDice {
	public static void main(String[] args) {
		int dice1 = (int)(Math.random()*6);
		int dice2 = (int)(Math.random()*6);
		
		int sum = dice1 + dice2;
		
		System.out.println(sum);
	}
}
