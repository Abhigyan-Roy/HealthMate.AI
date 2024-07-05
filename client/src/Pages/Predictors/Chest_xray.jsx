import axios from 'axios';
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Row } from "antd";

const Chest_xray = () => {
    const [file, setFile] = useState(null);
    const [prediction, setPrediction] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict/chest', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            setPrediction(response.data);
        } catch (error) {
            console.error('Error uploading the file:', error);
        }
    };

    return (
        <Layout>
            <h1 className="text-center mb-3">Use Our Pneumonia Predictor</h1>
            <Row>
                <div>
                    <h1>Upload Image</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            required
                        />
                        <button type="submit">Submit and Predict</button>
                    </form>
                    {prediction && (
                        <div>
                            <h2>Prediction</h2>
                            <p>Predicted Class: {prediction.predicted_class}</p>
                            <h3>Class Probabilities:</h3>
                            <ul>
                                {Object.entries(prediction.class_probabilities).map(([className, probability]) => (
                                    <li key={className}>{className}: {probability.toFixed(2)}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Row>
        </Layout>
    );
};

export default Chest_xray;
