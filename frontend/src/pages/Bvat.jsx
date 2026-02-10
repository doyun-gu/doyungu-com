import React, { useState, lazy, Suspense } from 'react';
import Papa from 'papaparse';
import './Bvat.css';

const Chart = lazy(() => import('../components/Chart.jsx'));

function Bvat() {
  const [uploadedFiles, setUploadedFiles] = useState([]); // Array of uploaded file data
  const [hoveredPoint, setHoveredPoint] = useState({ speed: '-', accel: '-', x: '-' }); // Cursor hovered point

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles([]);
    setHoveredPoint({ speed: '-', accel: '-', x: '-' });

    if (files.length === 0) return;

    let processedCount = 0;
    const newUploadedFiles = [];

    files.forEach((file, index) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data.map((row, dataIndex) => ({
            x: dataIndex,
            speed: parseFloat(row["Speed_kmh"] || row["speed_kmh"] || 0),
            accel: parseFloat(row["Accel_X_g"] || row["accel_x_g"] || 0)
          })).filter(row => !isNaN(row.speed) && !isNaN(row.accel));

          const analysisStats = computeAnalysis(parsedData);
          const fileContent = parsedData.slice(0, 5).map(d => `x: ${d.x}, speed: ${d.speed.toFixed(2)}, accel: ${d.accel.toFixed(2)}`).join('\n');

          newUploadedFiles.push({
            id: `${file.name}-${Date.now()}-${index}`,
            name: file.name,
            data: parsedData,
            analysisStats: analysisStats,
            fileContent: fileContent,
          });

          processedCount++;
          if (processedCount === files.length) {
            setUploadedFiles(newUploadedFiles);
          }
        },
        error: (error) => {
          console.error('Error parsing CSV:', error);
          processedCount++;
          if (processedCount === files.length) {
            setUploadedFiles(newUploadedFiles);
          }
        }
      });
    });
  };

  const computeAnalysis = (data) => {
    if (!data.length) return null;
    const yValues = data.map(d => d.speed);
    const mean = yValues.reduce((a, b) => a + b, 0) / yValues.length;
    const max = Math.max(...yValues);
    const min = Math.min(...yValues);
    const stdDev = Math.sqrt(yValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / yValues.length);
    return { mean, max, min, stdDev };
  };

  return (
    <div className="bvat-container">
      {/* Left Panel: File Upload, Preview, and Summary */}
      <div className="bvat-left-panel">
        <h2 className="bvat-title">BVAT Testing Page</h2>
        <label className="custom-file-upload">
          <input
            type="file"
            accept=".csv"
            multiple
            onClick={(e) => (e.target.value = null)}
            onChange={handleFileChange}
          />
          Select Files
        </label>

        {uploadedFiles.length === 0 && (
          <p className="placeholder-text-left">Upload CSV files to see their preview and summary here.</p>
        )}

        <div className="left-panel-content-grid">
          {uploadedFiles.map(file => (
            <React.Fragment key={file.id}>
              <div className="left-panel-box">
                <div className="section-title">PREVIEW: {file.name}</div>
                <div className="file-preview-box">
                  <pre>{file.fileContent}</pre>
                </div>
              </div>

              <div className="left-panel-box">
                <div className="section-title">SUMMARY: {file.name}</div>
                {file.analysisStats ? (
                  <div className="summary-box">
                    <p><strong>Mean:</strong> {file.analysisStats.mean.toFixed(2)} km/h</p>
                    <p><strong>Max:</strong> {file.analysisStats.max.toFixed(2)} km/h</p>
                    <p><strong>Min:</strong> {file.analysisStats.min.toFixed(2)} km/h</p>
                    <p><strong>Std Dev:</strong> {file.analysisStats.stdDev.toFixed(2)} km/h</p>
                  </div>
                ) : (
                  <div className="summary-box">
                    <p>No analysis data available for {file.name}.</p>
                  </div>
                )}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right Panel: Charts and Coordinate/Analysis Boxes */}
      <div className="bvat-right-panel">
        <h2 className="bvat-title">Results</h2>
        <div className="chart-grid">
          {uploadedFiles.length > 0 ? (
            uploadedFiles.map(file => (
              <div key={file.id} className="chart-item">
                <Suspense fallback={<p>Loading chart...</p>}>
                  <Chart data={file.data} onHover={setHoveredPoint} />
                </Suspense>
                <div className="chart-title">{file.name}</div>
              </div>
            ))
          ) : (
            <p className="placeholder-text">No data loaded yet. Please upload CSV files to view charts.</p>
          )}
        </div>

        <div className="bottom-boxes">
          <div className="coordinate-box">
            <strong>COORDINATE</strong>
            <p>SPEED: {hoveredPoint.speed !== '-' ? parseFloat(hoveredPoint.speed).toFixed(2) : '-'}</p>
            <p>ACCEL: {hoveredPoint.accel !== '-' ? parseFloat(hoveredPoint.accel).toFixed(2) : '-'}</p>
            <p>TIME: {hoveredPoint.x !== '-' ? hoveredPoint.x : '-'}</p>
          </div>
          <div className="analysis-box">
            <strong>ANALYSIS</strong>
            {uploadedFiles.length > 0 ? (
              uploadedFiles.map(file => <p key={file.id}>{file.name}</p>)
            ) : (
              <p>No files analyzed.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Bvat;
