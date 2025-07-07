import React from 'react';
import React, { useState } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './Displayer.css';

function Displayer() {
    /* Display x and y (processed) data with a line chart format */
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fileName, setFileName] = useState('');
    const [fileContent, setFileContent] = useState('');

    return (
        <div className="displayer-container">
            <h2>Displayer</h2>
            <div className="displayer-diagram-container">
                {/* Placeholder for diagram content */}
                <p>Diagram will be displayed here.</p>
            </div>
        </div>
    );
}

function diagram_hover_event() {
    /* when hovering over the diagram, display the x and y values and other components that will be calculated later in a small box */
    // This function will handle the hover event on the diagram
    return (
        <>
            <div className="hover-box">
                <p>X: {hoveredXValue}</p>
                <p>Y: {hoveredYValue}</p>
            </div>

            <div className="hover-info">
                <p>Additional information can be displayed here.</p>
            </div>
        </>
    );
}

function analyse_result_displayer() {
    /* Display the analysis result in a separate component */
    return (
        <div className="analysis-result-container">
            <h3>Analysis Result</h3>
            <p>Result will be displayed here.</p>
        </div>
    );
}

function analysis_suppport_info() {
    /* When hovering over the analysis result, the analysis support info will be displayed in a box */
    return (
        <div className="analysis-support-info">
            <p>Support information for the analysis will be displayed here.</p>
        </div>
    );
}

function analyser_tool() {
    /* The list of tools like magnifier and ruler will be displayed at the top of the diagram */
    return (
        <div className="analyser-tool-container">
            <button className="tool-button">Magnifier</button>
            <button className="tool-button">Ruler</button>
            <button className="tool-button">Zoom</button>
        </div>
    );
}

function magnifier() {
    /* The magnifier will allow user to zoom in on a specific area of the diagram */
    return (
        <div className="magnifier-container">
            <p>Magnifier tool is active. Click and drag to zoom in on a specific area.</p>
        </div>
    );
}

function ruler() {
    /* The ruler will allow user to measure the distance between two points on the diagram */
    return (
        <div className="ruler-container">
            <p>Ruler tool is active. Click and drag to measure the distance between two points.</p>
        </div>
    );
}

function zoom() {
    /* The zoom tool will allow user to zoom in and out of the diagram */
    return (
        <div className="zoom-container">
            <p>Zoom tool is active. Use the scroll wheel to zoom in and out.</p>
        </div>
    );
}

function upload_file_button(){
    /* Upload file button and parse the CSV data - users will be able to choose multiple files */
    const handleFileChange = (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            setFileName(file.name);
            setLoading(true);
            Papa.parse(file, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    setData(results.data);
                    setLoading(false);
                },
                error: (error) => {
                    setError(error.message);
                    setLoading(false);
                }
            });
        }
    }
}

function file_information_displayer() {
    /* Display the file information like name, size, and content */
    return (
        <div className="file-information-container">
            <h3>File Information</h3>
            <p>File Name: {fileName}</p>
            <p>File Size: {fileContent.length} bytes</p>
            <div className="file-content">
                <pre>{fileContent}</pre>
            </div>
        </div>
    );
}

function analyse_button () {
    /* The button to trigger the analysis */
    return (
        <div className="analyse-button-container">
            <button className="analyse-button">Analyse</button>
        </div>
    );
}

export default Displayer;