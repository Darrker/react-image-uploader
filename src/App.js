import React from 'react';
import ImageUploader from './components/ImageUploader';
import './App.css';

function App() {
  return (
    <div className="App">
      <ImageUploader />
    </div>
  );
}

export default App;


// let itemsWhichAreInCollision = [];
// var dragElemRect = this.dragElem.ref.getBoundingClientRect();
// var dragPosition ={
//     minX: dragElemRect.left,
//     maxX: dragElemRect.right,
//     minY: dragElemRect.top,
//     maxY: dragElemRect.bottom,

// };

// this.thumbnails.forEach(item =>{
//   item.ref.style.transform = "rotate(0deg)";
//     if(item.ref !== this.dragElem.ref){
//         var itemElemRect = item.ref.getBoundingClientRect();
//         var itemPosition ={
//             minX: itemElemRect.left,
//             maxX: itemElemRect.right,
//             minY: itemElemRect.top,
//             maxY: itemElemRect.bottom,

//         };
//         let collisionX = detectColisionVia(dragPosition.minX,dragPosition.maxX, itemPosition.minX,itemPosition.maxX);
//         let collisionY = detectColisionVia(dragPosition.minY,dragPosition.maxY, itemPosition.minY,itemPosition.maxY);

//         if(collisionX && collisionY){
          
        
//             itemsWhichAreInCollision.push(item);
          
//          }

        
//     }
//     else{
//         return;
//     }
    
// });




// itemsWhichAreInCollision.sort((a,b) =>{
//     var aField ={
//         a: 0,
//         b: 0,
//         result: 0
//     };

//     var bField ={
//         a: 0,
//         b: 0,
//         result: 0
//     };

//     var aRefPosition = a.ref.getBoundingClientRect();
//     var aPosition ={
//             minX: aRefPosition.left,
//             maxX: aRefPosition.right,
//             minY: aRefPosition.top,
//             maxY: aRefPosition.bottom,

//     };

//     var bRefPosition = b.ref.getBoundingClientRect();
//     var bPosition ={
//             minX: bRefPosition.left,
//             maxX: bRefPosition.right,
//             minY: bRefPosition.top,
//             maxY: bRefPosition.bottom,

//     };
    
//     if(dragPosition.minX > aPosition.minX ){
//         aField.a = Math.abs(dragPosition.minX - aPosition.maxX );
//     }
//     else{
//         aField.a = Math.abs(dragPosition.maxX - aPosition.minX );
//     }

//     if(dragPosition.minY > aPosition.minY ){
//         aField.b = Math.abs(dragPosition.minY - aPosition.maxY );
//     }
//     else{
//         aField.b = Math.abs(dragPosition.maxY - aPosition.minY );
//     }

//     if(dragPosition.minX > bPosition.minX ){
//         bField.a = Math.abs(dragPosition.minX - bPosition.maxX );
//     }
//     else{
//         bField.a = Math.abs(dragPosition.maxX - bPosition.minX );
//     }

//     if(dragPosition.minY > aPosition.minY ){
//         bField.b = Math.abs(dragPosition.minY - bPosition.maxY );
//     }
//     else{
//         bField.b = Math.abs(dragPosition.maxY - bPosition.minY );
//     }


//     aField.result = aField.a * aField.b;

//     bField.result = bField.a * bField.b;

    
//     if(aField.result >=  bField.result){
//         return -1;
//     }
//     else{
//         return 1;
//     }
    

// });
// if(itemsWhichAreInCollision.length){

   
//     var test =  itemsWhichAreInCollision[0].ref.getBoundingClientRect();
//     var aT ={
//             minX: test.left,
//             maxX: test.right,
//     };
//     let xCenter =  ((aT.maxX - aT.minX)/2 ) +  aT.minX ;

//     let dragCenter = ((dragPosition.maxX - dragPosition.minX ) / 2 ) + dragPosition.minX;

//     if(dragCenter > xCenter){
//        this.props.swapElements(this.dragElem.id, itemsWhichAreInCollision[0].id, 'right');
//       console.log('right');

//     }
//     else{
//        this.props.swapElements(this.dragElem.id, itemsWhichAreInCollision[0].id, 'left');
//         console.log('left');
//     }
//     console.log(itemsWhichAreInCollision[0].id);
//     //itemsWhichAreInCollision[0].ref.style.transform = "rotate(5deg)";
// }