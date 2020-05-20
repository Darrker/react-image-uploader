import React from 'react';
import ImageUploaderThumbnailsList from './ImageUploaderThumbnailsList';
import ImageUploaderThumbnailPositioner from './ImageUploaderThumbnailPositioner';
import Preloader from './Preloader';
import axios from 'axios';
import {mobileDetector} from '../mobileDetector';
import './style/imageUploader.scss';
import ImageUploaderErrors from './imageUploaderErrors';
class ImageUploader extends React.Component {
  

    constructor(props){
        super(props);
        this.state = { images: [], selectedThumbnail: false, isMobileDevice: !mobileDetector(), isLoadingImages: false, errors: [] };
        this.inputData = React.createRef();

    }
    componentDidUpdate(){
        let formData = new FormData();
        let sortedImages = this.state.images.sort((a,b) => a-b);
        sortedImages.forEach(item =>{
            formData.append('images', item.imageData, item.imageData.name);
            
        });
        
        if(this.props.imageData){
             this.props.imageData(formData);
        }
     
    }
  

    onSelectThumbnail = order =>{
     
        this.setState({selectedThumbnail: order});
    }

    newImages = [];

  
    onAddImages = (event) => {
 

        let eventFiles = event.target.files;
        let data = new FormData();
        Array.from(event.target.files).forEach((image) =>{
            if((/\.(gif|jpe?g|tiff|png|webp|bmp)$/i).test(image.name)) {
                data.append(this.props.requestDataName, image, image.name);
            }
            else{
                this.setState({errors: ['Nieprawidlowy typ pliku']})
            }

        });
        
        if(!this.state.errors.length){
 
            this.setState({images: [],isLoadingImages: true});

            axios.post(this.props.requestURL,data,
                    { headers: {
                        'x-access-token': 'od0zoE9JfjkeUi0gvsXG'
                    }
                })
                .then(response =>{
                   response.data.forEach((image, index) =>{
                        this.newImages.push({ id: image.name , imageData: eventFiles[index], imageSRC: image.url, order: index});
                   });
                   this.setState({images: this.newImages,isLoadingImages: false});
                     
                   this.newImages = [];
                }).catch(error=>{
                    this.setState({errors: ['Błąd serwera - spróbuj ponownie później'], isLoadingImages: false});
                });
            
        }
    
       
    }

   
 
    onDeleteImage = order =>{
        let tempState = [...this.state.images];
        let deleteIndex = tempState.findIndex(elem => elem.order === order);

        if(deleteIndex !== -1){
            tempState.splice(deleteIndex,1);
            tempState.forEach(item =>{
                if(item.order > order){
                    item.order--;
                }
            });
         
            this.setState({images: tempState, selectedThumbnail: false});
        }

    
        
    }

    decrementOrder(order, rangeStart, rangeEnd){
        if(order >= rangeStart && order <= rangeEnd){
            return --order;
        }
        return order;
    }

    incrementOrder(order, rangeStart, rangeEnd){
        if(order >= rangeStart && order <= rangeEnd){
            return ++order;
        }
        return order;
    }

    setPosition = (oldPositionOrder, newPositionOrder) =>{
        let tempState = [...this.state.images];
        let oldPositionIndex = tempState.findIndex(item => item.order === oldPositionOrder );
        if( oldPositionIndex !== -1 ){

            if(oldPositionOrder < newPositionOrder){
                tempState.forEach(image =>{
                    image.order = this.decrementOrder(image.order, oldPositionOrder, newPositionOrder );
                });
            }

            if(oldPositionOrder > newPositionOrder){
                tempState.forEach(image =>{
                    image.order = this.incrementOrder(image.order, newPositionOrder,oldPositionOrder );
                });
            }


            tempState[oldPositionIndex].order = newPositionOrder;
            this.setState({images: tempState, });

            if(this.state.isMobileDevice){
            
                this.setState({    selectedThumbnail: newPositionOrder,});
            }

        }
     }

   setPosition = (oldPositionOrder, newPositionOrder) =>{
        let tempState = [...this.state.images];
        let oldPositionIndex = tempState.findIndex(item => item.order === oldPositionOrder );
        if( oldPositionIndex !== -1 ){

            if(oldPositionOrder < newPositionOrder){
                tempState.forEach(image =>{
                    image.order = this.decrementOrder(image.order, oldPositionOrder, newPositionOrder );
                });
            }

            if(oldPositionOrder > newPositionOrder){
                tempState.forEach(image =>{
                    image.order = this.incrementOrder(image.order, newPositionOrder,oldPositionOrder );
                });
            }


            tempState[oldPositionIndex].order = newPositionOrder;
            this.setState({images: tempState, });

            if(this.state.isMobileDevice){
            
                this.setState({    selectedThumbnail: newPositionOrder,});
            }

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

    onRemoveError = error =>{
        let tempState = [...this.state.errors];
        let filteredState = tempState.filter(item => {
            return item !== error;
        });

        this.setState({errors: filteredState });
   

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
                {this.state.errors.length ?
                   <ImageUploaderErrors errors={this.state.errors} onRemoveError={this.onRemoveError}/>
                 : ''
                }        
             
            </div>
        );
    }
}

export default ImageUploader;