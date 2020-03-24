import React from 'react';
import ImageUploaderThumbnailsList from './ImageUploaderThumbnailsList';
import ImageUploaderThumbnailPositioner from './ImageUploaderThumbnailPositioner';
import Preloader from './Preloader';
import { compress } from 'lz-string';
import {mobileDetector} from '../mobileDetector';
import './style/imageUploader.scss';

class ImageUploader extends React.Component {
  

    constructor(props){
        super(props);
        this.state = { images: [], selectedThumbnail: false, isMobileDevice: mobileDetector(), isLoadingImages: false };
        this.inputData = React.createRef();

    }
    componentDidUpdate(){
        let formData = new FormData();

        this.state.images.forEach(item =>{
            formData.append('images', item.imageData);
        });
        console.log(this.state.selectedThumbnail);
        //this.props.onAddData(formData);
    }
  

    onSelectThumbnail = id =>{
     
        this.setState({selectedThumbnail: id});
    }

    newImages = [];
    imageCount = 0;
  
    onAddImages = (event) => {
        this.setState({isLoadingImages: true});

        this.imageCount = event.target.files.length;
        let counter = 0;
        Array.from(event.target.files).map((image) =>{
          
            let reader = new FileReader();
            reader.file = image;
            reader.onload = e => {
                if (counter === this.imageCount - 1) {
                    this.newImages.push({ id: e.target.file.name + new Date().getTime(), imageData: e.target.file, imageBase64: compress(e.target.result)});
                    this.setState({images: this.newImages});
                    this.newImages = [];
                    this.setState({isLoadingImages: false});
                } else {
                    this.newImages.push({ id: e.target.file.name + new Date().getTime(), imageData: e.target.file, imageBase64: compress(e.target.result)});
                }

                counter++;
               

            }
        
            reader.readAsDataURL(image);

        });
        
        
       
    }

   
 
    onDeleteImage = imageID =>{
        let tempState = [...this.state.images];
        tempState.splice(imageID,1);
        
        this.setState({images: tempState, selectedThumbnail: false});
        
    }



    setPosition = (oldPosition, newPosition) =>{
       
        let tempState = [...this.state.images];
        // console.log("tempstate:",tempState);
       
        let itemToSwap = tempState[oldPosition];

        tempState.splice(oldPosition,1);

        
        if(oldPosition > newPosition && !this.state.isMobileDevice){
            newPosition++;
        }
        
        tempState.splice(newPosition,0,itemToSwap);
      
        this.setState({images: tempState, });

        if(this.state.isMobileDevice){
            this.setState({selectedThumbnail: newPosition,  });
        }
     }
 
     renderThumbnailPositioner = () =>{
         if(this.state.selectedThumbnail !== false && this.state.isMobileDevice){
          return(
            <ImageUploaderThumbnailPositioner
               thumbnailPosition={this.state.selectedThumbnail}
               thumbnailsCounter={this.state.images.length}
               changePosition={this.setPosition}
               deleteImage={this.onDeleteImage}
               onDisableComponent={() =>{ this.setState({selectedThumbnail: false} ) }}
               />
          );
         }
     }

    render(){
        return(
            <div className="image-uploader">
                <label htmlFor="image-uploader-input" >
                    <span className="image-uploader__button">Dodaj zdjęcia</span>
                    { this.state.images.length > 0 ?  <span className="image-uploader__file-counter">Dodano zdjęć: <span>{this.state.images.length}</span></span> : ''}
                </label>
                <input type="file" className="image-uploader__input" ref={this.inputData}
                        id="image-uploader-input" 
                        onChange={this.onAddImages}
                        accept="image/png, image/jpeg" multiple/>

                        <ImageUploaderThumbnailsList
                            isMobileDevice={this.state.isMobileDevice}
                            ifSelectedThumbnail={this.state.selectedThumbnail}
                            onSelectThumbnail={this.onSelectThumbnail}
                            onChangePosition={this.setPosition}
                            onDeleteImage={this.onDeleteImage}
                            thumbnails={this.state.images}/>

                           {this.state.isLoadingImages ? <Preloader /> : ''} 
                     
                        {this.renderThumbnailPositioner()}
                        
                        
            </div>
        );
    }
}

export default ImageUploader;