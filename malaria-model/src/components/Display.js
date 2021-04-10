import React from 'react';
import axios from 'axios';
import Upload from './Upload';
import Classification from './Classification';

class Display extends React.Component {
    state = { selectedFile: null, className: '', confidence: 0 }

    onUpload = async (file) => {

        if (!file) {
            return;
        }

        const validImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
        if (!validImageTypes.includes(file.type)) {
            this.setState({ selectedFile: null, className: '', confidence: 0 });
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);
        const formData = new FormData();

        reader.onload = async () => {
            formData.append(
                'image',
                reader.result
            )
            const response = await axios.post('/predict', formData);

            this.setState({ selectedFile: file, className: response.data.className, confidence: response.data.confidence });   
        };
    }

    fileData = () => {
        if (this.state.selectedFile) {
            return (
                <Classification selectedFile={this.state.selectedFile} className={this.state.className} confidence={this.state.confidence} />
            );
        } else {
            return (
                <div className="ui icon header" style={{ marginTop: "43px" }} >
                    <i className="upload icon"></i>
                    Please upload valid image
                </div>
            );
        }
    }

    render() {
        return (
            <div style={{ display: "block", marginLeft: "auto", marginRight: "auto", maxWidth: "600px"}}>
                <div className="ui placeholder segment">
                    {this.fileData()}
                    <Upload onFileUpload={this.onUpload}/>
                    
                </div>
                
            </div>
            
        );
    }
}

export default Display;