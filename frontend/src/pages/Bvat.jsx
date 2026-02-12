import { useState, lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import Papa from 'papaparse'
import '../components/BlogPost.css'
import './Home.css'
import './Bvat.css'

const Chart = lazy(() => import('../components/Chart.jsx'))

function Bvat() {
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [hoveredPoint, setHoveredPoint] = useState({ speed: '-', accel: '-', x: '-' })

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files)
    setUploadedFiles([])
    setHoveredPoint({ speed: '-', accel: '-', x: '-' })

    if (files.length === 0) return

    let processedCount = 0
    const newUploadedFiles = []

    files.forEach((file, index) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          const parsedData = results.data.map((row, dataIndex) => ({
            x: dataIndex,
            speed: parseFloat(row['Speed_kmh'] || row['speed_kmh'] || 0),
            accel: parseFloat(row['Accel_X_g'] || row['accel_x_g'] || 0),
          })).filter(row => !isNaN(row.speed) && !isNaN(row.accel))

          const stats = computeAnalysis(parsedData)
          const preview = parsedData.slice(0, 5)
            .map(d => `x: ${d.x}, speed: ${d.speed.toFixed(2)}, accel: ${d.accel.toFixed(2)}`)
            .join('\n')

          newUploadedFiles.push({
            id: `${file.name}-${Date.now()}-${index}`,
            name: file.name,
            data: parsedData,
            stats,
            preview,
          })

          processedCount++
          if (processedCount === files.length) {
            setUploadedFiles(newUploadedFiles)
          }
        },
        error: (error) => {
          console.error('Error parsing CSV:', error)
          processedCount++
          if (processedCount === files.length) {
            setUploadedFiles(newUploadedFiles)
          }
        },
      })
    })
  }

  const computeAnalysis = (data) => {
    if (!data.length) return null
    const yValues = data.map(d => d.speed)
    const mean = yValues.reduce((a, b) => a + b, 0) / yValues.length
    const max = Math.max(...yValues)
    const min = Math.min(...yValues)
    const stdDev = Math.sqrt(yValues.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) / yValues.length)
    return { mean, max, min, stdDev, points: data.length }
  }

  return (
    <>
      <div className="page-container">
        <p className="page-title">BVAT</p>

        <div className="dot-divider">
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
        </div>

        <article className="blog-post">
          <div className="blog-post-header">
            <h2 className="blog-post-title">Benchmarking Vehicle Analysis Tool</h2>
            <div className="blog-post-meta">
              <span className="blog-post-date">Sept 2024 – Sept 2025</span>
              <span className="blog-post-reading-time">Aston Martin Lagonda</span>
            </div>
          </div>

          <div className="blog-post-body">

            {/* ── Overview ── */}
            <div className="bvat-overview">
              <img
                src="/images/spec-posts/bvat/aml-logo.png"
                alt="Aston Martin"
                className="bvat-logo"
              />
              <div>
                <p className="blog-text">
                  A desktop GUI testing tool developed for the Benchmarking Vehicle Analysis Tool
                  workflow at Aston Martin. The tool enables test engineers to upload vehicle
                  telemetry CSV data, visualise speed and acceleration profiles, and perform
                  statistical analysis in real time.
                </p>
                <div className="bvat-tech-tags">
                  <span className="bvat-tag">React</span>
                  <span className="bvat-tag">Recharts</span>
                  <span className="bvat-tag">PapaParse</span>
                  <span className="bvat-tag">CSV Analysis</span>
                </div>
              </div>
            </div>

            {/* ── Interactive Tool ── */}
            <h3 className="blog-heading">Interactive Test Tool</h3>

            <div className="bvat-tool">
              {/* Upload */}
              <div className="bvat-upload-area">
                <label className="bvat-upload-btn">
                  <input
                    type="file"
                    accept=".csv"
                    multiple
                    onClick={(e) => (e.target.value = null)}
                    onChange={handleFileChange}
                  />
                  <span className="bvat-upload-icon">&#8593;</span>
                  <span className="bvat-upload-label">Select CSV Files</span>
                  <span className="bvat-upload-hint">
                    Upload .csv files with Speed_kmh and Accel_X_g columns
                  </span>
                </label>
              </div>

              {uploadedFiles.length === 0 && (
                <p className="bvat-empty">
                  Upload CSV files to view charts, statistics, and real-time coordinate tracking.
                </p>
              )}

              {uploadedFiles.length > 0 && (
                <>
                  {/* Stat cards */}
                  <div className="bvat-stats-grid">
                    {uploadedFiles.map(file => file.stats && (
                      <div className="bvat-stat-card" key={file.id}>
                        <div className="bvat-stat-name">{file.name}</div>
                        <div className="bvat-stat-row">
                          <div className="bvat-stat">
                            <span className="bvat-stat-value">{file.stats.mean.toFixed(1)}</span>
                            <span className="bvat-stat-label">Mean km/h</span>
                          </div>
                          <div className="bvat-stat">
                            <span className="bvat-stat-value">{file.stats.max.toFixed(1)}</span>
                            <span className="bvat-stat-label">Max km/h</span>
                          </div>
                          <div className="bvat-stat">
                            <span className="bvat-stat-value">{file.stats.min.toFixed(1)}</span>
                            <span className="bvat-stat-label">Min km/h</span>
                          </div>
                          <div className="bvat-stat">
                            <span className="bvat-stat-value">{file.stats.stdDev.toFixed(2)}</span>
                            <span className="bvat-stat-label">Std Dev</span>
                          </div>
                          <div className="bvat-stat">
                            <span className="bvat-stat-value">{file.stats.points.toLocaleString()}</span>
                            <span className="bvat-stat-label">Points</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Charts */}
                  <div className="bvat-chart-grid">
                    {uploadedFiles.map(file => (
                      <div className="bvat-chart-card" key={file.id}>
                        <div className="bvat-chart-header">{file.name}</div>
                        <div className="bvat-chart-area">
                          <Suspense fallback={<p className="bvat-empty">Loading chart…</p>}>
                            <Chart data={file.data} onHover={setHoveredPoint} />
                          </Suspense>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Readout bar */}
                  <div className="bvat-readout">
                    <div className="bvat-readout-item">
                      <span className="bvat-readout-label">Speed</span>
                      <span className="bvat-readout-value">
                        {hoveredPoint.speed !== '-' ? parseFloat(hoveredPoint.speed).toFixed(2) : '—'} km/h
                      </span>
                    </div>
                    <div className="bvat-readout-item">
                      <span className="bvat-readout-label">Accel</span>
                      <span className="bvat-readout-value">
                        {hoveredPoint.accel !== '-' ? parseFloat(hoveredPoint.accel).toFixed(2) : '—'} g
                      </span>
                    </div>
                    <div className="bvat-readout-item">
                      <span className="bvat-readout-label">Time</span>
                      <span className="bvat-readout-value">
                        {hoveredPoint.x !== '-' ? hoveredPoint.x : '—'} s
                      </span>
                    </div>
                  </div>

                  {/* Data preview */}
                  <details className="bvat-preview-toggle">
                    <summary>Raw Data Preview</summary>
                    <div className="bvat-preview-grid">
                      {uploadedFiles.map(file => (
                        <div className="bvat-preview-card" key={file.id}>
                          <div className="bvat-preview-name">{file.name}</div>
                          <pre className="bvat-preview-data">{file.preview}</pre>
                        </div>
                      ))}
                    </div>
                  </details>
                </>
              )}
            </div>

          </div>
        </article>

        <Link to="/project" className="link-hover-effect blog-back-link">Back to Projects</Link>
      </div>

      <div className="dot-divider dot-divider-bottom">
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
      </div>
    </>
  )
}

export default Bvat
