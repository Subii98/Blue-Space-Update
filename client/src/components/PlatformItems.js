import React, { useEffect, useState } from 'react';
import Platform from './Platform.js';

function PlatformItems(props) {

  useEffect(() => {

  }, [props])

  return (
    <>
      <Platform platforms={props.currentItems} row={props.row}/>
    </>
  );
}

export default PlatformItems