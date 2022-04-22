import React from 'react'
import CollapsibleContent from "./CollapsibleContent.js";

function StoreHelp() {
    return (
        <div>
            <CollapsibleContent title="How do I buy items from the store?">
                <p>Clicking on item will lead to a popup. Then confirming the popup will lead you to buy the item if you have enough points!</p>
            </CollapsibleContent>
            <CollapsibleContent title="Do I have to pay again to change badges or titles?">
                <p>Everytime you want to change badges or titles you will have to pay again.</p>
            </CollapsibleContent>
        </div>
    );
}

export default StoreHelp
