import {detectColisionVia} from '.';

class CollisionsDetector {
    constructor(rectangles,dragRectangle){
       this.rectangles = rectangles;
       this.dragRectangle = dragRectangle;
       this.rectanglesWhichAreInCollision = [];
    }

    getRectangleCoordinates(rectangle){
        let rect = rectangle.getBoundingClientRect();

        let rectCoordinates = {
            minX: rect.left,
            maxX: rect.right,
            minY: rect.top,
            maxY: rect.bottom,
        };

        return rectCoordinates;
    }

    getCollisionOnOneAxis(min0,max0,min1,max1){
        return max0 >= min1 && min0 <= max1;
    }

    getAllCollisions(dragRectanglePosition,rectanglePosition, rectangle){
        let collisionX = this.getCollisionOnOneAxis(dragRectanglePosition.minX,dragRectanglePosition.maxX, rectanglePosition.minX,rectanglePosition.maxX);
        let collisionY = this.getCollisionOnOneAxis(dragRectanglePosition.minY,dragRectanglePosition.maxY, rectanglePosition.minY,rectanglePosition.maxY);

        if(collisionX && collisionY){
            this.rectanglesWhichAreInCollision.push(rectangle);
        }

    }

    getPartofTheCommon(firstField, secondField){

        var firstPosition = this.getRectangleCoordinates(firstField);
        var secondPosition = this.getRectangleCoordinates(secondField);
        var a,b;

        //X
        if(firstPosition.minX > secondPosition.minX ){
            a = Math.abs(firstPosition.minX - secondPosition.maxX );
        }
        else{
            a = Math.abs(firstPosition.maxX - secondPosition.minX );
        }

        // y
        if(firstPosition.minY > secondPosition.minY ){
            b = Math.abs(firstPosition.minY - secondPosition.maxY );
        }
        else{
            b = Math.abs(firstPosition.maxY - secondPosition.minY );
        }

        return a*b;
    }

    

    getTheHalfOfCollision(dragPosition, callback){
        var rectanglePosition = this.getRectangleCoordinates(this.rectanglesWhichAreInCollision[0].ref);

        let rectangleCenterPoint =  ((rectanglePosition.maxX - rectanglePosition.minX)/2 ) +  rectanglePosition.minX ;

        let dragRectangleCenterPoint = ((dragPosition.maxX - dragPosition.minX ) / 2 ) + dragPosition.minX;

        if(dragRectangleCenterPoint > rectangleCenterPoint){
            callback(this.rectanglesWhichAreInCollision[0],'after');
            //this.props.swapElements(this.dragElem.id, rectanglesWhichAreInCollision[0].id, 'right');

        }
        else{
            callback(this.rectanglesWhichAreInCollision[0],'before');
           // this.props.swapElements(this.dragElem.id, rectanglesWhichAreInCollision[0].id, 'left');
        }
    }
    getTheCollision(dragPosition){
       
            this.rectanglesWhichAreInCollision.sort((a,b) =>{
            
                var aField, bField;
            
                aField = this.getPartofTheCommon(dragPosition, a.ref);
                bField = this.getPartofTheCommon(dragPosition, b.ref);
    

                
                if(aField.result >=  bField.result){
                    return -1;
                }
                else{
                    return 1;
                }
                

            });

            return this.rectanglesWhichAreInCollision[0];
      
        
        
    }


    analise(callbackSuccess,callbackError){
     
     
        let dragRectanglePosition = this.getRectangleCoordinates(this.dragRectangle.ref);
     
        this.rectangles.forEach(item =>{
         
            if(item.ref !== this.dragRectangle.ref){
              
                var itemPosition = this.getRectangleCoordinates(item.ref);
                
                this.getAllCollisions(dragRectanglePosition,itemPosition, item);                
            }
            else{
                if(typeof callbackError =='function'){
                    callbackError(this.rectangles);
                }
              
                return;
            }
            
        });
        
        if(this.rectanglesWhichAreInCollision.length){
            this.getTheHalfOfCollision(dragRectanglePosition,callbackSuccess);
        }
       
    }
}

export default CollisionsDetector;