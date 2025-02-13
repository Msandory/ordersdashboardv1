
import React, { ReactNode, useState } from "react";
import { BarChart, LineChart, PieChart } from "lucide-react";

interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  allowedTypes?: ("bar" | "line" | "pie")[];
  onTypeChange?: (type: string) => void;
}

const DashboardCard = ({ 
  title, 
  subtitle, 
  children, 
  allowedTypes = ["bar", "line", "pie"],
  onTypeChange 
}: DashboardCardProps) => {
  const [activeType, setActiveType] = useState(allowedTypes[0]);

  const handleTypeChange = (type: string) => {
    setActiveType(type);
    onTypeChange?.(type);
  };

  return (
    <div className="glass-card hover-scale rounded-2xl p-6 animate-fade-up">
      <div className="flex justify-between items-center mb-4">
        <div>
          {subtitle && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full mb-2">
              {subtitle}
            </span>
          )}
          <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        </div>
        {onTypeChange && (
          <div className="flex gap-2 bg-white/5 p-1 rounded-lg">
            {allowedTypes.includes("bar") && (
              <button
                onClick={() => handleTypeChange("bar")}
                className={`p-1.5 rounded-md transition-all ${
                  activeType === "bar" ? "bg-white/20 text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                <BarChart className="w-4 h-4" />
              </button>
            )}
            {allowedTypes.includes("line") && (
              <button
                onClick={() => handleTypeChange("line")}
                className={`p-1.5 rounded-md transition-all ${
                  activeType === "line" ? "bg-white/20 text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                <LineChart className="w-4 h-4" />
              </button>
            )}
            {allowedTypes.includes("pie") && (
              <button
                onClick={() => handleTypeChange("pie")}
                className={`p-1.5 rounded-md transition-all ${
                  activeType === "pie" ? "bg-white/20 text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                <PieChart className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};

export default DashboardCard;
