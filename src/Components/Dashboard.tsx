import React, { ReactNode } from "react";


interface DashboardCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

const DashboardCard = ({ title, subtitle, children }: DashboardCardProps) => {
  return (
    <div className="glass-card hover-scale rounded-2xl p-6 animate-fade-up">
      <div className="mb-4">
        {subtitle && (
          <span className="inline-block px-2 py-1 text-xs font-medium bg-accent text-accent-foreground rounded-full mb-2">
            {subtitle}
          </span>
        )}
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      {children}
    </div>
  );
};

export default DashboardCard;