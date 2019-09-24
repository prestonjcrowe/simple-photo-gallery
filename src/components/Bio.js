import React from 'react';
function Bio(props) {

    return (
        <>
            <div className="Bio">CSE major at the UW interested in network security research, service development, and data visualization.
            I am passionate about privacy and enjoy breaking stuff almost as much as I enjoy building it.     
            </div>
            <div className="TagContainer">
                <div className="Tag">infosec</div>
                <div className="Tag">systems</div>
                <div className="Tag">web dev</div>
                <div className="Tag">api development</div>
                <div className="Tag">internal tools</div>
                <div className="Tag">data viz</div>
            </div>

            <h3>Projects</h3>

            <div className="Projects">
            <div className="Project">
                <div className="ProjectLang">GO</div>
                <div className="ProjectName"><a href="https://github.com/prestonjcrowe/binance-order-book">Binance Orderbook</a></div>
                <div className="ProjectDescription">A basic orderbook built on Binance's API for tracking price changes and identifying trends in crypto. This program will also compute Bollinger bands as new orders come in via Binance's websocket feeds.</div>
            </div>
            <div className="Project">
                <div className="ProjectLang">PY</div>
                <div className="ProjectName"><a href="https://github.com/prestonjcrowe/shop-goodwill-bot">Goodwill Auction Bot</a></div>
                <div className="ProjectDescription">Evil bot for snatching gamecube controllers etc. Sends me email notifications for interesting auctions on shopgoodwill.com.
                Also supports notifications via twitter posts and telegram.</div>
            </div>
            <div className="Project">
                <div className="ProjectLang">C</div>
                <div className="ProjectName"><a href="https://github.com/prestonjcrowe/daiso-solver">Daiso Puzzle Solver</a></div>
                <div className="ProjectDescription">This program recursively discovers all solutions to a silly little puzzle from Daiso Japan. It was developed as a practical example of recursive backtracking for my students and admittedly to satisfy my own curiosity. Toggle PRINT_PROGRESS to print intermediate board states or only solved states.</div>
            </div>
            <div className="Project">
                <div className="ProjectLang">PY</div>
                <div className="ProjectName"><a href="https://github.com/prestonjcrowe/attu-fun">UNIX Write Annoyware</a></div>
                <div className="ProjectDescription">Bug your friends and log their activity on CSE servers! With no arguments, logs
active users to logs/TIMESTAMP.csv. Use the --evil flag to indefinitely spam a message to one or more target ttys.</div>
            </div>

            <div className="Project">
                <div className="ProjectLang">JAVA</div>
                <div className="ProjectName"><a href="https://github.com/prestonjcrowe/mtg-lifecounter">MTG Lifecounter App</a></div>
                <div className="ProjectDescription">Rewrite of an old project just for funsies, supports 1-2 players and both Standard and EDH formats. Holding buttons increments by 5, tapping increments by 1.</div>
            </div>
        </div>
        </>
    );
}

export default Bio;