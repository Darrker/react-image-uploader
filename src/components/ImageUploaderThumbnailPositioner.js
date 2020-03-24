import React from 'react';
import arrow from './style/arrow.svg'

class ImageUploaderThumbnailPositioner extends React.Component {

    positionPlus = e =>{
        e.preventDefault();
        
        this.props.changePosition(this.props.thumbnailPosition,this.props.thumbnailPosition +1);
    }

    positionMinus= e =>{
        e.preventDefault();
        
        this.props.changePosition(this.props.thumbnailPosition,this.props.thumbnailPosition -1);
    }

    positionStart = e =>{
        e.preventDefault();
        
        this.props.changePosition(this.props.thumbnailPosition,0);
    }
    onDeleteImage = e =>{
        e.preventDefault();
  
        this.props.deleteImage(this.props.thumbnailPosition);
    }

    onExit = e =>{
        e.preventDefault();
        this.props.onDisableComponent();
    }
    
    render(){
        return(
            <div className="thumbnail-positioner">
                <span className="thumbnail-positioner__title">Co chcesz zrobić?</span>
                <button onClick={this.onExit} className="thumbnail-positioner__exit-icon">X</button>
                <ul className="thumbnail-positioner__actions">

                    {this.props.thumbnailPosition > 0 ?

                         <li className="thumbnail-positioner__action thumbnail-positioner__action--set-to-start" onClick={this.positionStart}>Na początek</li>
                     
                    : ''}

                    {this.props.thumbnailPosition > 0 ?

                        <li className="thumbnail-positioner__action thumbnail-positioner__action--set-to-previous"  onClick={this.positionMinus}>
                            <img className="thumbnail-positioner__action__icon" src={arrow} />
                        </li>

                     : ''}

                    {this.props.thumbnailPosition < this.props.thumbnailsCounter-1 ?

                        <li className="thumbnail-positioner__action thumbnail-positioner__action--set-to-next" onClick={this.positionPlus}> 
                            <img className="thumbnail-positioner__action__icon" src={arrow} />
                        </li> 

                    : ''}

                    <li className="thumbnail-positioner__action thumbnail-positioner__action--delete" onClick={this.onDeleteImage}>Usuń</li>
                </ul>

            </div>
        );
    }

}

export default ImageUploaderThumbnailPositioner;