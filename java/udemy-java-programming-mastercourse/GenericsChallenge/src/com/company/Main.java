package com.company;

public class Main {

    public static void main(String[] args) {
	// write your code here
        League<Team<FootballPlayer>> footbalLeague = new League<>("AFL");

        Team<FootballPlayer> adelaideCrows = new Team<>("Adelaide Crows");
        Team<FootballPlayer> melbourne = new Team<>("Melbourne");
        Team<FootballPlayer> hawthorn = new Team<>("Hawthorn");
        Team<FootballPlayer> fremantle = new Team<>("Fremantle");

        Team<BaseballPlayer> chicagoCubs = new Team<>("Chicago Cubs");

        footbalLeague.add(adelaideCrows);
        footbalLeague.add(melbourne);
        footbalLeague.add(hawthorn);
        footbalLeague.add(fremantle);

        footbalLeague.showLeagueTable();
    }
}
