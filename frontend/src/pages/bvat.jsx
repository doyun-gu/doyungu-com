/* ==================================================== */
/* doyungu.com/project/bvat -> This is the BVAT page which handles just displaying examples diagrams   */
/* ==================================================== */

import React, { useState, lazy, Suspense } from 'react';
import Papa from 'papaparse';
import './bvat.css';

const Chart = lazy(() => import('../components/Chart'));

function Bvat() {
  const [data, setData] = useState([]);
  const [fileName, setFileName] = useState('');
  const [fileSize, setFileSize] = useState(0);
  const [fileContent, setFileContent] = useState('');
  const [analysisStats, setAnalysisStats] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      setFileSize(file.size);

      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data.map((row, index) => ({
            x: index,
            speed: parseFloat(row["Speed_kmh"] || row["speed_kmh"] || 0),
            accel: parseFloat(row["Accel_X_g"] || row["accel_x_g"] || 0)
          })).filter(row => !isNaN(row.speed) && !isNaN(row.accel));

          setData(parsedData);
          setFileContent(
            parsedData.slice(0, 5).map(d => `x: ${d.x}, speed: ${d.speed}, accel: ${d.accel}`).join('\n')
          );
          computeAnalysis(parsedData);
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
        }
      });
    }
  };

  const computeAnalysis = (data) => {
    if (!data.length) return;
    const yValues = data.map(d => d.speed);
    const mean = yValues.reduce((a, b) => a + b, 0) / yValues.length;
    const max = Math.max(...yValues);
    const min = Math.min(...yValues);
    const stdDev = Math.sqrt(
      yValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / yValues.length
    );

    setAnalysisStats({ mean, max, min, stdDev });
  };

  return (
    <div className="bvat-container">
      <div className="bvat-left-panel">
        <div className="bvat-file-handler">
          <h2>File Handler</h2>
          <p>Upload your CSV file here to process the data.</p>
          <input
            type="file"
            accept=".csv"
            onClick={(e) => (e.target.value = null)}
            onChange={handleFileChange}
          />

          {fileName && (
            <div className="file-info">
              <p><strong>File Name:</strong> {fileName}</p>
              <p><strong>File Size:</strong> {fileSize} bytes</p>
              <h4>Preview (Top 5 Rows)</h4>
              <pre>{fileContent}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="bvat-right-panel">
        <h2>Data Visualization</h2>
        {data.length > 0 ? (
          <Suspense fallback={<p>Loading chart...</p>}>
            <Chart data={data} />
          </Suspense>
        ) : (
          <p>No data loaded yet. Please upload a CSV file.</p>
        )}

        {analysisStats && (
          <div className="analysis-stats" style={{ marginTop: '2rem' }}>
            <h3>Statistical Summary (Speed_kmh)</h3>
            <p>Mean: {analysisStats.mean.toFixed(2)} km/h</p>
            <p>Max: {analysisStats.max.toFixed(2)} km/h</p>
            <p>Min: {analysisStats.min.toFixed(2)} km/h</p>
            <p>Std Dev: {analysisStats.stdDev.toFixed(2)} km/h</p>
          </div>
        )}

        <div className="analysis-tools">
          <h3>Analysis Tools</h3>
          <button className="tool-button">Magnifier</button>
          <button className="tool-button">Ruler</button>
          <button className="tool-button">Zoom</button>
        </div>
      </div>
    </div>
  );
}

export default Bvat;