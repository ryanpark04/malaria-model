import axios from 'axios';
import React from 'react';
import ImageList from './ImageList';
import Display from './Display';

class App extends React.Component {
    state = { images: [] }

    componentDidMount() {
        this.fetchImages();
    }
    
    fetchImages = async () => {
        const response = await axios.get('/images');
        console.log(response.data.cells);
        this.setState({ images: response.data.cells });
    }

    renderImages = () => {
        if (this.state.images.length === 0) {
            return <div class="ui active centered inline text loader">Loading...</div>
        } else {
            return <ImageList images={this.state.images} />
        }
    }

    render() {
        return (
            <div>
                <div className="ui grid">
                    <div className="eight wide column" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        <div style={{ width: "600px" }} >
                            <Display />
                        </div>
                    </div>

                    <div className="eight wide column" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                        <button className="ui circular icon button" onClick={this.fetchImages}>
                            <i className="ui redo alternate icon" />
                        </button>
                        
                        {this.renderImages()}
                    </div>
                </div>
                <div className="ui vertical divider" style={{ height: "300px"}}>
                    Or
                </div>
            </div>
        );
    }
}

export default App;