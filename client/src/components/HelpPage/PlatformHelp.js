import React from 'react'
import CollapsibleContent from "./CollapsibleContent.js";

function PlatformHelp() {
    return (
        <div className='qna-sections'>
            <CollapsibleContent title="How many platforms can users create">
                <p>Any logged in user can create as many platforms as they want.</p>
            </CollapsibleContent>
            <CollapsibleContent title="How many platforms can users subscribe to?">
                <p>Any logged in user can subscribe to as many platforms as they want.</p>
            </CollapsibleContent>
            <CollapsibleContent title="How can users create their own platform?">
                <p>After logging in, they can tap on the Create button in order to create a new platform</p>
            </CollapsibleContent>
        </div>
    );
}

export default PlatformHelp
