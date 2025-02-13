import React, { useEffect, useState } from 'react';
import { BarChart as BarChartIcon, LineChart as LineChartIcon, PieChart as PieChartIcon } from "lucide-react";
import OrderStatusCard from '../Components/OrderStatusCard.tsx';
import DashboardCard from '../Components/Dashboard.tsx';
import CustomBarCharts from '../Components/Bargraph';
import StatusPieChart from '../Components/PieChart';
import CustomLineChart from '../Components/linegraph'
import AnimatedSpinner from '../Components/loader';
import { useNavigate } from 'react-router-dom';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/UI/select.tsx";
import { 
    getCanceledOrders, 
    getToBeApprovedOrders, 
    getInvoicedOrders,
    getCombinedOrders,
    getPickStatus, 
    getApprovedOrders, 
    getonHoldOrders,
    getApprovedOnHold,
    getBackOrder,
    getToApproved,
    getFilterData,
    getFilterDataforPieCharts
} from '../API/API';

const filterOptions = [
    { value: "all", label: "All Statuses" },
    { value: "ok food", label: "OK Food" },
    { value: "shoprite", label: "Shoprite" },
    { value: "spar", label: "Spar" },
    { value: "pick n pay", label: "Pick n Pay" },
    { value: "boxer", label: "Boxer" }
];

