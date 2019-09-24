import React from 'react';

function Projects(props) {

    return (
        <div className="Projects">
            <div className="Project">
                <div className="ProjectLang">go</div>
                <div className="ProjectName">binance orderbook</div>
                <div className="ProjectDescription">A basic orderbook built on Binance's API for tracking price changes and identifying trends in crypto. This program will also compute Bollinger bands as new orders come in via Binance's websocket feeds.</div>
            </div>
            <div className="Project">
                <div className="ProjectLang">py</div>
                <div className="ProjectName">goodwill online auction bot</div>
                <div className="ProjectDescription">Evil bot for snatching gamecube controllers etc. Sends me email notifications for interesting auctions on shopgoodwill.com.
                Also supports notifications via twitter posts and telegram.</div>
            </div>
            <div className="Project">
                <div className="ProjectLang">c</div>
                <div className="ProjectName">daiso puzzle solver</div>
                <div className="ProjectDescription">This program recursively discovers all solutions to a silly little puzzle from Daiso Japan. It was developed as a practical example of recursive backtracking for my CSE 143 students and admittedly to satisfy my own curiosity. Set PRINT_PROGRESS to 1 to print the board state after each piece is placed, or 0 to print only the solved board states.</div>
            </div>
            <div className="Project">
                <div className="ProjectLang">py</div>
                <div className="ProjectName">UNIX write annoyware</div>
                <div className="ProjectDescription">Bug your friends and log their activity on attu! With no arguments, logs
active users to logs/TIMESTAMP.csv. Use the --evil flag to indefinitely spam a message to one or more targets.</div>
            </div>

            <div className="Project">
                <div className="ProjectLang">java</div>
                <div className="ProjectName">mtg lifecounter app</div>
                <div className="ProjectDescription">Rewrite of an old project just for funsies, supports 1-2 players and both Standard and EDH formats. Holding buttons increments by 5, tapping increments by 1.</div>
            </div>
        </div>
    );
}

export default Projects;