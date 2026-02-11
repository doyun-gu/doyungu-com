import { Link } from 'react-router-dom'
import './Home.css'
import './July.css'

/* Style shortcuts for code block highlighting */
const DIM = { color: '#718096' }
const ACC = { color: '#6b9bd1' }

function July() {
  return (
    <>
      <div className="page-container">
        <p className="page-title">Project JULY</p>

        <div className="dot-divider">
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
          <span className="circle-dot"></span>
        </div>

        <div className="july-spec">
          <h2>JULY Protocol &amp; System Architecture</h2>
          <p className="july-subtitle">
            STM32F411RET — Raspberry Pi 5 — Web Dashboard &nbsp;|&nbsp; Communication Protocol v1.0
          </p>

          {/* ── Table of Contents ── */}
          <div className="july-toc">
            <div className="july-toc-title">Contents</div>
            <ol>
              <li><a href="#arch">System Architecture</a></li>
              <li><a href="#hw">Hardware Pin Map (from schematic)</a></li>
              <li><a href="#frame">UART Framing Layer</a></li>
              <li><a href="#proto">Datagram Protocol Specification</a></li>
              <li><a href="#msgs">Message Types &amp; Payloads</a></li>
              <li><a href="#fw">Firmware Architecture (STM32)</a></li>
              <li><a href="#rpi">Raspberry Pi 5 Middleware</a></li>
              <li><a href="#web">Web Dashboard Interface</a></li>
              <li><a href="#seq">Sequence Diagrams</a></li>
              <li><a href="#err">Error Handling &amp; Fault Recovery</a></li>
            </ol>
          </div>

          {/* ════════════════════════════════════════════════ */}
          {/* 1. System Architecture                          */}
          {/* ════════════════════════════════════════════════ */}
          <h2 id="arch">1. System Architecture</h2>

          <div className="arch-diagram">
            <div className="arch-row">
              <div className="arch-box sensor">
                <div className="arch-label">I²C Sensors</div>
                <div className="arch-name">PPFD · THP · CO₂</div>
              </div>
              <div className="arch-arrow">→</div>
              <div className="arch-box mcu">
                <div className="arch-label">Microcontroller</div>
                <div className="arch-name">STM32F411RET</div>
              </div>
              <div className="arch-arrow">⇄ UART</div>
              <div className="arch-box rpi">
                <div className="arch-label">Gateway / Brain</div>
                <div className="arch-name">Raspberry Pi 5</div>
              </div>
              <div className="arch-arrow">⇄ WebSocket</div>
              <div className="arch-box web">
                <div className="arch-label">Frontend</div>
                <div className="arch-name">Web Dashboard</div>
              </div>
            </div>
            <div className="arch-row">
              <div className="arch-box sensor">
                <div className="arch-label">Actuators</div>
                <div className="arch-name">LED · Pump · Mist · Solenoid · Fan</div>
              </div>
              <div className="arch-arrow">←</div>
              <div className="arch-box" style={{ border: 'none', background: 'none', boxShadow: 'none' }}>
                <div className="arch-name" style={{ color: '#718096', fontSize: '0.75rem' }}>PWM + GPIO control</div>
              </div>
            </div>
          </div>

          <h3>Responsibilities</h3>
          <table>
            <thead>
              <tr><th>Layer</th><th>Role</th><th>Key Functions</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>STM32F411</strong></td>
                <td>Real-time sensor acquisition &amp; actuator control</td>
                <td>Cyclic I²C reads (100–500 ms), PWM generation, GPIO control, UART TX/RX to RP5, fault detection (PGOOD, open-circuit LED)</td>
              </tr>
              <tr>
                <td><strong>Raspberry Pi 5</strong></td>
                <td>Middleware gateway, data logging, control logic</td>
                <td>Parse/route datagrams, log to database (SQLite/InfluxDB), run scheduling/automation rules, serve WebSocket API, send commands to STM32</td>
              </tr>
              <tr>
                <td><strong>Web Dashboard</strong></td>
                <td>User interface for monitoring &amp; manual control</td>
                <td>Display live telemetry, show event/fault alerts, manual actuator override, parameter tuning (e.g. LED duty, schedules)</td>
              </tr>
            </tbody>
          </table>

          {/* ════════════════════════════════════════════════ */}
          {/* 2. Hardware Pin Map                              */}
          {/* ════════════════════════════════════════════════ */}
          <h2 id="hw">2. Hardware Pin Map (from schematic)</h2>

          <div className="pin-group">
            <div className="pin-card">
              <div className="pin-card-title">UART — RP5 Communication</div>
              <div className="pin-row"><span className="pin-name">MCU_TX (to RP5 RX)</span><span className="pin-val">USART1_TX</span></div>
              <div className="pin-row"><span className="pin-name">MCU_RX (from RP5 TX)</span><span className="pin-val">USART1_RX</span></div>
              <div className="pin-row"><span className="pin-name">Connector</span><span className="pin-val">J3 (3.3V level)</span></div>
            </div>
            <div className="pin-card">
              <div className="pin-card-title">I²C — Sensor Bus</div>
              <div className="pin-row"><span className="pin-name">MUX_SCL</span><span className="pin-val">PB8 (I2C1_SCL)</span></div>
              <div className="pin-row"><span className="pin-name">MUX_SDA</span><span className="pin-val">PB9 (I2C1_SDA)</span></div>
              <div className="pin-row"><span className="pin-name">Branches</span><span className="pin-val">PPFD sensor, THP sensor</span></div>
            </div>
            <div className="pin-card">
              <div className="pin-card-title">LED Driver (Boost + MOSFET)</div>
              <div className="pin-row"><span className="pin-name">MCU_LED_PWM</span><span className="pin-val">PA0 (TIM2_CH1)</span></div>
              <div className="pin-row"><span className="pin-name">BOOST_DISABLE</span><span className="pin-val">PA5 (GPIO out)</span></div>
              <div className="pin-row"><span className="pin-name">PGOOD</span><span className="pin-val">PB14 (GPIO in)</span></div>
              <div className="pin-row"><span className="pin-name">Driver IC</span><span className="pin-val">LM5156H → TC4427 → SIR572DP</span></div>
            </div>
            <div className="pin-card">
              <div className="pin-card-title">Water Pump (PWM)</div>
              <div className="pin-row"><span className="pin-name">WTRP_PWM_CTRL</span><span className="pin-val">PA2 (TIM2_CH3)</span></div>
              <div className="pin-row"><span className="pin-name">MOSFET</span><span className="pin-val">Q5 AO3400A</span></div>
              <div className="pin-row"><span className="pin-name">Supply</span><span className="pin-val">12V_OUT</span></div>
            </div>
            <div className="pin-card">
              <div className="pin-card-title">Mist Maker (Digital ON/OFF)</div>
              <div className="pin-row"><span className="pin-name">MIST_MAKER_CTRL</span><span className="pin-val">PA7 (GPIO out)</span></div>
              <div className="pin-row"><span className="pin-name">MOSFET</span><span className="pin-val">Q9 AO3400A</span></div>
              <div className="pin-row"><span className="pin-name">Supply</span><span className="pin-val">5V_OUT</span></div>
            </div>
            <div className="pin-card">
              <div className="pin-card-title">Solenoid Valve (Digital ON/OFF)</div>
              <div className="pin-row"><span className="pin-name">Solenoid_CTRL</span><span className="pin-val">PB12 (GPIO out)</span></div>
              <div className="pin-row"><span className="pin-name">MOSFET</span><span className="pin-val">Q10 AO3400A</span></div>
              <div className="pin-row"><span className="pin-name">Supply</span><span className="pin-val">12V_OUT</span></div>
            </div>
            <div className="pin-card">
              <div className="pin-card-title">Fan (PWM + Tach)</div>
              <div className="pin-row"><span className="pin-name">MCU_FAN_OUT (PWM)</span><span className="pin-val">PC15 (TIM4_CH2)</span></div>
              <div className="pin-row"><span className="pin-name">MCU_FAN_IN (Tach)</span><span className="pin-val">PC14 (TIM4_CH1)</span></div>
              <div className="pin-row"><span className="pin-name">MOSFET</span><span className="pin-val">Q6/Q7 AO3400A</span></div>
            </div>
            <div className="pin-card">
              <div className="pin-card-title">Monitoring</div>
              <div className="pin-row"><span className="pin-name">WTR_LEVEL</span><span className="pin-val">PB13 (GPIO in)</span></div>
              <div className="pin-row"><span className="pin-name">PGOOD (LED driver)</span><span className="pin-val">PB14 (GPIO in)</span></div>
              <div className="pin-row"><span className="pin-name">COM_STATUS_LED</span><span className="pin-val">PB0 (GPIO out)</span></div>
            </div>
          </div>

          {/* ════════════════════════════════════════════════ */}
          {/* 3. UART Framing Layer                            */}
          {/* ════════════════════════════════════════════════ */}
          <h2 id="frame">3. UART Framing Layer</h2>

          <p>
            Before the JSON datagram, you need a reliable byte-level framing protocol so the
            receiver knows where one message starts and ends. I recommend{' '}
            <strong>line-delimited JSON (NDJSON)</strong> for simplicity during development,
            with an optional upgrade path to COBS framing.
          </p>

          <h3>Option A: Newline-Delimited JSON (Recommended for Dev)</h3>
          <pre><code>{`// Each message = one line of JSON terminated by \\n
{"ver":1,"type":"telem","seq":1012,"body":{"light":315,"temp":23.4}}\\n
{"ver":1,"type":"cmd","id":"cmd-1042","body":{"cmd":"set_led","duty":0.6}}\\n`}</code></pre>

          <div className="july-callout ok">
            <strong>Why NDJSON?</strong> Simple to implement with HAL_UART + DMA, easy to debug
            with a serial terminal, and Python's <code>serial.readline()</code> handles it natively.
          </div>

          <h3>UART Configuration</h3>
          <table>
            <thead>
              <tr><th>Parameter</th><th>Value</th><th>Note</th></tr>
            </thead>
            <tbody>
              <tr><td>Baud rate</td><td><code>115200</code></td><td>Sufficient for ~500-byte JSON at 10 Hz</td></tr>
              <tr><td>Data bits</td><td>8</td><td></td></tr>
              <tr><td>Parity</td><td>None</td><td></td></tr>
              <tr><td>Stop bits</td><td>1</td><td></td></tr>
              <tr><td>Flow control</td><td>None</td><td>Software throttling via seq numbers</td></tr>
              <tr><td>Delimiter</td><td><code>\n</code> (0x0A)</td><td>Line feed terminates each datagram</td></tr>
              <tr><td>Max message size</td><td>512 bytes</td><td>Define a TX/RX buffer of this size</td></tr>
            </tbody>
          </table>

          {/* ════════════════════════════════════════════════ */}
          {/* 4. Datagram Protocol Specification                */}
          {/* ════════════════════════════════════════════════ */}
          <h2 id="proto">4. Datagram Protocol Specification</h2>

          <h3>Envelope (Common Header)</h3>
          <p>Every message follows this JSON envelope structure:</p>

          <pre><code>
{`{`}
{'\n  '}<span className="jk">"ver"</span>:  <span className="jn">1</span>,              <span style={DIM}>// Protocol version (integer)</span>
{'\n  '}<span className="jk">"type"</span>: <span className="js">"telem"</span>,        <span style={DIM}>// Message type: telem | event | cmd | ack | hb</span>
{'\n  '}<span className="jk">"from"</span>: <span className="js">"stm32"</span>,        <span style={DIM}>// Sender: "stm32" or "rp5"</span>
{'\n  '}<span className="jk">"to"</span>:   <span className="js">"rp5"</span>,          <span style={DIM}>// Receiver: "stm32" or "rp5"</span>
{'\n  '}<span className="jk">"seq"</span>:  <span className="jn">1012</span>,           <span style={DIM}>// Sequence number (uint16 wrapping)</span>
{'\n  '}<span className="jk">"t"</span>:    <span className="jn">1720000000</span>,     <span style={DIM}>// Unix timestamp (RP5 syncs time to STM32)</span>
{'\n  '}<span className="jk">"id"</span>:   <span className="js">"cmd-1042"</span>,     <span style={DIM}>// [cmd/ack only] Unique command ID for matching</span>
{'\n  '}<span className="jk">"body"</span>: {'{ ... }'}          <span style={DIM}>// Type-specific payload (see §5)</span>
{'\n}'}
          </code></pre>

          <h3>Field Reference</h3>
          <table>
            <thead>
              <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>ver</code></td><td>uint8</td><td>Always</td><td>Protocol version. Start at 1. Allows future upgrades.</td></tr>
              <tr><td><code>type</code></td><td>string</td><td>Always</td><td>One of: <code>telem</code>, <code>event</code>, <code>cmd</code>, <code>ack</code>, <code>hb</code></td></tr>
              <tr><td><code>from</code></td><td>string</td><td>Always</td><td>Origin node</td></tr>
              <tr><td><code>to</code></td><td>string</td><td>Always</td><td>Destination node</td></tr>
              <tr><td><code>seq</code></td><td>uint16</td><td>Always</td><td>Incrementing sequence, wraps at 65535. Used for ordering and loss detection.</td></tr>
              <tr><td><code>t</code></td><td>uint32</td><td>telem, event</td><td>Unix timestamp. STM32 uses its own tick counter if time not synced. RP5 provides epoch via <code>time_sync</code> command.</td></tr>
              <tr><td><code>id</code></td><td>string</td><td>cmd, ack</td><td>Unique command ID to correlate request/response pairs. Format: <code>"cmd-XXXX"</code></td></tr>
              <tr><td><code>body</code></td><td>object</td><td>Always</td><td>Type-dependent payload (see below)</td></tr>
            </tbody>
          </table>

          <div className="july-callout">
            <strong>Design decision — short keys:</strong> Using abbreviated field names
            (<code>telem</code> not <code>telemetry</code>, <code>hb</code> not <code>heartbeat</code>)
            keeps messages compact for the 115200 baud link. Each byte matters when you're sending at 2–10 Hz.
          </div>

          {/* ════════════════════════════════════════════════ */}
          {/* 5. Message Types & Payloads                      */}
          {/* ════════════════════════════════════════════════ */}
          <h2 id="msgs">5. Message Types &amp; Payloads</h2>

          {/* 5.1 Telemetry */}
          <h3>5.1 Telemetry <span className="july-tag tx">STM32 → RP5</span></h3>
          <p>
            Sent cyclically every <strong>N ms</strong> (configurable, default 500 ms).
            Contains all sensor readings and actuator states in one packet.
          </p>

          <pre><code>
{`{`}
{'\n  '}<span className="jk">"ver"</span>: <span className="jn">1</span>, <span className="jk">"type"</span>: <span className="js">"telem"</span>, <span className="jk">"from"</span>: <span className="js">"stm32"</span>, <span className="jk">"to"</span>: <span className="js">"rp5"</span>,
{'\n  '}<span className="jk">"seq"</span>: <span className="jn">1012</span>, <span className="jk">"t"</span>: <span className="jn">1720000000</span>,
{'\n  '}<span className="jk">"body"</span>: {'{'}
{'\n    '}<span style={DIM}>// --- Sensor Readings ---</span>
{'\n    '}<span className="jk">"light"</span>:    <span className="jn">315</span>,        <span style={DIM}>// PPFD sensor (µmol/m²/s)</span>
{'\n    '}<span className="jk">"temp"</span>:     <span className="jn">23.4</span>,       <span style={DIM}>// Temperature (°C)</span>
{'\n    '}<span className="jk">"hum"</span>:      <span className="jn">65</span>,         <span style={DIM}>// Relative humidity (%)</span>
{'\n    '}<span className="jk">"co2"</span>:      <span className="jn">420</span>,        <span style={DIM}>// CO₂ concentration (ppm)</span>
{'\n    '}<span className="jk">"wtr_lvl"</span>:  <span className="jb">true</span>,       <span style={DIM}>// Water level sensor (true = OK, false = low)</span>
{'\n'}
{'\n    '}<span style={DIM}>// --- Actuator States ---</span>
{'\n    '}<span className="jk">"led"</span>:      {'{ '}<span className="jk">"on"</span>: <span className="jb">true</span>,  <span className="jk">"duty"</span>: <span className="jn">0.6</span>{' },'}   <span style={DIM}>// LED array</span>
{'\n    '}<span className="jk">"pump"</span>:     {'{ '}<span className="jk">"on"</span>: <span className="jb">false</span>, <span className="jk">"duty"</span>: <span className="jn">0.0</span>{' },'}   <span style={DIM}>// Water pump</span>
{'\n    '}<span className="jk">"mist"</span>:     <span className="jb">false</span>,       <span style={DIM}>// Mist maker (on/off only)</span>
{'\n    '}<span className="jk">"sol"</span>:      <span className="jb">false</span>,       <span style={DIM}>// Solenoid valve (on/off only)</span>
{'\n    '}<span className="jk">"fan"</span>:      {'{ '}<span className="jk">"on"</span>: <span className="jb">true</span>,  <span className="jk">"duty"</span>: <span className="jn">0.8</span>, <span className="jk">"rpm"</span>: <span className="jn">1200</span>{' },'}  <span style={DIM}>// Fan w/ tachometer</span>
{'\n'}
{'\n    '}<span style={DIM}>// --- Board Health ---</span>
{'\n    '}<span className="jk">"pgood"</span>:    <span className="jb">true</span>,        <span style={DIM}>// LED driver power-good flag</span>
{'\n    '}<span className="jk">"vbus"</span>:     <span className="jn">20.1</span>        <span style={DIM}>// USB-PD input voltage (if ADC available)</span>
{'\n  }'}
{'\n}'}
          </code></pre>

          {/* 5.2 Event */}
          <h3>5.2 Event <span className="july-tag tx">STM32 → RP5</span></h3>
          <p>
            Sent immediately when an asynchronous condition is detected (fault, threshold,
            state change). Not periodic.
          </p>

          <pre><code>
{`{`}
{'\n  '}<span className="jk">"ver"</span>: <span className="jn">1</span>, <span className="jk">"type"</span>: <span className="js">"event"</span>, <span className="jk">"from"</span>: <span className="js">"stm32"</span>, <span className="jk">"to"</span>: <span className="js">"rp5"</span>,
{'\n  '}<span className="jk">"seq"</span>: <span className="jn">1013</span>, <span className="jk">"t"</span>: <span className="jn">1720000005</span>,
{'\n  '}<span className="jk">"body"</span>: {'{'}
{'\n    '}<span className="jk">"code"</span>:    <span className="js">"LED_OPEN_FAULT"</span>,    <span style={DIM}>// Machine-readable event code</span>
{'\n    '}<span className="jk">"detail"</span>: <span className="js">"open circuit detected"</span>,
{'\n    '}<span className="jk">"sev"</span>:    <span className="jn">2</span>                     <span style={DIM}>// 0=info, 1=warn, 2=error, 3=critical</span>
{'\n  }'}
{'\n}'}
          </code></pre>

          <h4>Defined Event Codes</h4>
          <table>
            <thead>
              <tr><th>Code</th><th>Severity</th><th>Trigger Condition</th><th>Auto-Action</th></tr>
            </thead>
            <tbody>
              <tr><td><code>LED_OPEN_FAULT</code></td><td>2 (error)</td><td>PGOOD goes low or LED open-circuit</td><td>Disable LED boost</td></tr>
              <tr><td><code>LED_RECOVERED</code></td><td>0 (info)</td><td>PGOOD restored</td><td>—</td></tr>
              <tr><td><code>WTR_LOW</code></td><td>1 (warn)</td><td>Water level sensor goes low</td><td>Disable pump &amp; solenoid</td></tr>
              <tr><td><code>WTR_OK</code></td><td>0 (info)</td><td>Water level restored</td><td>—</td></tr>
              <tr><td><code>TEMP_HIGH</code></td><td>1 (warn)</td><td>Temperature &gt; threshold</td><td>Fan to 100%</td></tr>
              <tr><td><code>I2C_FAULT</code></td><td>2 (error)</td><td>I²C bus NACK / timeout</td><td>Retry, then report</td></tr>
              <tr><td><code>BOOT</code></td><td>0 (info)</td><td>STM32 power-on or reset</td><td>Send config request</td></tr>
            </tbody>
          </table>

          {/* 5.3 Command */}
          <h3>5.3 Command <span className="july-tag rx">RP5 → STM32</span></h3>
          <p>
            Sent by RP5 to change an actuator state or request a specific action. Each command
            gets a unique <code>id</code> for tracking.
          </p>

          <pre><code>
<span style={DIM}>// Example: Set LED duty cycle</span>
{'\n{'}
{'\n  '}<span className="jk">"ver"</span>: <span className="jn">1</span>, <span className="jk">"type"</span>: <span className="js">"cmd"</span>, <span className="jk">"from"</span>: <span className="js">"rp5"</span>, <span className="jk">"to"</span>: <span className="js">"stm32"</span>,
{'\n  '}<span className="jk">"seq"</span>: <span className="jn">50</span>, <span className="jk">"id"</span>: <span className="js">"cmd-1042"</span>,
{'\n  '}<span className="jk">"body"</span>: {'{'}
{'\n    '}<span className="jk">"cmd"</span>:  <span className="js">"set_led"</span>,
{'\n    '}<span className="jk">"duty"</span>: <span className="jn">0.6</span>            <span style={DIM}>// 0.0–1.0 (mapped to TIM2 CCR1)</span>
{'\n  }'}
{'\n}'}
          </code></pre>

          <h4>Command Catalogue</h4>
          <table>
            <thead>
              <tr><th>cmd</th><th>Parameters</th><th>Description</th></tr>
            </thead>
            <tbody>
              <tr><td><code>set_led</code></td><td><code>duty</code>: 0.0–1.0</td><td>Set LED PWM duty cycle. duty=0 turns off.</td></tr>
              <tr><td><code>set_pump</code></td><td><code>duty</code>: 0.0–1.0</td><td>Set water pump PWM duty cycle.</td></tr>
              <tr><td><code>set_mist</code></td><td><code>on</code>: bool</td><td>Mist maker on/off (digital only).</td></tr>
              <tr><td><code>set_sol</code></td><td><code>on</code>: bool</td><td>Solenoid valve on/off.</td></tr>
              <tr><td><code>set_fan</code></td><td><code>duty</code>: 0.0–1.0</td><td>Set fan PWM duty. duty=0 off.</td></tr>
              <tr><td><code>set_telem_rate</code></td><td><code>ms</code>: uint16</td><td>Change telemetry interval (100–5000 ms).</td></tr>
              <tr><td><code>time_sync</code></td><td><code>epoch</code>: uint32</td><td>Sync STM32's timestamp to RP5's clock.</td></tr>
              <tr><td><code>reboot</code></td><td>—</td><td>Software reset via NVIC_SystemReset().</td></tr>
              <tr><td><code>get_status</code></td><td>—</td><td>Request an immediate telemetry packet.</td></tr>
            </tbody>
          </table>

          {/* 5.4 Acknowledgement */}
          <h3>5.4 Acknowledgement <span className="july-tag tx">STM32 → RP5</span></h3>
          <p>
            Sent in response to every <code>cmd</code> message. Uses the same <code>id</code> to correlate.
          </p>

          <pre><code>
{`{`}
{'\n  '}<span className="jk">"ver"</span>: <span className="jn">1</span>, <span className="jk">"type"</span>: <span className="js">"ack"</span>, <span className="jk">"from"</span>: <span className="js">"stm32"</span>, <span className="jk">"to"</span>: <span className="js">"rp5"</span>,
{'\n  '}<span className="jk">"seq"</span>: <span className="jn">1014</span>, <span className="jk">"id"</span>: <span className="js">"cmd-1042"</span>,
{'\n  '}<span className="jk">"body"</span>: {'{'}
{'\n    '}<span className="jk">"ok"</span>:    <span className="jb">true</span>,
{'\n    '}<span className="jk">"err"</span>:   <span className="jnl">null</span>,           <span style={DIM}>// null on success, error code string on failure</span>
{'\n    '}<span className="jk">"msg"</span>:   <span className="js">"done"</span>           <span style={DIM}>// Human-readable status</span>
{'\n  }'}
{'\n}'}
          </code></pre>

          <h4>Error Codes for ACK</h4>
          <table>
            <thead>
              <tr><th>err</th><th>Meaning</th></tr>
            </thead>
            <tbody>
              <tr><td><code>null</code></td><td>Success</td></tr>
              <tr><td><code>"INVALID_CMD"</code></td><td>Unknown command name</td></tr>
              <tr><td><code>"INVALID_PARAM"</code></td><td>Parameter out of range (e.g. duty &gt; 1.0)</td></tr>
              <tr><td><code>"HW_FAULT"</code></td><td>Hardware fault prevents execution (e.g. PGOOD low)</td></tr>
              <tr><td><code>"BUSY"</code></td><td>Previous command still executing</td></tr>
              <tr><td><code>"SAFETY"</code></td><td>Safety interlock (e.g. water low, refusing pump)</td></tr>
            </tbody>
          </table>

          {/* 5.5 Heartbeat */}
          <h3>5.5 Heartbeat <span className="july-tag bi">Bidirectional</span></h3>
          <p>Sent every 5 seconds if no other message was sent. Used to detect link loss.</p>

          <pre><code>
{`{`}
{'\n  '}<span className="jk">"ver"</span>: <span className="jn">1</span>, <span className="jk">"type"</span>: <span className="js">"hb"</span>, <span className="jk">"from"</span>: <span className="js">"stm32"</span>, <span className="jk">"to"</span>: <span className="js">"rp5"</span>,
{'\n  '}<span className="jk">"seq"</span>: <span className="jn">1015</span>,
{'\n  '}<span className="jk">"body"</span>: {'{'}
{'\n    '}<span className="jk">"uptime"</span>: <span className="jn">36000</span>    <span style={DIM}>// Seconds since boot</span>
{'\n  }'}
{'\n}'}
          </code></pre>

          <div className="july-callout warn">
            <strong>Link-loss detection:</strong> If either side doesn't receive any message
            (including heartbeat) for 15 seconds, it should declare link-down. STM32 should blink
            COM_STATUS_LED (PB0) to indicate disconnection and enter a safe fallback mode.
          </div>

          {/* ════════════════════════════════════════════════ */}
          {/* 6. Firmware Architecture (STM32)                 */}
          {/* ════════════════════════════════════════════════ */}
          <h2 id="fw">6. Firmware Architecture (STM32)</h2>

          <h3>Core Design: Super-loop + UART Interrupt/DMA</h3>
          <p>
            The firmware uses a cooperative super-loop for sensor polling and telemetry
            transmission, while UART reception from RP5 is handled via DMA with an idle-line
            interrupt so commands are processed without blocking the main loop.
          </p>

          <pre><code>
<span style={DIM}>{'/*  main.c — JULY firmware top-level architecture  */'}</span>
{'\n'}
{'\n'}<span style={ACC}>// MAIN LOOP (super-loop, non-blocking)</span>
{'\n'}while (1) {'{'}
{'\n    '}uint32_t now = HAL_GetTick();
{'\n'}
{'\n    '}<span style={DIM}>// ── 1. Cyclic Sensor Read (every TELEM_INTERVAL_MS) ──</span>
{'\n    '}if (now - last_sensor_tick {'>'}= telem_interval_ms) {'{'}
{'\n        '}last_sensor_tick = now;
{'\n'}
{'\n        '}sensors_read_all(&sensor_data);   <span style={DIM}>// I2C reads: PPFD, THP, CO2</span>
{'\n        '}monitor_check_faults(&sensor_data, &actuator_state);  <span style={DIM}>// PGOOD, WTR_LVL</span>
{'\n'}
{'\n        '}telem_build_and_send(&sensor_data, &actuator_state);  <span style={DIM}>// JSON → UART TX</span>
{'\n    }'}
{'\n'}
{'\n    '}<span style={DIM}>// ── 2. Process Received Commands (from DMA ring buffer) ──</span>
{'\n    '}if (uart_rx_has_message()) {'{'}
{'\n        '}char *msg = uart_rx_get_message();
{'\n        '}cmd_parse_and_execute(msg, &actuator_state);  <span style={DIM}>// Parse JSON, apply, send ACK</span>
{'\n    }'}
{'\n'}
{'\n    '}<span style={DIM}>// ── 3. Heartbeat (if no TX in last 5s) ──</span>
{'\n    '}if (now - last_tx_tick {'>'}= 5000) {'{'}
{'\n        '}heartbeat_send();
{'\n    }'}
{'\n'}
{'\n    '}<span style={DIM}>// ── 4. Safety Watchdog ──</span>
{'\n    '}if (now - last_rx_tick {'>'}= 15000) {'{'}
{'\n        '}safety_enter_fallback();  <span style={DIM}>// No comms → safe state</span>
{'\n    }'}
{'\n}'}
          </code></pre>

          <h3>UART RX Strategy: DMA + IDLE Line Interrupt</h3>
          <p>
            This is the key to non-blocking command reception. Instead of polling or blocking on
            HAL_UART_Receive, use DMA to continuously fill a ring buffer, and trigger processing
            when the UART idle line is detected (meaning RP5 finished sending a message).
          </p>

          <pre><code>
<span style={DIM}>// CubeMX Configuration:</span>
{'\n'}<span style={DIM}>// 1. USART1: Async, 115200, 8N1</span>
{'\n'}<span style={DIM}>// 2. DMA: USART1_RX → Circular mode, Byte size</span>
{'\n'}<span style={DIM}>// 3. NVIC: Enable USART1 global interrupt</span>
{'\n'}
{'\n'}<span style={ACC}>#define</span> RX_BUF_SIZE 512
{'\n'}uint8_t rx_dma_buf[RX_BUF_SIZE];    <span style={DIM}>// DMA fills this circular buffer</span>
{'\n'}char    rx_msg_buf[RX_BUF_SIZE];    <span style={DIM}>// Assembled complete message</span>
{'\n'}volatile uint8_t rx_msg_ready = 0;
{'\n'}
{'\n'}<span style={DIM}>// Start DMA reception once at init:</span>
{'\n'}void UART_Init(void) {'{'}
{'\n    '}__HAL_UART_ENABLE_IT(&huart1, UART_IT_IDLE);  <span style={DIM}>// Enable IDLE interrupt</span>
{'\n    '}HAL_UART_Receive_DMA(&huart1, rx_dma_buf, RX_BUF_SIZE);
{'\n}'}
{'\n'}
{'\n'}<span style={DIM}>// IDLE line ISR — fires when RP5 stops transmitting</span>
{'\n'}void USART1_IRQHandler(void) {'{'}
{'\n    '}if (__HAL_UART_GET_FLAG(&huart1, UART_FLAG_IDLE)) {'{'}
{'\n        '}__HAL_UART_CLEAR_IDLEFLAG(&huart1);
{'\n'}
{'\n        '}uint16_t dma_remaining = __HAL_DMA_GET_COUNTER(huart1.hdmarx);
{'\n        '}uint16_t received = RX_BUF_SIZE - dma_remaining;
{'\n'}
{'\n        '}<span style={DIM}>// Copy from DMA buffer → message buffer, scan for '\n'</span>
{'\n        '}uart_rx_process_dma(rx_dma_buf, received);
{'\n    }'}
{'\n    '}HAL_UART_IRQHandler(&huart1);  <span style={DIM}>// Handle other flags</span>
{'\n}'}
          </code></pre>

          <h3>CubeMX Peripheral Setup Summary</h3>
          <table>
            <thead>
              <tr><th>Peripheral</th><th>Config</th><th>Purpose</th></tr>
            </thead>
            <tbody>
              <tr><td>USART1</td><td>115200 8N1, DMA RX Circular, TX Normal</td><td>RP5 communication</td></tr>
              <tr><td>I2C1</td><td>100 kHz Standard, 4.7k pull-ups on board</td><td>Sensor bus (MUX → PPFD, THP)</td></tr>
              <tr><td>TIM2 CH1</td><td>PWM, ~20 kHz</td><td>LED driver duty (MCU_LED_PWM → PA0)</td></tr>
              <tr><td>TIM2 CH3</td><td>PWM, ~1 kHz</td><td>Water pump duty (WTRP_PWM_CTRL → PA2)</td></tr>
              <tr><td>TIM4 CH2</td><td>PWM, ~25 kHz</td><td>Fan speed (MCU_FAN_OUT → PC15)</td></tr>
              <tr><td>TIM4 CH1</td><td>Input Capture</td><td>Fan tachometer (MCU_FAN_IN → PC14)</td></tr>
              <tr><td>PA5</td><td>GPIO Output, Push-Pull</td><td>BOOST_DISABLE (LED driver enable)</td></tr>
              <tr><td>PA7</td><td>GPIO Output, Push-Pull</td><td>MIST_MAKER_CTRL</td></tr>
              <tr><td>PB12</td><td>GPIO Output, Push-Pull</td><td>Solenoid_CTRL</td></tr>
              <tr><td>PB13</td><td>GPIO Input, Pull-Up</td><td>WTR_LEVEL</td></tr>
              <tr><td>PB14</td><td>GPIO Input, Pull-Up</td><td>PGOOD (LED driver)</td></tr>
              <tr><td>PB0</td><td>GPIO Output, Push-Pull</td><td>COM_STATUS_LED</td></tr>
            </tbody>
          </table>

          <h3>Module Structure (Suggested Files)</h3>
          <pre><code>
{`Core/Src/
├── main.c              `}<span style={DIM}>// Super-loop, init, heartbeat</span>
{'\n'}{`├── uart_protocol.c     `}<span style={DIM}>// DMA RX processing, TX build, JSON parse/serialize</span>
{'\n'}{`├── uart_protocol.h
├── sensors.c           `}<span style={DIM}>// I2C read functions, mux channel selection</span>
{'\n'}{`├── sensors.h
├── actuators.c         `}<span style={DIM}>// PWM set, GPIO set, duty tracking</span>
{'\n'}{`├── actuators.h
├── cmd_handler.c       `}<span style={DIM}>// Command dispatch: parse body → call actuators → send ACK</span>
{'\n'}{`├── cmd_handler.h
├── monitor.c           `}<span style={DIM}>// PGOOD check, water level, fault state machine</span>
{'\n'}{`├── monitor.h
└── json_tiny.c         `}<span style={DIM}>// Minimal JSON parser/serializer (or use cJSON lite)</span>
          </code></pre>

          <div className="july-callout">
            <strong>JSON on STM32:</strong> For parsing, use cJSON (lightweight, ~2 KB RAM).
            For serialization, <code>snprintf()</code> is simpler and avoids dynamic allocation:{' '}
            <code>{'snprintf(buf, 512, "{\\"ver\\":1,\\"type\\":\\"telem\\",\\"seq\\":%u,...}", seq++);'}</code>
          </div>

          {/* ════════════════════════════════════════════════ */}
          {/* 7. Raspberry Pi 5 Middleware                      */}
          {/* ════════════════════════════════════════════════ */}
          <h2 id="rpi">7. Raspberry Pi 5 Middleware</h2>

          <h3>Software Stack</h3>
          <div className="seq-diagram">
            <svg width="700" height="460" viewBox="0 0 700 460" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arrow-down" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                  <polygon points="0 0, 10 5, 0 10, 3 5" fill="#718096" />
                </marker>
              </defs>

              {/* Layer 4: Web Dashboard */}
              <rect x="50" y="30" width="600" height="70" rx="8" fill="#ffb88c" stroke="#d97538" strokeWidth="2" />
              <text x="350" y="55" textAnchor="middle" fill="#ffffff" fontWeight="700" fontSize="16">Web Dashboard</text>
              <text x="350" y="78" textAnchor="middle" fill="#ffffff" fontSize="13">React / Vue / plain HTML+JS</text>

              <line x1="350" y1="100" x2="350" y2="120" stroke="#718096" strokeWidth="2" markerEnd="url(#arrow-down)" />

              {/* Layer 3: WebSocket Server */}
              <rect x="50" y="120" width="600" height="70" rx="8" fill="#5dd4b4" stroke="#3ca98c" strokeWidth="2" />
              <text x="350" y="145" textAnchor="middle" fill="#ffffff" fontWeight="700" fontSize="16">WebSocket Server</text>
              <text x="350" y="168" textAnchor="middle" fill="#ffffff" fontSize="13">FastAPI / Flask-SocketIO</text>

              <line x1="350" y1="190" x2="350" y2="210" stroke="#718096" strokeWidth="2" markerEnd="url(#arrow-down)" />

              {/* Layer 2: Application Layer */}
              <rect x="50" y="210" width="600" height="160" rx="8" fill="#6b9bd1" stroke="#4a7bb7" strokeWidth="2" />
              <text x="350" y="235" textAnchor="middle" fill="#ffffff" fontWeight="700" fontSize="16">Application Layer (Python)</text>

              <rect x="80" y="255" width="260" height="35" rx="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <text x="95" y="275" fill="#ffffff" fontSize="12" fontWeight="600">serial_handler.py</text>

              <rect x="360" y="255" width="260" height="35" rx="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <text x="375" y="275" fill="#ffffff" fontSize="12" fontWeight="600">data_logger.py</text>

              <rect x="80" y="300" width="260" height="35" rx="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <text x="95" y="320" fill="#ffffff" fontSize="12" fontWeight="600">scheduler.py</text>

              <rect x="360" y="300" width="260" height="35" rx="6" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <text x="375" y="320" fill="#ffffff" fontSize="12" fontWeight="600">alert_manager.py</text>

              <line x1="350" y1="370" x2="350" y2="390" stroke="#718096" strokeWidth="2" markerEnd="url(#arrow-down)" />

              {/* Layer 1: Serial Port */}
              <rect x="50" y="390" width="600" height="60" rx="8" fill="#a0aec0" stroke="#718096" strokeWidth="2" />
              <text x="350" y="415" textAnchor="middle" fill="#ffffff" fontWeight="700" fontSize="16">Serial Port</text>
              <text x="350" y="435" textAnchor="middle" fill="#ffffff" fontSize="13">/dev/ttyAMA0 or /dev/serial0</text>
              <text x="590" y="425" textAnchor="end" fill="#ffffff" fontSize="11" fontStyle="italic">115200 8N1</text>
            </svg>
          </div>

          <h3>Python Serial Handler (sketch)</h3>
          <pre><code>
{`import serial, json, threading
from collections import deque

class STM32Link:
    def __init__(self, port='/dev/serial0', baud=115200):
        self.ser = serial.Serial(port, baud, timeout=1)
        self.cmd_counter = 0
        self.pending_acks = {}`}      <span style={DIM}># id → callback</span>
{'\n        '}self.on_telemetry = None    <span style={DIM}># callback(body)</span>
{'\n        '}self.on_event = None        <span style={DIM}># callback(body)</span>
{`

    def read_loop(self):
        """Run in a thread — reads NDJSON lines from STM32."""
        while True:
            line = self.ser.readline().decode('utf-8', errors='ignore').strip()
            if not line:
                continue
            try:
                msg = json.loads(line)
            except json.JSONDecodeError:
                continue

            mtype = msg.get('type')
            if mtype == 'telem' and self.on_telemetry:
                self.on_telemetry(msg)
            elif mtype == 'event' and self.on_event:
                self.on_event(msg)
            elif mtype == 'ack':
                cb = self.pending_acks.pop(msg.get('id'), None)
                if cb: cb(msg['body'])
            elif mtype == 'hb':
                self.last_hb = msg

    def send_cmd(self, cmd, params=None, callback=None):
        """Send a command to STM32."""
        self.cmd_counter += 1
        cmd_id = f"cmd-{self.cmd_counter}"
        body = {"cmd": cmd, **(params or {})}
        msg = {
            "ver": 1, "type": "cmd", "from": "rp5", "to": "stm32",
            "seq": self.cmd_counter, "id": cmd_id, "body": body
        }
        if callback:
            self.pending_acks[cmd_id] = callback
        self.ser.write((json.dumps(msg) + '\\n').encode())
        return cmd_id`}
          </code></pre>

          <h3>WebSocket API (RP5 → Web)</h3>
          <p>
            The web dashboard connects via WebSocket. The RP5 forwards data as-is or enriches it.
          </p>

          <table>
            <thead>
              <tr><th>WS Event</th><th>Direction</th><th>Payload</th></tr>
            </thead>
            <tbody>
              <tr><td><code>telemetry</code></td><td>Server → Client</td><td>Full telemetry body (forwarded every update)</td></tr>
              <tr><td><code>event</code></td><td>Server → Client</td><td>Event body with severity</td></tr>
              <tr><td><code>cmd</code></td><td>Client → Server</td><td><code>{`{"cmd": "set_led", "duty": 0.6}`}</code></td></tr>
              <tr><td><code>ack</code></td><td>Server → Client</td><td>ACK body forwarded from STM32</td></tr>
              <tr><td><code>history</code></td><td>Client → Server</td><td>Request for historical data (from DB)</td></tr>
              <tr><td><code>status</code></td><td>Server → Client</td><td>Connection status, uptime, last heartbeat</td></tr>
            </tbody>
          </table>

          {/* ════════════════════════════════════════════════ */}
          {/* 8. Web Dashboard Interface                        */}
          {/* ════════════════════════════════════════════════ */}
          <h2 id="web">8. Web Dashboard Interface</h2>

          <p>
            The web dashboard is served directly from the RP5 (e.g., via FastAPI static files or
            Nginx). It connects to the RP5's WebSocket endpoint and provides live monitoring plus
            manual controls.
          </p>

          <h3>Dashboard Panels</h3>
          <table>
            <thead>
              <tr><th>Panel</th><th>Data Source</th><th>Controls</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Environment</strong></td><td>light, temp, hum, co2</td><td>—</td></tr>
              <tr><td><strong>LED Control</strong></td><td>led.on, led.duty</td><td>Slider (0–100%), ON/OFF toggle</td></tr>
              <tr><td><strong>Water System</strong></td><td>pump.on, sol, wtr_lvl</td><td>Pump duty slider, solenoid toggle</td></tr>
              <tr><td><strong>Climate</strong></td><td>fan.on, fan.duty, fan.rpm, mist</td><td>Fan speed slider, mist toggle</td></tr>
              <tr><td><strong>Alerts</strong></td><td>Event log (from DB)</td><td>Acknowledge / dismiss</td></tr>
              <tr><td><strong>Graphs</strong></td><td>Historical sensor data</td><td>Time range selector</td></tr>
              <tr><td><strong>System</strong></td><td>uptime, pgood, vbus, link status</td><td>Reboot button, telem rate</td></tr>
            </tbody>
          </table>

          <h3>Data Flow: User → Actuator</h3>
          <pre><code>
{`User drags LED slider to 75%
  → Browser: ws.send({type:"cmd", cmd:"set_led", duty:0.75})
    → RP5: serial.send_cmd("set_led", {duty: 0.75})
      → STM32: parse cmd → TIM2->CCR1 = 0.75 * ARR → send ACK
    → RP5: receives ACK → ws.emit("ack", {ok: true})
  → Browser: update slider confirmed state`}
          </code></pre>

          {/* ════════════════════════════════════════════════ */}
          {/* 9. Sequence Diagrams                              */}
          {/* ════════════════════════════════════════════════ */}
          <h2 id="seq">9. Sequence Diagrams</h2>

          <h3>Normal Operation (Cyclic Telemetry)</h3>
          <div className="seq-diagram">
            <svg width="700" height="320" viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#3ca98c" />
                </marker>
              </defs>

              {/* Participants */}
              <rect x="50" y="20" width="100" height="40" rx="8" fill="#6b9bd1" stroke="#4a7bb7" strokeWidth="2" />
              <text x="100" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="14">STM32</text>

              <rect x="300" y="20" width="100" height="40" rx="8" fill="#5dd4b4" stroke="#3ca98c" strokeWidth="2" />
              <text x="350" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="14">RP5</text>

              <rect x="550" y="20" width="100" height="40" rx="8" fill="#ffb88c" stroke="#d97538" strokeWidth="2" />
              <text x="600" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="14">Web</text>

              {/* Lifelines */}
              <line x1="100" y1="60" x2="100" y2="300" stroke="#dfe6ed" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="350" y1="60" x2="350" y2="300" stroke="#dfe6ed" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="600" y1="60" x2="600" y2="300" stroke="#dfe6ed" strokeWidth="2" strokeDasharray="5,5" />

              {/* Message 1: STM32 → RP5 */}
              <line x1="100" y1="100" x2="350" y2="100" stroke="#3ca98c" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="225" y="90" textAnchor="middle" fill="#3ca98c" fontSize="12" fontWeight="500">telem (seq=1012)</text>

              {/* Message 2: RP5 → Web */}
              <line x1="350" y1="130" x2="600" y2="130" stroke="#3ca98c" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="475" y="120" textAnchor="middle" fill="#3ca98c" fontSize="12" fontWeight="500">ws: telemetry</text>

              {/* Note: display update */}
              <rect x="520" y="145" width="110" height="30" rx="4" fill="#fff5e6" stroke="#ffb88c" strokeWidth="1" />
              <text x="575" y="165" textAnchor="middle" fill="#d97538" fontSize="11" fontStyle="italic">display update</text>

              {/* Note: log to DB */}
              <rect x="270" y="185" width="90" height="30" rx="4" fill="#e6f7f2" stroke="#5dd4b4" strokeWidth="1" />
              <text x="315" y="205" textAnchor="middle" fill="#3ca98c" fontSize="11" fontStyle="italic">log to DB</text>

              {/* Note: 500ms later */}
              <rect x="30" y="225" width="100" height="30" rx="4" fill="#f0f4f8" stroke="#a0aec0" strokeWidth="1" />
              <text x="80" y="245" textAnchor="middle" fill="#718096" fontSize="11" fontStyle="italic">[500ms later]</text>

              {/* Message 3: STM32 → RP5 */}
              <line x1="100" y1="270" x2="350" y2="270" stroke="#3ca98c" strokeWidth="2" markerEnd="url(#arrowhead)" />
              <text x="225" y="260" textAnchor="middle" fill="#3ca98c" fontSize="12" fontWeight="500">telem (seq=1013)</text>
            </svg>
          </div>

          <h3>Command Flow (User Sets LED)</h3>
          <div className="seq-diagram">
            <svg width="700" height="400" viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <marker id="arrowhead-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#4a7bb7" />
                </marker>
                <marker id="arrowhead-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                  <polygon points="0 0, 10 3, 0 6" fill="#3ca98c" />
                </marker>
              </defs>

              {/* Participants */}
              <rect x="50" y="20" width="100" height="40" rx="8" fill="#6b9bd1" stroke="#4a7bb7" strokeWidth="2" />
              <text x="100" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="14">STM32</text>

              <rect x="300" y="20" width="100" height="40" rx="8" fill="#5dd4b4" stroke="#3ca98c" strokeWidth="2" />
              <text x="350" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="14">RP5</text>

              <rect x="550" y="20" width="100" height="40" rx="8" fill="#ffb88c" stroke="#d97538" strokeWidth="2" />
              <text x="600" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="14">Web</text>

              {/* Lifelines */}
              <line x1="100" y1="60" x2="100" y2="380" stroke="#dfe6ed" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="350" y1="60" x2="350" y2="380" stroke="#dfe6ed" strokeWidth="2" strokeDasharray="5,5" />
              <line x1="600" y1="60" x2="600" y2="380" stroke="#dfe6ed" strokeWidth="2" strokeDasharray="5,5" />

              {/* Note: user action */}
              <rect x="530" y="80" width="90" height="30" rx="4" fill="#fff5e6" stroke="#ffb88c" strokeWidth="1" />
              <text x="575" y="100" textAnchor="middle" fill="#d97538" fontSize="11" fontStyle="italic">user action</text>

              {/* Message 1: Web → RP5 (command) */}
              <line x1="600" y1="130" x2="350" y2="130" stroke="#4a7bb7" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
              <text x="475" y="120" textAnchor="middle" fill="#4a7bb7" fontSize="12" fontWeight="500">ws: set_led, duty=0.6</text>

              {/* Message 2: RP5 → STM32 (command) */}
              <line x1="350" y1="170" x2="100" y2="170" stroke="#4a7bb7" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
              <text x="225" y="160" textAnchor="middle" fill="#4a7bb7" fontSize="12" fontWeight="500">cmd (id=cmd-50)</text>

              {/* Note: set TIM2 CCR1 */}
              <rect x="20" y="185" width="110" height="30" rx="4" fill="#e6f0ff" stroke="#6b9bd1" strokeWidth="1" />
              <text x="75" y="205" textAnchor="middle" fill="#4a7bb7" fontSize="11" fontStyle="italic">set TIM2 CCR1</text>

              {/* Message 3: STM32 → RP5 (ack) */}
              <line x1="100" y1="240" x2="350" y2="240" stroke="#3ca98c" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
              <text x="225" y="230" textAnchor="middle" fill="#3ca98c" fontSize="12" fontWeight="500">ack (ok=true)</text>

              {/* Message 4: RP5 → Web (ack) */}
              <line x1="350" y1="280" x2="600" y2="280" stroke="#3ca98c" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
              <text x="475" y="270" textAnchor="middle" fill="#3ca98c" fontSize="12" fontWeight="500">ws: ack</text>

              {/* Note: confirmed */}
              <rect x="530" y="295" width="110" height="30" rx="4" fill="#e6f7f2" stroke="#5dd4b4" strokeWidth="1" />
              <text x="585" y="315" textAnchor="middle" fill="#3ca98c" fontSize="11" fontStyle="italic">slider confirmed</text>

              {/* Message 5: Next telem */}
              <line x1="100" y1="350" x2="350" y2="350" stroke="#3ca98c" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
              <text x="225" y="340" textAnchor="middle" fill="#3ca98c" fontSize="12" fontWeight="500">telem (led.duty=0.6)</text>
            </svg>
          </div>

          {/* ════════════════════════════════════════════════ */}
          {/* 10. Error Handling & Fault Recovery               */}
          {/* ════════════════════════════════════════════════ */}
          <h2 id="err">10. Error Handling &amp; Fault Recovery</h2>

          <h3>Fault State Machine (STM32)</h3>
          <p>
            The STM32 firmware runs a simple fault state machine in <code>monitor.c</code>. Each
            fault source (PGOOD, water level, I²C bus, comms link) is checked every cycle.
            When a fault triggers, the STM32 takes an immediate safe action and sends an{' '}
            <code>event</code> message to RP5.
          </p>

          <table>
            <thead>
              <tr><th>Fault</th><th>Detection</th><th>Immediate Action</th><th>Recovery</th></tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>LED Open Circuit</strong></td>
                <td>PGOOD (PB14) goes low</td>
                <td>Disable boost via PA5 (BOOST_DISABLE high)</td>
                <td>Auto-retry after 5 s; if PGOOD restored, resume. After 3 retries, stay disabled until manual <code>set_led</code> command.</td>
              </tr>
              <tr>
                <td><strong>Water Low</strong></td>
                <td>WTR_LEVEL (PB13) goes low</td>
                <td>Disable pump &amp; solenoid immediately</td>
                <td>Resume when sensor returns high. Send <code>WTR_OK</code> event.</td>
              </tr>
              <tr>
                <td><strong>Over-Temperature</strong></td>
                <td>THP sensor temp &gt; configurable threshold</td>
                <td>Fan to 100% duty, LED to 50% duty</td>
                <td>Restore original duties when temp drops below threshold - 2°C (hysteresis).</td>
              </tr>
              <tr>
                <td><strong>I²C Bus Fault</strong></td>
                <td>HAL returns NACK / timeout</td>
                <td>Retry up to 3 times with 100 ms backoff</td>
                <td>If still failing, report <code>I2C_FAULT</code> event. Use last known sensor values. Retry every 5 s.</td>
              </tr>
              <tr>
                <td><strong>Comms Link Loss</strong></td>
                <td>No RX from RP5 for 15 s</td>
                <td>Enter fallback: LED off, fan 50%, pump off, blink COM_STATUS_LED</td>
                <td>Resume normal control when any valid message received from RP5.</td>
              </tr>
            </tbody>
          </table>

          <h3>RP5 Retry Policy</h3>
          <p>
            When the RP5 sends a command and does not receive an <code>ack</code> within
            2 seconds, it retries up to 3 times with exponential backoff (2 s, 4 s, 8 s).
            If all retries fail, the dashboard shows a "device unreachable" warning.
          </p>

          <div className="july-callout">
            <strong>Graceful degradation:</strong> The system is designed so that the STM32 can
            operate independently if the RP5 link is lost. The fallback mode keeps the plant safe
            (fan running, LED off, no watering) until communication is restored.
          </div>

          {/* ── Back to Projects link ── */}
          <div className="page-section" style={{ marginTop: '3rem' }}>
            <Link to="/project" className="link-hover-effect">Back to Projects</Link>
          </div>
        </div>
      </div>

      <div className="dot-divider dot-divider-bottom">
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
        <span className="circle-dot"></span>
      </div>
    </>
  )
}

export default July
