import React from 'react';
import ImageUploaderThumbnail from './ImageUploaderThumbnail';
import CollisionsDetector from '../colisionDetection/';
class ImageUploaderThumbnailsList extends React.Component {

    state = {
        isDrag: false
    };

    dragElem;
    thumbnails = [];
 


    onSelectThumbnail = id => {
        this.props.onSelectThumbnail(id);
    }
    renderThumbnails = () => {

        var thumbnails = this.props.thumbnails.map((image, index) => {

            return <ImageUploaderThumbnail key = {
                index
            }
            ifSelectedThumbnail = {
                this.props.ifSelectedThumbnail === index ? true : false
            }
            emitThumbnail = {
                this.onEmitThumbnail
            }
            onSelectThumbnail = {
                this.onSelectThumbnail
            }
            isDrag = {
                this.state.isDrag
            }
            id = {
                index
            }
            onDeleteImage = {
                this.onDeleteImage
            }
            onDragged = {
                this.onIsDragged
            }
            onDraggedOut = {
                this.onDraggedOut
            }
            image = {
                image.imageBase64
            }

            isMobileDevice={this.props.isMobileDevice}
            />
        });

        return thumbnails;
    }


    onDeleteImage = imageID => {
      
        this.props.onDeleteImage(imageID);

    }

    // I know... This is legacy method, but i haven't had any idea to use other alternative
    componentWillUpdate() {

        this.thumbnails = [];

    }
    componentDidUpdate() {

    }

    onEmitThumbnail = (thumbnail, id) => {

            this.thumbnails.splice(id, 1);
            this.thumbnails.push({
                ref: thumbnail.current,
                id: id
            });
      


    }

    onIsDragged = (elem, startValue, dragState, id) => {

        this.setState({
            isDrag: dragState
        });

        this.dragElem = {
            ref: elem.current,
            startPosition: {
                x: startValue.x,
                y: startValue.y,

            },
            id: id

        };


    }

    onDraggedOut = (dragState) => {

        this.setState({
            isDrag: dragState
        });


        var thumbnailsSorter = new CollisionsDetector(this.thumbnails, this.dragElem);

        thumbnailsSorter.analise((item, where) => {
                console.log(item);

                switch(where){
                    case 'before':{
                        if(item.id == 0){
                            this.props.onChangePosition(this.dragElem.id, item.id);
                        }
                        else{
                            this.props.onChangePosition(this.dragElem.id, item.id-1);
                        }
                     
                        break;
                    }
                    case 'after':{
                        if(item.id == this.thumbnails.length - 1){
                            this.props.onChangePosition(this.dragElem.id, item.id);
                        }
                        else{
                            this.props.onChangePosition(this.dragElem.id, item.id );
                        }
        
                        break;
                    }
                    
        
                }
        

            },
            (items) =>
            items.forEach(item => {
                item.ref.classList.remove('before');
                item.ref.classList.remove('after');
            }));


        //  this.dragElem.ref.style.left = 'auto';
        //  this.dragElem.ref.style.top = 'auto';
        this.dragElem.ref.style.transform = 'translate(0,0)';

    }

    onMouseMove = event => {
      
     
        if (this.state.isDrag) {
          
            var thumbnailsSorter = new CollisionsDetector(this.thumbnails, this.dragElem);
            thumbnailsSorter.analise((item, where) => {
                    switch (where) {
                        case 'before': {
                            item.ref.classList.add('before');
                            break;
                        }
                        case 'after': {
                            item.ref.classList.add('after');
                            break;
                        }


                    }
                },
                (items) =>
                items.forEach(item => {
                    item.ref.classList.remove('before');
                    item.ref.classList.remove('after');
                })
            );


            let eventPosition = {
                x: 0,
                y: 0,
            };
            if (event.type == 'mousemove') {
                eventPosition.x = event.clientX;
                eventPosition.y = event.clientY;
            } else if (event.type == 'touchmove') {
                let touch = event.touches[0];
                eventPosition.x = touch.clientX;
                eventPosition.y = touch.clientY;
            }


            // this.dragElem.ref.style.left = (eventPosition.x - this.dragElem.startPosition.x) + 'px';
            // this.dragElem.ref.style.top = (eventPosition.y - this.dragElem.startPosition.y) + 'px';

            this.dragElem.ref.style.transform = `translate(${eventPosition.x - this.dragElem.startPosition.x}px, ${eventPosition.y - this.dragElem.startPosition.y}px )`;


        }
    }



    render() {
        return ( 
            <div>
                <ul
                    className = "image-uploader__thumbnails-list"
                    onMouseMove = { !this.props.isMobileDevice ? this.onMouseMove : e=>{ return false} }
                   // onTouchMove = {this.onMouseMove}
                >
            
                {this.renderThumbnails()}

                </ul>
            </div>

        );
    }
}


export default ImageUploaderThumbnailsList;