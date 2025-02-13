import axios from 'axios';
const api = axios.create({
  baseURL: 'http://10.0.55.16:5216/api' // Replace with your ASP.NET backend URL
  });
export const getToApproved = async () => {
    try {
      const response = await api.get('/Count/on-hold-orders?status=To%20Be%20Approved');
      return response.data;
    } catch (error) {
     
      throw new Error('An unknown error occurred');
    }
  };

  export const getApprovedOnHold = async () => {
    try {
      const response = await api.get('/Count/Approved-OnHold');
      return response.data;
    } catch (error) {
     
      throw new Error('An unknown error occurred');
    }
  };
  export const getBackOrder = async () => {
    try {
      const response = await api.get('/Count/BackOrder');
      return response.data;
    } catch (error) {
     
      throw new Error('An unknown error occurred');
    }
  };
  export const getPickStatus = async () => {
    try {
      const response = await api.get('/Count/Pick-Status');
      return response.data;
    } catch (error) {
     
      throw new Error('An unknown error occurred');
    }
  };
  export const getCombinedOrders = async () => {
    try {
      const response = await api.get('/Count/combined-order-stats');
      return response.data;
    } catch (error) {
     
      throw new Error('An unknown error occurred');
    }
  };

  export const getCanceledOrders = async () => {
    try {
      const response = await api.get('/Count/total-Canceled-orders');
      return response.data;
    } catch (error) {
     
      throw new Error('An unknown error occurred');
    }
  };

  export const getonHoldOrders = async () => {
    try {
      const response = await api.get('/Count/total-OnHold-orders');
      return response.data;
    } catch (error) {
     
      throw new Error('An unknown error occurred');
    }
  };
  export const getInvoicedOrders = async () => {
    try {
      const response = await api.get('/Count/total-invoiced-orders');
      return response.data;
    } catch (error) {
     
      throw new Error('An unknown error occurred');
    }
  };
  export const getToBeApprovedOrders = async () => {
    try {
      const response = await api.get('/Count/total-ToBeApproved-orders');
      return response.data;
    } catch (error) {
     
      throw new Error('An unknown error occurred');
    }
  };
  
  export const getApprovedOrders = async () => {
    try {
      const response = await api.get('/Count/total-approved-orders');
      return response.data;
    } catch (error) {
     
      throw new Error('An unknown error occurred');
    }
  };
  export const getFilterData  = async (filter) => {
    try {
      const response = await api.get(`/Count/GetDashboardDataByFilter?filter=${filter}`);
      return response.data;
    } catch (error) {
     
      throw new Error('An unknown error occurred');
    }
  };
  export const getFilterDataforPieCharts  = async (filter) => {
    try {
      const response = await api.get(`/Count/pick-order-counts?filter=${filter}`);
      return response.data;
    } catch (error) {
     
      throw new Error('An unknown error occurred');
    }
  };
  export const getOrdersByDistributionStatusAndDate = async (cardcodeFilter, distributionStatus, dateFilter = null) => {
    try {
      // Construct query parameters
      const params = new URLSearchParams();
      
      

      // Add distribution status if provided
      if (distributionStatus) {
        params.append('distributionStatus', distributionStatus);
      }
      // Add selectedFilter if it's not 'all'
      if (cardcodeFilter && cardcodeFilter !== 'all') {
        params.append('cardcodeFilter', cardcodeFilter);
      }

      // Handle date filter
      if (dateFilter) {
        // Convert date to ISO string or format as needed by your backend
        const formattedDate = dateFilter instanceof Date 
          ? dateFilter.toISOString().split('T')[0] // YYYY-MM-DD format
          : dateFilter;
        params.append('dateFilter', formattedDate);
      }
  
      // Make the API call
      const response = await api.get(`/Count/filter?${params.toString()}`);
      return response.data; // Return the fetched data
    } catch (error) {
      console.error('API Error:', error);
      throw new Error('An error occurred while fetching orders');
    }
  };
  