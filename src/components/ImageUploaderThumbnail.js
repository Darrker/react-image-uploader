import React from 'react';


class ImageUploaderThumbnail extends React.Component {
   
    constructor(props){
        super(props);
    
        this.state = {
            isDragged: false,
        };

        this.ref = React.createRef();
    }
  
    onDeleteItem = (e) =>{
        e.preventDefault();

        this.props.onDeleteImage(this.props.order);
    }

    componentDidUpdate(){
        this.props.emitThumbnail(this.ref, this.props.id, this.props.order);
    } 
    componentDidMount(){
        this.props.emitThumbnail(this.ref, this.props.id, this.props.order);
    } 

    onMouseDown = (event) =>{
   
        let eventPosition = {
            x: 0,
            y: 0,
        };
        if(event.type === 'mousedown'){
            eventPosition.x = event.clientX;
            eventPosition.y = event.clientY;
        }
   
        
        this.setState({isDragged:true});
        this.props.onDragged(this.ref, {x: eventPosition.x - event.target.offsetLeft, y: eventPosition.y - event.target.offsetTop} ,true,this.props.id,this.props.order);
        
    }

    onMouseUp = (event) =>{
       
        this.setState({isDragged:false});
        this.props.onDraggedOut(false);
       
    }

    onClick = event =>{
 
        event.preventDefault();
        this.props.onSelectThumbnail(this.props.order);
    }
   

    render() {
        
        return(
        <li className="image-uploader__thumbnail-wrapper" style={{order: this.props.order}} >
               
            <div
                ref={this.ref}
                onMouseDown={ !this.props.isMobileDevice ? this.onMouseDown : e=>{ return false} }
                onMouseUp={ !this.props.isMobileDevice ? this.onMouseUp : e=>{ return false} }
                // onTouchStart={this.onMouseDown}
                // onTouchEnd={this.onMouseUp}   
                onClick={ this.props.isMobileDevice ? this.onClick : e=>{ return false} } 
       
                className={
                    `image-uploader__thumbnail
                     ${this.state.isDragged ? 'image-uploader__thumbnail--is-dragged': '' } 
                     ${this.props.ifSelectedThumbnail ? 'image-uploader__thumbnail--is-selected': '' } 
                    `}

                style={{backgroundImage:`url(${this.props.image } )`}}>

            </div>
            
            {!this.state.isDragged ?
             <span

                className="image-uploader__thumbnail__delete-icon"
                onClick={this.onDeleteItem}

            >X</span> : ''}
        </li>
        );
    }
}

export default ImageUploaderThumbnail;