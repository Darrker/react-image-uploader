import React from 'react'
import './style/preloader.scss';

class Preloader extends React.Component{

    render(){
        return(

            <div className="preloader">
                <div className="preloader__circle"></div>
                {this.props.progress ?
                    <span className="preloader__progress">
                        {this.props.progress}%
                    </span>
                 :''}
            </div>
        );
    }
}

export default Preloader;