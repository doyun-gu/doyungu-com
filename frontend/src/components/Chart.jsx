// Chart.jsx
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer
} from 'recharts';

function Chart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="x" label={{ value: 'Sample Index', position: 'insideBottomRight', offset: 0 }} />
        <YAxis label={{ value: 'Value', angle: -90, position: 'insideLeft' }} />
        <Tooltip />
        <Line type="monotone" dataKey="speed" stroke="#8884d8" dot={false} name="Speed (km/h)" />
        <Line type="monotone" dataKey="accel" stroke="#82ca9d" dot={false} name="Accel_X_g" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
