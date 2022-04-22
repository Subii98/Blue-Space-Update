import React from 'react'
import { Container } from "./Container";

function PopUpModal(children, ...rest) {
    const triggerText = "Open form";
    const onSubmit = event => {
        event.preventDefault(event);
        console.log(event.target.name.value);
        console.log(event.target.email.value);
    };
    return (
        <Container >{children}</Container>
    )
}

export default PopUpModal
