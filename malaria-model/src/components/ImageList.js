import './ImageList.css';
import React from 'react';
import ImageCard from './ImageCard';

const ImageList = props => {
    const images = props.images.map(image => {
        return <ImageCard key={image.name} image={image} />;
    });

    return (
        <div className="image-row">
            <div className="image-column">
                {images[0]}
                {images[1]}
                {images[2]}
                {images[3]}
            </div>
            <div className="image-column">
                {images[4]}
                {images[5]}
                {images[6]}
                {images[7]}
            </div>
            <div className="image-column">
                {images[8]}
                {images[9]}
                {images[10]}
                {images[11]}
            </div>
            <div className="image-column">
                {images[12]}
                {images[13]}
                {images[14]}
                {images[15]}
            </div>
        </div>
    );
    
    
};

export default ImageList;
