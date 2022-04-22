import React from 'react'
import CollapsibleContent from "./CollapsibleContent.js";

function PlatformHelp() {
    return (
        <div>
            <CollapsibleContent title="How many platforms can users create">
                <p>Any amount as long as they are logged in.</p>
            </CollapsibleContent>
            <CollapsibleContent title="How many platforms can users subscribe to?">
                <p>Any amount as long as they are logged in.</p>
            </CollapsibleContent>
            <CollapsibleContent title="How can users create their own platform?">
                <p>
                    After logging in, they can tap on the Create button in order to create a new
                    platform
                </p>
            </CollapsibleContent>
        </div>
    );
}

export default PlatformHelp
