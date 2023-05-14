import React from 'react';

const Alert = (props) => {

  const capitalise = (word) => {
    if(word === "danger"){
        word = "Error";
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  return (
    <div style={{height: '50px'}}>
    {  props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
          <center><strong>{capitalise(props.alert.type)}</strong> : <strong>{props.alert.msg}</strong></center>
      </div>}
    </div>
  )
}

export default Alert;
