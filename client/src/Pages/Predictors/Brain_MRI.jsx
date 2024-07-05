import axios from 'axios';
import React, { useState } from "react";
import Layout from "../../components/Layout";
import { Row } from "antd";

const Brain_MRI = () => {
    const [url, setUrl] = useState('');
    const [prediction, setPrediction] = useState(null);

    const handleUrlChange = (event) => {
        setUrl(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:5000/predict', { url }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                }
            });
            setPrediction(response.data);
        } catch (error) {
            console.error('Error sending the URL:', error);
        }
    };

    return (
        <Layout>
            <h1 className="text-center mb-3">Use Our Disease Predictor</h1>
            <Row>
                <div>
                    <h1>Enter Image URL</h1>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={url}
                            onChange={handleUrlChange}
                            placeholder="Enter image URL"
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

export default Brain_MRI;
