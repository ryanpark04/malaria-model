import React from 'react';

const Classification = ({ selectedFile, className, confidence }) => {
    const percent = Math.trunc(confidence).toString();
    const capitalizedClass = className.charAt(0).toUpperCase() + className.slice(1);

    return (
        <div style={{ marginTop: "62px", textAlign: "center" }}>
            <img src={URL.createObjectURL(selectedFile)} style={{ maxWidth: "180px" }} alt="classification" />
            <div style = {{ fontSize: "18px", fontWeight: "700", marginTop: "15px" }}>
                {capitalizedClass}
            </div>       
            <div style={{ display: "block", marginLeft: "auto", marginRight: "auto", maxWidth: "400px"}}>
                <div className="ui indicating progress" data-percent={percent}>
                    <div className="bar" style={{ width: percent + "%" }}>
                        <div className="progress">
                            {percent}% Confident
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Classification;