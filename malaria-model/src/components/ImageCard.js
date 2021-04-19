import React from 'react';
import './ImageCard.css';

class ImageCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = { selectedFile: null };
    }

    onFileUpload = () => {
        this.setState({ selectedFile: this.props.image.url })

        console.log('test');
    }

    render() {
        const { url } = this.props.image;

        return (
            <div className="container">
                <img alt="cell" src={url} className="ui rounded image fadedimg" />
                <div className="middle" >
                    <button className="ui primary circular icon button" onClick={this.onFileUpload}>
                        <i className="upload icon" />
                    </button>       
                </div>
                
            </div>
        );
    }
}

export default ImageCard;
