import React from 'react';
interface OrderStatusCardProps {
    title: string;
    value: string;
    onClick?: () => void;
  }
  
  const OrderStatusCard = ({ title, value,onClick  }: OrderStatusCardProps) => {
    return (//
    <div
    onClick={onClick}
    className="relative overflow-hidden rounded-xl bg-[#0a0a29] p-4 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-purple-500/20 group cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative z-10">
          <h3 className="text-sm text-gray-300 font-medium mb-2">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </div>
    );
  };
  
  export default OrderStatusCard;