import React from 'react'

function Tags(props) {
    return (
      <div className="tags">
        <a href="">#{props.platform.tag1}</a>
        <a href="">#{props.platform.tag2}</a>
        <a href="">#{props.platform.tag3}</a>
      </div>
    );
}

export default Tags
