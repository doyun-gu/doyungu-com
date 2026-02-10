// chart.jsx
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts';

/**
 * Chart component to display speed and acceleration data.
 * @param {Object} props - Component props.
 * @param {Array<Object>} props.data - The data array for the chart.
 * @param {Function} props.onHover - Callback function to pass hovered point data to parent.
 */
function Chart({ data, onHover }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        onMouseMove={(state) => {
          if (
            state.isTooltipActive &&
            state.activePayload &&
            state.activePayload.length > 0 &&
            state.activePayload[0].payload
          ) {
            const activePoint = state.activePayload[0].payload;
            onHover(activePoint);
          } else {
            onHover({ speed: '-', accel: '-', x: '-' });
          }
        }}
        onMouseLeave={() => onHover({ speed: '-', accel: '-', x: '-' })}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" label={{ value: "Time (s)", position: "insideBottom", offset: 0 }} />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" label={{ value: "Speed (km/h)", angle: -90, position: "insideLeft" }} />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" label={{ value: "Accel (g)", angle: 90, position: "insideRight" }} />

        <Line yAxisId="left" type="monotone" dataKey="speed" stroke="#8884d8" strokeWidth={2} dot={false} name="Speed (km/h)" />
        <Line yAxisId="right" type="monotone" dataKey="accel" stroke="#82ca9d" strokeWidth={2} dot={false} name="Accel_X_g" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;