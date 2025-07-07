import React from 'react';
import React, { useState } from 'react';
import Papa from 'papaparse';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
import './file_handler.css';

function read_file(file) {
    /* Read file and parse CSV data */
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            skipEmptyLines: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (error) => {
                reject(error);
            }
        });
    });
}

function process_data(data) {
    /* Assume that the first row is x and the second row is y */
    const xData = data.map(row => row.x);
    const yData = data.map(row => row.y);
    const processedData = xData.map((x, index) => ({
        x: x,
        y: yData[index]
    }));
    return processedData;
}