import { Link } from 'react-router-dom'
import { CodeBlock } from '../components/BlogPost'
import '../components/BlogPost.css'
import './Home.css'
import './July.css'

/* Shorthand for inline code */
const C = ({ children }) => <code className="blog-inline-code">{children}</code>

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

        <article className="blog-post">
          <div className="blog-post-header">
            <h2 className="blog-post-title">JULY Protocol &amp; System Architecture</h2>
            <div className="blog-post-meta">
              <span className="blog-post-date">Communication Protocol v1.0</span>
              <span className="blog-post-reading-time">STM32F411RET — Raspberry Pi 5 — Web Dashboard</span>
            </div>
          </div>

          <div className="blog-post-body">

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

            {/* ═══════════════════════════════════════════ */}
            {/* 1. System Architecture                      */}
            {/* ═══════════════════════════════════════════ */}
            <h3 className="blog-heading july-section" id="arch">1. System Architecture</h3>

            <div className="arch-diagram">
              <div className="arch-flow">
                <div className="arch-box sensor">
                  <div className="arch-label">I²C Sensors</div>
                  <div className="arch-name">PPFD · THP · CO₂</div>
                </div>

                <div className="arch-down">
                  <span>↓</span>
                  <span className="arch-down-label">I²C Bus</span>
                </div>

                <div className="arch-split">
                  <div className="arch-box mcu">
                    <div className="arch-label">Microcontroller</div>
                    <div className="arch-name">STM32F411RET</div>
                  </div>
                  <div className="arch-branch">
                    <div className="arch-side">
                      <span className="arch-side-arrow">→</span>
                      <span className="arch-side-label">PWM / GPIO</span>
                    </div>
                    <div className="arch-box actuator">
                      <div className="arch-label">Actuators</div>
                      <div className="arch-name">LED · Pump · Mist · Solenoid · Fan</div>
                    </div>
                  </div>
                </div>

                <div className="arch-down">
                  <span>↕</span>
                  <span className="arch-down-label">UART 115 200</span>
                </div>

                <div className="arch-box rpi">
                  <div className="arch-label">Gateway / Brain</div>
                  <div className="arch-name">Raspberry Pi 5</div>
                </div>

                <div className="arch-down">
                  <span>↕</span>
                  <span className="arch-down-label">WebSocket</span>
                </div>

                <div className="arch-box web">
                  <div className="arch-label">Frontend</div>
                  <div className="arch-name">Web Dashboard</div>
                </div>
              </div>
            </div>

            <h4 className="july-subheading">Responsibilities</h4>
            <table className="july-table">
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

            {/* ═══════════════════════════════════════════ */}
            {/* 2. Hardware Pin Map                         */}
            {/* ═══════════════════════════════════════════ */}
            <h3 className="blog-heading july-section" id="hw">2. Hardware Pin Map (from schematic)</h3>

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

            {/* ═══════════════════════════════════════════ */}
            {/* 3. UART Framing Layer                       */}
            {/* ═══════════════════════════════════════════ */}
            <h3 className="blog-heading july-section" id="frame">3. UART Framing Layer</h3>

            <p className="blog-text">
              Before the JSON datagram, you need a reliable byte-level framing protocol so the
              receiver knows where one message starts and ends. I recommend{' '}
              <strong>line-delimited JSON (NDJSON)</strong> for simplicity during development,
              with an optional upgrade path to COBS framing.
            </p>

            <h4 className="july-subheading">Option A: Newline-Delimited JSON (Recommended for Dev)</h4>
            <CodeBlock value={`// Each message = one line of JSON terminated by \\n
{"ver":1,"type":"telem","seq":1012,"body":{"light":315,"temp":23.4}}\\n
{"ver":1,"type":"cmd","id":"cmd-1042","body":{"cmd":"set_led","duty":0.6}}\\n`} />

            <p className="blog-text">
              <mark className="blog-highlight">
                <strong>Why NDJSON?</strong> Simple to implement with HAL_UART + DMA, easy to debug
                with a serial terminal, and Python's <C>serial.readline()</C> handles it natively.
              </mark>
            </p>

            <h4 className="july-subheading">UART Configuration</h4>
            <table className="july-table">
              <thead>
                <tr><th>Parameter</th><th>Value</th><th>Note</th></tr>
              </thead>
              <tbody>
                <tr><td>Baud rate</td><td><C>115200</C></td><td>Sufficient for ~500-byte JSON at 10 Hz</td></tr>
                <tr><td>Data bits</td><td>8</td><td></td></tr>
                <tr><td>Parity</td><td>None</td><td></td></tr>
                <tr><td>Stop bits</td><td>1</td><td></td></tr>
                <tr><td>Flow control</td><td>None</td><td>Software throttling via seq numbers</td></tr>
                <tr><td>Delimiter</td><td><C>\n</C> (0x0A)</td><td>Line feed terminates each datagram</td></tr>
                <tr><td>Max message size</td><td>512 bytes</td><td>Define a TX/RX buffer of this size</td></tr>
              </tbody>
            </table>

            {/* ═══════════════════════════════════════════ */}
            {/* 4. Datagram Protocol Specification           */}
            {/* ═══════════════════════════════════════════ */}
            <h3 className="blog-heading july-section" id="proto">4. Datagram Protocol Specification</h3>

            <h4 className="july-subheading">Envelope (Common Header)</h4>
            <p className="blog-text">Every message follows this JSON envelope structure:</p>

            <CodeBlock value={`{
  "ver":  1,              // Protocol version (integer)
  "type": "telem",        // Message type: telem | event | cmd | ack | hb
  "from": "stm32",        // Sender: "stm32" or "rp5"
  "to":   "rp5",          // Receiver: "stm32" or "rp5"
  "seq":  1012,           // Sequence number (uint16 wrapping)
  "t":    1720000000,     // Unix timestamp (RP5 syncs time to STM32)
  "id":   "cmd-1042",     // [cmd/ack only] Unique command ID for matching
  "body": { ... }          // Type-specific payload (see §5)
}`} />

            <h4 className="july-subheading">Field Reference</h4>
            <table className="july-table">
              <thead>
                <tr><th>Field</th><th>Type</th><th>Required</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td><C>ver</C></td><td>uint8</td><td>Always</td><td>Protocol version. Start at 1. Allows future upgrades.</td></tr>
                <tr><td><C>type</C></td><td>string</td><td>Always</td><td>One of: <C>telem</C>, <C>event</C>, <C>cmd</C>, <C>ack</C>, <C>hb</C></td></tr>
                <tr><td><C>from</C></td><td>string</td><td>Always</td><td>Origin node</td></tr>
                <tr><td><C>to</C></td><td>string</td><td>Always</td><td>Destination node</td></tr>
                <tr><td><C>seq</C></td><td>uint16</td><td>Always</td><td>Incrementing sequence, wraps at 65535. Used for ordering and loss detection.</td></tr>
                <tr><td><C>t</C></td><td>uint32</td><td>telem, event</td><td>Unix timestamp. STM32 uses its own tick counter if time not synced. RP5 provides epoch via <C>time_sync</C> command.</td></tr>
                <tr><td><C>id</C></td><td>string</td><td>cmd, ack</td><td>Unique command ID to correlate request/response pairs. Format: <C>{"\"cmd-XXXX\""}</C></td></tr>
                <tr><td><C>body</C></td><td>object</td><td>Always</td><td>Type-dependent payload (see below)</td></tr>
              </tbody>
            </table>

            <p className="blog-text">
              <mark className="blog-highlight">
                <strong>Design decision — short keys:</strong> Using abbreviated field names
                (<C>telem</C> not <C>telemetry</C>, <C>hb</C> not <C>heartbeat</C>)
                keeps messages compact for the 115200 baud link. Each byte matters when you're sending at 2–10 Hz.
              </mark>
            </p>

            {/* ═══════════════════════════════════════════ */}
            {/* 5. Message Types & Payloads                 */}
            {/* ═══════════════════════════════════════════ */}
            <h3 className="blog-heading july-section" id="msgs">5. Message Types &amp; Payloads</h3>

            {/* 5.1 Telemetry */}
            <h4 className="july-subheading">5.1 Telemetry <span className="july-tag tx">STM32 → RP5</span></h4>
            <p className="blog-text">
              Sent cyclically every <strong>N ms</strong> (configurable, default 500 ms).
              Contains all sensor readings and actuator states in one packet.
            </p>

            <CodeBlock value={`{
  "ver": 1, "type": "telem", "from": "stm32", "to": "rp5",
  "seq": 1012, "t": 1720000000,
  "body": {
    // --- Sensor Readings ---
    "light":    315,        // PPFD sensor (µmol/m²/s)
    "temp":     23.4,       // Temperature (°C)
    "hum":      65,         // Relative humidity (%)
    "co2":      420,        // CO₂ concentration (ppm)
    "wtr_lvl":  true,       // Water level sensor (true = OK, false = low)

    // --- Actuator States ---
    "led":      { "on": true,  "duty": 0.6 },   // LED array
    "pump":     { "on": false, "duty": 0.0 },   // Water pump
    "mist":     false,       // Mist maker (on/off only)
    "sol":      false,       // Solenoid valve (on/off only)
    "fan":      { "on": true,  "duty": 0.8, "rpm": 1200 },  // Fan w/ tachometer

    // --- Board Health ---
    "pgood":    true,        // LED driver power-good flag
    "vbus":     20.1         // USB-PD input voltage (if ADC available)
  }
}`} />

            {/* 5.2 Event */}
            <h4 className="july-subheading">5.2 Event <span className="july-tag tx">STM32 → RP5</span></h4>
            <p className="blog-text">
              Sent immediately when an asynchronous condition is detected (fault, threshold,
              state change). Not periodic.
            </p>

            <CodeBlock value={`{
  "ver": 1, "type": "event", "from": "stm32", "to": "rp5",
  "seq": 1013, "t": 1720000005,
  "body": {
    "code":    "LED_OPEN_FAULT",    // Machine-readable event code
    "detail":  "open circuit detected",
    "sev":     2                     // 0=info, 1=warn, 2=error, 3=critical
  }
}`} />

            <h4 className="july-label">Defined Event Codes</h4>
            <table className="july-table">
              <thead>
                <tr><th>Code</th><th>Severity</th><th>Trigger Condition</th><th>Auto-Action</th></tr>
              </thead>
              <tbody>
                <tr><td><C>LED_OPEN_FAULT</C></td><td>2 (error)</td><td>PGOOD goes low or LED open-circuit</td><td>Disable LED boost</td></tr>
                <tr><td><C>LED_RECOVERED</C></td><td>0 (info)</td><td>PGOOD restored</td><td>—</td></tr>
                <tr><td><C>WTR_LOW</C></td><td>1 (warn)</td><td>Water level sensor goes low</td><td>Disable pump &amp; solenoid</td></tr>
                <tr><td><C>WTR_OK</C></td><td>0 (info)</td><td>Water level restored</td><td>—</td></tr>
                <tr><td><C>TEMP_HIGH</C></td><td>1 (warn)</td><td>Temperature &gt; threshold</td><td>Fan to 100%</td></tr>
                <tr><td><C>I2C_FAULT</C></td><td>2 (error)</td><td>I²C bus NACK / timeout</td><td>Retry, then report</td></tr>
                <tr><td><C>BOOT</C></td><td>0 (info)</td><td>STM32 power-on or reset</td><td>Send config request</td></tr>
              </tbody>
            </table>

            {/* 5.3 Command */}
            <h4 className="july-subheading">5.3 Command <span className="july-tag rx">RP5 → STM32</span></h4>
            <p className="blog-text">
              Sent by RP5 to change an actuator state or request a specific action. Each command
              gets a unique <C>id</C> for tracking.
            </p>

            <CodeBlock value={`// Example: Set LED duty cycle
{
  "ver": 1, "type": "cmd", "from": "rp5", "to": "stm32",
  "seq": 50, "id": "cmd-1042",
  "body": {
    "cmd":  "set_led",
    "duty": 0.6            // 0.0–1.0 (mapped to TIM2 CCR1)
  }
}`} />

            <h4 className="july-label">Command Catalogue</h4>
            <table className="july-table">
              <thead>
                <tr><th>cmd</th><th>Parameters</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td><C>set_led</C></td><td><C>duty</C>: 0.0–1.0</td><td>Set LED PWM duty cycle. duty=0 turns off.</td></tr>
                <tr><td><C>set_pump</C></td><td><C>duty</C>: 0.0–1.0</td><td>Set water pump PWM duty cycle.</td></tr>
                <tr><td><C>set_mist</C></td><td><C>on</C>: bool</td><td>Mist maker on/off (digital only).</td></tr>
                <tr><td><C>set_sol</C></td><td><C>on</C>: bool</td><td>Solenoid valve on/off.</td></tr>
                <tr><td><C>set_fan</C></td><td><C>duty</C>: 0.0–1.0</td><td>Set fan PWM duty. duty=0 off.</td></tr>
                <tr><td><C>set_telem_rate</C></td><td><C>ms</C>: uint16</td><td>Change telemetry interval (100–5000 ms).</td></tr>
                <tr><td><C>time_sync</C></td><td><C>epoch</C>: uint32</td><td>Sync STM32's timestamp to RP5's clock.</td></tr>
                <tr><td><C>reboot</C></td><td>—</td><td>Software reset via NVIC_SystemReset().</td></tr>
                <tr><td><C>get_status</C></td><td>—</td><td>Request an immediate telemetry packet.</td></tr>
              </tbody>
            </table>

            {/* 5.4 Acknowledgement */}
            <h4 className="july-subheading">5.4 Acknowledgement <span className="july-tag tx">STM32 → RP5</span></h4>
            <p className="blog-text">
              Sent in response to every <C>cmd</C> message. Uses the same <C>id</C> to correlate.
            </p>

            <CodeBlock value={`{
  "ver": 1, "type": "ack", "from": "stm32", "to": "rp5",
  "seq": 1014, "id": "cmd-1042",
  "body": {
    "ok":    true,
    "err":   null,           // null on success, error code string on failure
    "msg":   "done"          // Human-readable status
  }
}`} />

            <h4 className="july-label">Error Codes for ACK</h4>
            <table className="july-table">
              <thead>
                <tr><th>err</th><th>Meaning</th></tr>
              </thead>
              <tbody>
                <tr><td><C>null</C></td><td>Success</td></tr>
                <tr><td><C>"INVALID_CMD"</C></td><td>Unknown command name</td></tr>
                <tr><td><C>"INVALID_PARAM"</C></td><td>Parameter out of range (e.g. duty &gt; 1.0)</td></tr>
                <tr><td><C>"HW_FAULT"</C></td><td>Hardware fault prevents execution (e.g. PGOOD low)</td></tr>
                <tr><td><C>"BUSY"</C></td><td>Previous command still executing</td></tr>
                <tr><td><C>"SAFETY"</C></td><td>Safety interlock (e.g. water low, refusing pump)</td></tr>
              </tbody>
            </table>

            {/* 5.5 Heartbeat */}
            <h4 className="july-subheading">5.5 Heartbeat <span className="july-tag bi">Bidirectional</span></h4>
            <p className="blog-text">Sent every 5 seconds if no other message was sent. Used to detect link loss.</p>

            <CodeBlock value={`{
  "ver": 1, "type": "hb", "from": "stm32", "to": "rp5",
  "seq": 1015,
  "body": {
    "uptime": 36000    // Seconds since boot
  }
}`} />

            <p className="blog-text">
              <mark className="blog-highlight">
                <strong>Link-loss detection:</strong> If either side doesn't receive any message
                (including heartbeat) for 15 seconds, it should declare link-down. STM32 should blink
                COM_STATUS_LED (PB0) to indicate disconnection and enter a safe fallback mode.
              </mark>
            </p>

            {/* ═══════════════════════════════════════════ */}
            {/* 6. Firmware Architecture (STM32)            */}
            {/* ═══════════════════════════════════════════ */}
            <h3 className="blog-heading july-section" id="fw">6. Firmware Architecture (STM32)</h3>

            <h4 className="july-subheading">Core Design: Super-loop + UART Interrupt/DMA</h4>
            <p className="blog-text">
              The firmware uses a cooperative super-loop for sensor polling and telemetry
              transmission, while UART reception from RP5 is handled via DMA with an idle-line
              interrupt so commands are processed without blocking the main loop.
            </p>

            <CodeBlock value={`/*  main.c — JULY firmware top-level architecture  */

// MAIN LOOP (super-loop, non-blocking)
while (1) {
    uint32_t now = HAL_GetTick();

    // ── 1. Cyclic Sensor Read (every TELEM_INTERVAL_MS) ──
    if (now - last_sensor_tick >= telem_interval_ms) {
        last_sensor_tick = now;

        sensors_read_all(&sensor_data);   // I2C reads: PPFD, THP, CO2
        monitor_check_faults(&sensor_data, &actuator_state);  // PGOOD, WTR_LVL

        telem_build_and_send(&sensor_data, &actuator_state);  // JSON → UART TX
    }

    // ── 2. Process Received Commands (from DMA ring buffer) ──
    if (uart_rx_has_message()) {
        char *msg = uart_rx_get_message();
        cmd_parse_and_execute(msg, &actuator_state);  // Parse JSON, apply, send ACK
    }

    // ── 3. Heartbeat (if no TX in last 5s) ──
    if (now - last_tx_tick >= 5000) {
        heartbeat_send();
    }

    // ── 4. Safety Watchdog ──
    if (now - last_rx_tick >= 15000) {
        safety_enter_fallback();  // No comms → safe state
    }
}`} />

            <h4 className="july-subheading">UART RX Strategy: DMA + IDLE Line Interrupt</h4>
            <p className="blog-text">
              This is the key to non-blocking command reception. Instead of polling or blocking on
              HAL_UART_Receive, use DMA to continuously fill a ring buffer, and trigger processing
              when the UART idle line is detected (meaning RP5 finished sending a message).
            </p>

            <CodeBlock value={`// CubeMX Configuration:
// 1. USART1: Async, 115200, 8N1
// 2. DMA: USART1_RX → Circular mode, Byte size
// 3. NVIC: Enable USART1 global interrupt

#define RX_BUF_SIZE 512
uint8_t rx_dma_buf[RX_BUF_SIZE];    // DMA fills this circular buffer
char    rx_msg_buf[RX_BUF_SIZE];    // Assembled complete message
volatile uint8_t rx_msg_ready = 0;

// Start DMA reception once at init:
void UART_Init(void) {
    __HAL_UART_ENABLE_IT(&huart1, UART_IT_IDLE);  // Enable IDLE interrupt
    HAL_UART_Receive_DMA(&huart1, rx_dma_buf, RX_BUF_SIZE);
}

// IDLE line ISR — fires when RP5 stops transmitting
void USART1_IRQHandler(void) {
    if (__HAL_UART_GET_FLAG(&huart1, UART_FLAG_IDLE)) {
        __HAL_UART_CLEAR_IDLEFLAG(&huart1);

        uint16_t dma_remaining = __HAL_DMA_GET_COUNTER(huart1.hdmarx);
        uint16_t received = RX_BUF_SIZE - dma_remaining;

        // Copy from DMA buffer → message buffer, scan for '\\n'
        uart_rx_process_dma(rx_dma_buf, received);
    }
    HAL_UART_IRQHandler(&huart1);  // Handle other flags
}`} />

            <h4 className="july-subheading">CubeMX Peripheral Setup Summary</h4>
            <table className="july-table">
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

            <h4 className="july-subheading">Module Structure (Suggested Files)</h4>
            <CodeBlock value={`Core/Src/
├── main.c              // Super-loop, init, heartbeat
├── uart_protocol.c     // DMA RX processing, TX build, JSON parse/serialize
├── uart_protocol.h
├── sensors.c           // I2C read functions, mux channel selection
├── sensors.h
├── actuators.c         // PWM set, GPIO set, duty tracking
├── actuators.h
├── cmd_handler.c       // Command dispatch: parse body → call actuators → send ACK
├── cmd_handler.h
├── monitor.c           // PGOOD check, water level, fault state machine
├── monitor.h
└── json_tiny.c         // Minimal JSON parser/serializer (or use cJSON lite)`} />

            <p className="blog-text">
              <mark className="blog-highlight">
                <strong>JSON on STM32:</strong> For parsing, use cJSON (lightweight, ~2 KB RAM).
                For serialization, <C>snprintf()</C> is simpler and avoids dynamic allocation.
              </mark>
            </p>

            {/* ═══════════════════════════════════════════ */}
            {/* 7. Raspberry Pi 5 Middleware                 */}
            {/* ═══════════════════════════════════════════ */}
            <h3 className="blog-heading july-section" id="rpi">7. Raspberry Pi 5 Middleware</h3>

            <h4 className="july-subheading">Software Stack</h4>
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
                <rect x="50" y="120" width="600" height="70" rx="8" fill="#6bc4a0" stroke="#4ea886" strokeWidth="2" />
                <text x="350" y="145" textAnchor="middle" fill="#ffffff" fontWeight="700" fontSize="16">WebSocket Server</text>
                <text x="350" y="168" textAnchor="middle" fill="#ffffff" fontSize="13">FastAPI / Flask-SocketIO</text>

                <line x1="350" y1="190" x2="350" y2="210" stroke="#718096" strokeWidth="2" markerEnd="url(#arrow-down)" />

                {/* Layer 2: Application Layer */}
                <rect x="50" y="210" width="600" height="160" rx="8" fill="#7aab96" stroke="#5f937e" strokeWidth="2" />
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

            <h4 className="july-subheading">Python Serial Handler (sketch)</h4>
            <CodeBlock value={`import serial, json, threading
from collections import deque

class STM32Link:
    def __init__(self, port='/dev/serial0', baud=115200):
        self.ser = serial.Serial(port, baud, timeout=1)
        self.cmd_counter = 0
        self.pending_acks = {}      # id → callback
        self.on_telemetry = None    # callback(body)
        self.on_event = None        # callback(body)

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
        return cmd_id`} />

            <h4 className="july-subheading">WebSocket API (RP5 → Web)</h4>
            <p className="blog-text">
              The web dashboard connects via WebSocket. The RP5 forwards data as-is or enriches it.
            </p>

            <table className="july-table">
              <thead>
                <tr><th>WS Event</th><th>Direction</th><th>Payload</th></tr>
              </thead>
              <tbody>
                <tr><td><C>telemetry</C></td><td>Server → Client</td><td>Full telemetry body (forwarded every update)</td></tr>
                <tr><td><C>event</C></td><td>Server → Client</td><td>Event body with severity</td></tr>
                <tr><td><C>cmd</C></td><td>Client → Server</td><td><C>{`{"cmd": "set_led", "duty": 0.6}`}</C></td></tr>
                <tr><td><C>ack</C></td><td>Server → Client</td><td>ACK body forwarded from STM32</td></tr>
                <tr><td><C>history</C></td><td>Client → Server</td><td>Request for historical data (from DB)</td></tr>
                <tr><td><C>status</C></td><td>Server → Client</td><td>Connection status, uptime, last heartbeat</td></tr>
              </tbody>
            </table>

            {/* ═══════════════════════════════════════════ */}
            {/* 8. Web Dashboard Interface                   */}
            {/* ═══════════════════════════════════════════ */}
            <h3 className="blog-heading july-section" id="web">8. Web Dashboard Interface</h3>

            <p className="blog-text">
              The web dashboard is served directly from the RP5 (e.g., via FastAPI static files or
              Nginx). It connects to the RP5's WebSocket endpoint and provides live monitoring plus
              manual controls.
            </p>

            <h4 className="july-subheading">Dashboard Panels</h4>
            <table className="july-table">
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

            <h4 className="july-subheading">Data Flow: User → Actuator</h4>
            <CodeBlock value={`User drags LED slider to 75%
  → Browser: ws.send({type:"cmd", cmd:"set_led", duty:0.75})
    → RP5: serial.send_cmd("set_led", {duty: 0.75})
      → STM32: parse cmd → TIM2->CCR1 = 0.75 * ARR → send ACK
    → RP5: receives ACK → ws.emit("ack", {ok: true})
  → Browser: update slider confirmed state`} />

            {/* ═══════════════════════════════════════════ */}
            {/* 9. Sequence Diagrams                        */}
            {/* ═══════════════════════════════════════════ */}
            <h3 className="blog-heading july-section" id="seq">9. Sequence Diagrams</h3>

            <h4 className="july-subheading">Normal Operation (Cyclic Telemetry)</h4>
            <div className="seq-diagram">
              <svg width="700" height="320" viewBox="0 0 700 320" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#5f937e" />
                  </marker>
                </defs>

                {/* Participants */}
                <rect x="50" y="20" width="100" height="40" rx="8" fill="#7aab96" stroke="#5f937e" strokeWidth="2" />
                <text x="100" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="14">STM32</text>

                <rect x="300" y="20" width="100" height="40" rx="8" fill="#6bc4a0" stroke="#4ea886" strokeWidth="2" />
                <text x="350" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="14">RP5</text>

                <rect x="550" y="20" width="100" height="40" rx="8" fill="#ffb88c" stroke="#d97538" strokeWidth="2" />
                <text x="600" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="14">Web</text>

                {/* Lifelines */}
                <line x1="100" y1="60" x2="100" y2="300" stroke="#e2e6ea" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="350" y1="60" x2="350" y2="300" stroke="#e2e6ea" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="600" y1="60" x2="600" y2="300" stroke="#e2e6ea" strokeWidth="2" strokeDasharray="5,5" />

                {/* Message 1: STM32 → RP5 */}
                <line x1="100" y1="100" x2="350" y2="100" stroke="#5f937e" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="225" y="90" textAnchor="middle" fill="#5f937e" fontSize="12" fontWeight="500">telem (seq=1012)</text>

                {/* Message 2: RP5 → Web */}
                <line x1="350" y1="130" x2="600" y2="130" stroke="#5f937e" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="475" y="120" textAnchor="middle" fill="#5f937e" fontSize="12" fontWeight="500">ws: telemetry</text>

                {/* Note: display update */}
                <rect x="520" y="145" width="110" height="30" rx="4" fill="#fff5e6" stroke="#ffb88c" strokeWidth="1" />
                <text x="575" y="165" textAnchor="middle" fill="#d97538" fontSize="11" fontStyle="italic">display update</text>

                {/* Note: log to DB */}
                <rect x="270" y="185" width="90" height="30" rx="4" fill="#e6f7f2" stroke="#7aab96" strokeWidth="1" />
                <text x="315" y="205" textAnchor="middle" fill="#5f937e" fontSize="11" fontStyle="italic">log to DB</text>

                {/* Note: 500ms later */}
                <rect x="30" y="225" width="100" height="30" rx="4" fill="#f0f4f8" stroke="#a0aec0" strokeWidth="1" />
                <text x="80" y="245" textAnchor="middle" fill="#718096" fontSize="11" fontStyle="italic">[500ms later]</text>

                {/* Message 3: STM32 → RP5 */}
                <line x1="100" y1="270" x2="350" y2="270" stroke="#5f937e" strokeWidth="2" markerEnd="url(#arrowhead)" />
                <text x="225" y="260" textAnchor="middle" fill="#5f937e" fontSize="12" fontWeight="500">telem (seq=1013)</text>
              </svg>
            </div>

            <h4 className="july-subheading">Command Flow (User Sets LED)</h4>
            <div className="seq-diagram">
              <svg width="700" height="400" viewBox="0 0 700 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <marker id="arrowhead-blue" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#5f937e" />
                  </marker>
                  <marker id="arrowhead-green" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                    <polygon points="0 0, 10 3, 0 6" fill="#5f937e" />
                  </marker>
                </defs>

                {/* Participants */}
                <rect x="50" y="20" width="100" height="40" rx="8" fill="#7aab96" stroke="#5f937e" strokeWidth="2" />
                <text x="100" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="14">STM32</text>

                <rect x="300" y="20" width="100" height="40" rx="8" fill="#6bc4a0" stroke="#4ea886" strokeWidth="2" />
                <text x="350" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="14">RP5</text>

                <rect x="550" y="20" width="100" height="40" rx="8" fill="#ffb88c" stroke="#d97538" strokeWidth="2" />
                <text x="600" y="45" textAnchor="middle" fill="#ffffff" fontWeight="600" fontSize="14">Web</text>

                {/* Lifelines */}
                <line x1="100" y1="60" x2="100" y2="380" stroke="#e2e6ea" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="350" y1="60" x2="350" y2="380" stroke="#e2e6ea" strokeWidth="2" strokeDasharray="5,5" />
                <line x1="600" y1="60" x2="600" y2="380" stroke="#e2e6ea" strokeWidth="2" strokeDasharray="5,5" />

                {/* Note: user action */}
                <rect x="530" y="80" width="90" height="30" rx="4" fill="#fff5e6" stroke="#ffb88c" strokeWidth="1" />
                <text x="575" y="100" textAnchor="middle" fill="#d97538" fontSize="11" fontStyle="italic">user action</text>

                {/* Message 1: Web → RP5 (command) */}
                <line x1="600" y1="130" x2="350" y2="130" stroke="#5f937e" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
                <text x="475" y="120" textAnchor="middle" fill="#5f937e" fontSize="12" fontWeight="500">ws: set_led, duty=0.6</text>

                {/* Message 2: RP5 → STM32 (command) */}
                <line x1="350" y1="170" x2="100" y2="170" stroke="#5f937e" strokeWidth="2" markerEnd="url(#arrowhead-blue)" />
                <text x="225" y="160" textAnchor="middle" fill="#5f937e" fontSize="12" fontWeight="500">cmd (id=cmd-50)</text>

                {/* Note: set TIM2 CCR1 */}
                <rect x="20" y="185" width="110" height="30" rx="4" fill="#e6f5ef" stroke="#7aab96" strokeWidth="1" />
                <text x="75" y="205" textAnchor="middle" fill="#5f937e" fontSize="11" fontStyle="italic">set TIM2 CCR1</text>

                {/* Message 3: STM32 → RP5 (ack) */}
                <line x1="100" y1="240" x2="350" y2="240" stroke="#5f937e" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
                <text x="225" y="230" textAnchor="middle" fill="#5f937e" fontSize="12" fontWeight="500">ack (ok=true)</text>

                {/* Message 4: RP5 → Web (ack) */}
                <line x1="350" y1="280" x2="600" y2="280" stroke="#5f937e" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
                <text x="475" y="270" textAnchor="middle" fill="#5f937e" fontSize="12" fontWeight="500">ws: ack</text>

                {/* Note: confirmed */}
                <rect x="530" y="295" width="110" height="30" rx="4" fill="#e6f7f2" stroke="#7aab96" strokeWidth="1" />
                <text x="585" y="315" textAnchor="middle" fill="#5f937e" fontSize="11" fontStyle="italic">slider confirmed</text>

                {/* Message 5: Next telem */}
                <line x1="100" y1="350" x2="350" y2="350" stroke="#5f937e" strokeWidth="2" markerEnd="url(#arrowhead-green)" />
                <text x="225" y="340" textAnchor="middle" fill="#5f937e" fontSize="12" fontWeight="500">telem (led.duty=0.6)</text>
              </svg>
            </div>

            {/* ═══════════════════════════════════════════ */}
            {/* 10. Error Handling & Fault Recovery          */}
            {/* ═══════════════════════════════════════════ */}
            <h3 className="blog-heading july-section" id="err">10. Error Handling &amp; Fault Recovery</h3>

            <h4 className="july-subheading">Fault State Machine (STM32)</h4>
            <p className="blog-text">
              The STM32 firmware runs a simple fault state machine in <C>monitor.c</C>. Each
              fault source (PGOOD, water level, I²C bus, comms link) is checked every cycle.
              When a fault triggers, the STM32 takes an immediate safe action and sends an{' '}
              <C>event</C> message to RP5.
            </p>

            <table className="july-table">
              <thead>
                <tr><th>Fault</th><th>Detection</th><th>Immediate Action</th><th>Recovery</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>LED Open Circuit</strong></td>
                  <td>PGOOD (PB14) goes low</td>
                  <td>Disable boost via PA5 (BOOST_DISABLE high)</td>
                  <td>Auto-retry after 5 s; if PGOOD restored, resume. After 3 retries, stay disabled until manual <C>set_led</C> command.</td>
                </tr>
                <tr>
                  <td><strong>Water Low</strong></td>
                  <td>WTR_LEVEL (PB13) goes low</td>
                  <td>Disable pump &amp; solenoid immediately</td>
                  <td>Resume when sensor returns high. Send <C>WTR_OK</C> event.</td>
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
                  <td>If still failing, report <C>I2C_FAULT</C> event. Use last known sensor values. Retry every 5 s.</td>
                </tr>
                <tr>
                  <td><strong>Comms Link Loss</strong></td>
                  <td>No RX from RP5 for 15 s</td>
                  <td>Enter fallback: LED off, fan 50%, pump off, blink COM_STATUS_LED</td>
                  <td>Resume normal control when any valid message received from RP5.</td>
                </tr>
              </tbody>
            </table>

            <h4 className="july-subheading">RP5 Retry Policy</h4>
            <p className="blog-text">
              When the RP5 sends a command and does not receive an <C>ack</C> within
              2 seconds, it retries up to 3 times with exponential backoff (2 s, 4 s, 8 s).
              If all retries fail, the dashboard shows a "device unreachable" warning.
            </p>

            <p className="blog-text">
              <mark className="blog-highlight">
                <strong>Graceful degradation:</strong> The system is designed so that the STM32 can
                operate independently if the RP5 link is lost. The fallback mode keeps the plant safe
                (fan running, LED off, no watering) until communication is restored.
              </mark>
            </p>

          </div>
        </article>

        {/* ── Back to Projects link ── */}
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

export default July
