
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const formatDate = (date) => {
  if (!date) return '';
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatNumber = (num) => {
  if (typeof num !== 'number') return '0';
  return new Intl.NumberFormat('en-US').format(num);
};

export const getStatusColor = (status) => {
  const colors = {
    'Approved': 'bg-emerald-600',
    'To be Approved': 'bg-sky-300',
    'Invoiced': 'bg-lime-300',
    'Cancelled': 'bg-rose-600',
    'Approved - On Hold': 'bg-amber-400',
    'On Hold': 'bg-sky-500',
    'default': 'bg-gray-500'
  };
  return colors[status] || colors.default;
};
