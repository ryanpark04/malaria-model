import React from 'react';

class Upload extends React.Component {
    state = { selectedFile: null };

    onFileChange = event => {
        this.setState({ selectedFile: event.target.files[0] });
 
        this.props.onFileUpload(event.target.files[0]);
    };

    render() {
        return (
            <div style={{ marginBottom: "43px" , textAlign:"center" }} >
                <input
                    ref="fileInput"
                    onChange={this.onFileChange}
                    type="file"
                    hidden
                />
                <button className="ui primary button" onClick={() => this.refs.fileInput.click()}>Upload File</button> 
                
            </div>
        );
    }
}

export default Upload;