function Dashboard() {
    // State management
    const [dashboardData, setDashboardData] = useState({
        approved: 0,
        invoicedOrders: 0,
        canceledOrders: 0,
        approvedOnHold: 0,
        approvedBackOrder: 0,
        onhold:0,
        pickStatus: [],
        ordersByDay: {},
        toBeApprovedOrders: 0,
        toBeApprovedOrdersC:0
    });
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [chartTypes, setChartTypes] = useState({
        pickStatus: 'pie',
        ordersDistribution: 'bar',
        ordersAtPricing: 'line'
    });
    const navigate = useNavigate();
    // Function to fetch filtered data
    const fetchFilteredData = async (filter) => {
        try {
            // If filter is "all", use regular API calls
            if (filter === "all") {
                return {
                    approved: await getApprovedOrders(),
                    onhold: await getonHoldOrders(),
                    invoicedOrders: await getInvoicedOrders(),
                    canceledOrders: await getCanceledOrders(),
                    approvedOnHold: await getApprovedOnHold(),
                    approvedBackOrder: await getBackOrder(),
                    pickStatus: await getPickStatus(),
                    ordersByDay: await getCombinedOrders(),
                    toBeApprovedOrders: await getToApproved(),
                    toBeApprovedOrdersC:await getToBeApprovedOrders()
                   
                };
            }
            else{
                // For filtered data, make a single API call that returns all metrics for the selected filter
            const response = await getFilterData(filter);
            
            
            return {
                approved: response.ApprovedOrders,
                onhold: response.OnHoldOrders,
                invoicedOrders: response.InvoicedToday,
                canceledOrders: response.CancelledOrders,
                approvedOnHold: response.ApprovedOnHold,
                approvedBackOrder: response.ApprovedBackOrder,
                toBeApprovedOrdersC: response.ToBeApproved,
                pickStatus: await getFilterDataforPieCharts(filter), // Keep these separate as they're different visualizations
                ordersByDay: await getCombinedOrders(filter),
                toBeApprovedOrders: await getToBeApprovedOrders()
            };}
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
            throw error;
        }
    };
    const handleCardClick = (status) => {
      navigate("/Orders", { state: { status } }); // Pass status as state
    };
    // Effect for initial load and periodic refresh
    useEffect(() => {
        const loadDashboardData = async () => {
            setLoading(true);
            try {
                const data = await fetchFilteredData(selectedFilter);
                console.log('Fetched Data:', data);
                setDashboardData(data);
            } catch (error) {
                console.error('Error loading dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        loadDashboardData();

        // Set up periodic refresh
        const refreshInterval = setInterval(loadDashboardData, 5 * 60 * 1000);
        return () => clearInterval(refreshInterval);
    }, [selectedFilter]); // Dependency on selectedFilter ensures reload when filter changes

    // Handle filter change
    const handleFilterChange = (value) => {
        setSelectedFilter(value);
    };

    const renderChart = (type, data, chartName) => {
        switch (type) {
            case 'bar':
                return <CustomBarCharts data={data} />;
            case 'line':
                return <CustomLineChart data={data} />;
            case 'pie':
                return <StatusPieChart data={data} />;
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-background via-[#1a2035] to-[#141b2d] p-8 flex items-center justify-center">
                <div className="text-center">
                    <AnimatedSpinner />
                    <p className="mt-4 text-white text-lg font-semibold animate-pulse">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-background via-[#1a2035] to-[#141b2d] p-8">
            <div className="max-w-7xl mx-auto space-y-8">
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                    <Select 
                        value={selectedFilter}
                        onValueChange={handleFilterChange}
                    >
                        <SelectTrigger className="w-[180px] bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20">
                            <SelectValue placeholder="Select filter">
                                {filterOptions.find(opt => opt.value === selectedFilter)?.label}
                            </SelectValue>
                        </SelectTrigger>
                        <SelectContent className="bg-[#1a2035] border-white/20 text-white">
                            {filterOptions.map((option) => (
                                <SelectItem 
                                    key={option.value}
                                    value={option.value}
                                    className="focus:bg-white/10 focus:text-white"
                                >
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <OrderStatusCard title="Approved" value={dashboardData.approved} onClick={() => handleCardClick('Approved')}/>
                    <OrderStatusCard title="To be Approved" value={dashboardData.toBeApprovedOrdersC} onClick={() => handleCardClick('To be Approved')} />
                    <OrderStatusCard title="Invoiced Orders" value={dashboardData.invoicedOrders} onClick={() => handleCardClick('Invoiced')}/>
                    <OrderStatusCard title="Cancelled Orders" value={dashboardData.canceledOrders} onClick={() => handleCardClick('Cancelled')}/>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <OrderStatusCard title="Approved On Hold" value={dashboardData.approvedOnHold} onClick={() => handleCardClick('Approved - On Hold')}/>
                    <OrderStatusCard title="Approved Back Order" value={dashboardData.approvedBackOrder} onClick={() => handleCardClick('Approved Back')}/>
                    <OrderStatusCard title="On Hold" value={dashboardData.onhold} onClick={() => handleCardClick('On hold')}/>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <DashboardCard 
                        title="Pick Status" 
                        subtitle="Daily Overview"
                        allowedTypes={['pie', 'bar']}
                        onTypeChange={(type) => setChartTypes(prev => ({...prev, pickStatus: type}))}
                    >
                        <div className="h-[300px]">
                            {renderChart(chartTypes.pickStatus, dashboardData.pickStatus, 'pickStatus')}
                        </div>
                    </DashboardCard>

                    <DashboardCard 
                        title="Expected Orders vs Distributed Orders" 
                        subtitle="Performance"
                        allowedTypes={['bar', 'line']}
                        onTypeChange={(type) => setChartTypes(prev => ({...prev, ordersDistribution: type}))}
                    >
                        <div className="h-[300px]">
                            {renderChart(chartTypes.ordersDistribution, dashboardData.ordersByDay, 'ordersDistribution')}
                        </div>
                    </DashboardCard>

                    <DashboardCard 
                        title="Orders At Pricing" 
                        subtitle="On Hold Orders"
                        allowedTypes={['line', 'bar']}
                        onTypeChange={(type) => setChartTypes(prev => ({...prev, ordersAtPricing: type}))}
                    >
                        <div className="h-[300px]">
                            {renderChart(chartTypes.ordersAtPricing, dashboardData.toBeApprovedOrders, 'ordersAtPricing')}
                        </div>
                    </DashboardCard>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
