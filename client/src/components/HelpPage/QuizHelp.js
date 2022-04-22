import React from 'react'
import CollapsibleContent from "./CollapsibleContent.js";

function QuizHelp() {
    return (
        <div>
            <CollapsibleContent title="How many quizzes can users create?">
                <p>Any amount they want but, they have to be a platform owner</p>
            </CollapsibleContent>
            <CollapsibleContent title="How many answers can a question have?">
                <p>Only up to 4.</p>
            </CollapsibleContent>
        </div>
    );
}

export default QuizHelp
