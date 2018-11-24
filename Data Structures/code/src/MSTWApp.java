import WGraph.Graph;

public class MSTWApp {
	public static void main(String[] args) {
		Graph theGraph = new Graph();
		
		theGraph.addVertex('A');
		theGraph.addVertex('B');
		theGraph.addVertex('C');
		theGraph.addVertex('D');
		theGraph.addVertex('E');
		theGraph.addVertex('F');
		
		theGraph.addEdge(0, 1, 6);
		theGraph.addEdge(0, 3, 2);
		theGraph.addEdge(1, 4, 10);
		theGraph.addEdge(1, 3, 7);
		theGraph.addEdge(1, 4, 7);
		theGraph.addEdge(2, 5, 8);
		theGraph.addEdge(2, 4, 5);
		theGraph.addEdge(2, 5, 6);
		theGraph.addEdge(3, 4, 12);
		theGraph.addEdge(4, 5, 7);
		
		System.out.print("Minimum spanning tree: ");
		theGraph.mstw();
		System.out.println();
	}
}
