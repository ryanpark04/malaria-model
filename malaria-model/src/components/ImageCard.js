import React from 'react';
import './ImageCard.css';

class ImageCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = { clicked: false };
    }


    onButtonClick = () => {
        this.setState({ clicked: true })
    }

    displayInfo = () => {
        const { className, confidence, url } = this.props.image;
        const capitalizedClass = className.charAt(0).toUpperCase() + className.slice(1);
        const percent = Math.trunc(confidence).toString();
        if (this.state.clicked) {
            
            return (
                <div className="container">
                    <img alt="cell" src={url} className="ui rounded image clickedimg" />
                    <div className="infotext">
                        <div className="animate-opacity" >
                            <div style={{ fontSize: "17px", fontWeight: "bold" }}>
                                 {capitalizedClass}
                            </div>
                            {percent + "%"}
                        </div>

                    </div>
                        
                </div>
            );
        } else {
            return (
                <div className="container">
                    <img alt="cell" src={url} className="ui rounded image fadedimg" />
                    <div className="middle" >
                        <button className="ui primary circular icon button" onClick={this.onButtonClick}>
                            <i className="info icon" />
                        </button>
                    </div>
                </div>
                   
            );
            
        }
    }

    render() {
        
        return (
            <div>
                {this.displayInfo()}
            </div>
            
        );
    }
}

export default ImageCard;
