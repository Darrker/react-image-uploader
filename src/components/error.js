import React from 'react';
import '../components/style/error.scss';

class Error extends React.Component{

    onRemoveError = e =>{
        e.preventDefault();

        this.props.onRemoveError(this.props.content);
    }

    render(){
        return(
            <div className="error">
                <button className="error__remove-button" onClick={this.onRemoveError}>X</button>
                <span className="error__content">{this.props.content}</span>
            </div>  

        );
    }
}

export default Error;