import React from 'react';
import Error from './error';

class ImageUploaderErrors extends React.Component{

    renderErrors(){
        return   this.props.errors.map((error, index) =>{
            return (
                <Error content={error} key={index} onRemoveError={ error => this.props.onRemoveError(error)}/>
            );
        });
    }

    render(){
        return(
            <div className="image-uploader__errors">
                {this.renderErrors()}
            </div>
            

        );
    }
}

export default ImageUploaderErrors;