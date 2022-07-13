import React from 'react'
import { Container } from "./Container";

function PopUpModal(children, ...rest) {
    const triggerText = "Open form";
    const onSubmit = event => {
        event.preventDefault(event);
    };
    return (
        <Container >{children}</Container>
    )
}

export default PopUpModal
