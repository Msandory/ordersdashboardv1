import { LineChart, Line, Legend,XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';



const CustomLineChart = ({ data }) => {
    return (
      <div className="h-[200px] w-full p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
           
            <XAxis 
              dataKey="timeSlot" 
              tick={{ fontSize: 12 }}
              interval={0}
            />
            <YAxis />
            <Tooltip 
              formatter={(value, name) => {
                return [value, name === 'totalCount' ? 'totalCount' : 'Delayed Orders'];
              }}
            />
            <Legend 
              payload={[
                { value: 'totalCount', type: 'line', color: '#2563eb' },
                { value: 'Delayed Orders', type: 'line', color: '#dc2626' }
              ]}
            />
            <Line 
              type="monotone" 
              dataKey="totalCount" 
              name="totalCount"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ fill: '#2563eb', strokeWidth: 2 }}
            />
            <Line 
              type="monotone" 
              dataKey="delayedCount" 
              name="Delayed Orders"
              stroke="#dc2626"
              strokeWidth={2}
              dot={{ fill: '#dc2626', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

export default CustomLineChart;
