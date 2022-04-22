import React from 'react'

function Modal(props) {
    //const showHideClassName = props.show ? "modal d-block" : "modal d-none";
    return (
    <div className='modal'>
      <div className="modal-container">
        {props.children}
        {/* <a href="javascript:;" className="modal-close" onClick={props.handleClose}>
          close
        </a> */}
      </div>
    </div>
    )
}

export default Modal


