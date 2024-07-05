import React, { useEffect, useState } from "react";
import { getAllApprovedDoctors } from "../api/api";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/spinnerSlice";
import { Row } from "antd";
import { Link } from "react-router-dom";
const Predict = () => {
    return (
        <Layout>
            <h1 className="text-center mb-3">Use Our Disease Predictor</h1>
            <Row>
                <div id="prediction">
                    
                    <Link to="/predict/chestXray"><div className="predictor">Chest X-Ray</div></Link>
                    <Link to="/predict/"><div className="predictor">Brain MRI</div></Link>
                    <Link to="/predict/"><div className="predictor">Retinal OCT</div></Link>
                    <div className="predictor">Heart ECG</div>
                </div>
                <div id="prediction">
                    <div className="predictor">Bone X-Ray</div>
                    <div className="predictor">Chest X-Ray</div>
                    <div className="predictor">Dental Radiography</div>
                    <div className="predictor">Liver Test</div>
                </div>
            </Row>
        </Layout>
    );
};

export default Predict;
