import React from 'react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

function StatusPieChart({ data }) {
    // Transform the data into the format required by Recharts
    const chartData = Object.entries(data).map(([name, value]) => ({
        name,
        value
    }));

    // Custom colors for different statuses
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

    return (
        <ResponsiveContainer width="100%" height="100%">
            <PieChart>
                <Pie
                    data={chartData}
                    label={({name, value}) => `${name}: ${value}`}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    animationDuration={1500}
                >
                    {chartData.map((entry, index) => (
                        <Cell 
                            key={`cell-${index}`} 
                            fill={COLORS[index % COLORS.length]}
                        />
                    ))}
                </Pie>
                <Tooltip
                contentStyle={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '8px',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                }}
                />
                <Legend
                    wrapperStyle={{
                        fontSize: '14px',
                        paddingTop: '10px',
                    }}
                    align="center"
                    verticalAlign="bottom"
                />
            </PieChart>
        </ResponsiveContainer>
    );
}

export default StatusPieChart;