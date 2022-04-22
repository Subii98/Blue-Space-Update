import React from 'react'
import CollapsibleContent from "./CollapsibleContent.js";

function LeaderboardHelp() {
    return (
        <div>
            <CollapsibleContent title="How do I use the leaderboard?">
                <p>You can click column headers to sort by that specific header!</p>
            </CollapsibleContent>
            <CollapsibleContent title="How do I improve my ranking?">
                <p>Just keep on playing more quizzes!</p>
            </CollapsibleContent>
        </div>
    )
}

export default LeaderboardHelp
