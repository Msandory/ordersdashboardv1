import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CustomBarCharts({ data }) {
    // Define the correct order of the days
    const dayOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    // Transform and combine the data
    const chartData = dayOrder.map((day) => ({
        day,
        orders: data?.ordersByDay?.[day] || 0,
        invoiced: data?.invoiced?.[day] || 0
    })).filter((item) => item.orders > 0 || item.invoiced > 0); // Only show days with data

    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart 
                data={chartData} 
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              
                <XAxis 
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#ffffff', fontSize: 12 }}
                />
                <YAxis />
                <Tooltip  
                    contentStyle={{ 
                    background: 'rgba(26, 31, 44, 0.9)',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    color: '#ffffff'
                }} />
                <Legend />
                <Bar 
                    dataKey="orders" 
                    fill="#82ca9d"
                    radius={[4, 4, 0, 0]}
                    animationDuration={1500}
                    name="Total Orders"
                />
                <Bar 
                dataKey="invoiced" 
                fill="#7E69AB"
                radius={[4, 4, 0, 0]}
                animationDuration={1500} 
                name="Invoiced" />
            </BarChart>
        </ResponsiveContainer>
    );
}

export default CustomBarCharts;