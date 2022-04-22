import React from 'react'

export default function MessageModal(props){
  return(
    <div className={ `alert alert-${props.variant || 'info'}`}>
        {props.children}
    </div>
  )
}

//working on it