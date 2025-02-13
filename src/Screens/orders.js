import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../Components/UI/Table.jsx";
import { Input } from "../Components/UI/Input.jsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../Components/UI/select.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../Components/UI/Dropdown.jsx";
import { Badge } from "../Components/UI/Badge.jsx";
import { Calendar as CalendarComponent } from "../Components/UI/calender.jsx";
import { Button } from "../Components/UI/Button.jsx";
import { Search, SlidersHorizontal, Calendar } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../Components/UI/Popover.jsx";
import { getOrdersByDistributionStatusAndDate } from "../API/API"; // Adjust import path as needed
import { useNavigate,useLocation } from 'react-router-dom';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../Components/UI/pagination.jsx";
// Status color mapping
const statusColors = {
  "To be Approved": "bg-sky-300", // Lighter blue for a less urgent feel
  Approved: "bg-emerald-600", // Brighter green for success
  Canceled: "bg-rose-600", // More vibrant red for a stronger negative impact
  "Invoiced": "bg-lime-300", // Same as Approved for positive outcome
  "Approved on Hold": "bg-amber-400", // Warmer yellow for caution
  "On Hold": "bg-sky-500",}
  
const OrdersIndex = () => {
  // State management
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [distributionStatusFilter, setDistributionStatusFilter] = useState(null);
  const [dateFilter, setDateFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const ITEMS_PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedData = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  const location = useLocation();
  const { status, selectedFilter: passedFilter  } = location.state || {}; // Retrieve the status
  const [selectedFilter, setSelectedFilter] = useState(passedFilter  || "all");
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
  }
  };

    // Fetch orders on component mount and when filters change
    useEffect(() => {
      const fetchOrders = async () => {
        setIsLoading(true);
        setError(null);
        try {
          console.log('Fetching orders with parameters:', {
            selectedFilter,
            distributionStatusFilter: distributionStatusFilter || status,
            dateFilter
          });
          //TEST
    
          const data = await getOrdersByDistributionStatusAndDate(
            selectedFilter, 
            distributionStatusFilter || status, 
            dateFilter
          );
    
          console.log('Received data:', data);
    
          // Check the structure of the data
          if (Array.isArray(data)) {
            setOrders(data);
            setFilteredOrders(data);
          } else if (data.data && Array.isArray(data.data)) {
            // Sometimes APIs wrap the array in a 'data' property
            setOrders(data.data);
            setFilteredOrders(data.data);
          } else {
            console.warn('Unexpected data format:', data);
            setOrders([]);
            setFilteredOrders([]);
          }
        } catch (err) {
          console.error('Full error details:', err);
          setError("Failed to load orders: " + err.message);
        } finally {
          setIsLoading(false);
        }
      };
    
      fetchOrders();
    }, [selectedFilter, distributionStatusFilter, dateFilter, status]);

 // Filtering logic

useEffect(() => {
  const filterOrders = () => {
    const filtered = orders.filter((order) => {
      const matchesSearch =
        (order.cardCode || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.cardName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (order.docNum || '').toLowerCase().includes(searchTerm.toLowerCase());

       // Map selectedFilter to the corresponding filter pattern
       const mappedFilter = filterMap[selectedFilter];

       const matchesFilter = !mappedFilter // If "all", skip filtering
         || mappedFilter.test(order.cardcode); // Use RegExp to match the Cardcode


      const matchesStatus = distributionStatusFilter 
        ? order.u_DistributionStatus?.toLowerCase() === distributionStatusFilter?.toLowerCase()
        : true;

      const matchesDate = dateFilter
        ? new Date(order.u_RequiredDeliveryDate).toDateString() === dateFilter.toDateString()
        : true;

      return matchesSearch && matchesFilter && matchesStatus && matchesDate;
    });
    setFilteredOrders(filtered);
  };

  filterOrders();
}, [searchTerm, selectedFilter, distributionStatusFilter, dateFilter, orders]);
   // Format date utility
   const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString();
    } catch {
      return dateString;
    }
  };
  const navigate = useNavigate();
  const handlePageClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const handleCardClick = (status) => {
    navigate("/"); // Pass both status and selectedFilter
  };
  

  // Mapping between the user-friendly filter names and the values used by the API
  const filterMap = {
    "ok food": /okf/i, // Matches "okf" (case-insensitive)
    "shoprite": /sho/i, // Matches "sho"
    "spar": /spa|mmm/i, // Matches "spa" or "mmm"
    "pick n pay": /pic/i, // Matches "pick"
    "boxer": /box/i, // Matches "box"
    "allx": null // No specific filter for "all"
  };
  const filterOptions = [
    { value: "all", label: "All Statuses" },
    { value: "ok food", label: "OK Food" },
    { value: "shoprite", label: "Shoprite" },
    { value: "spar", label: "Spar" },
    { value: "pick n pay", label: "Pick n Pay" },
    { value: "boxer", label: "Boxer" }
];
 // Handle filter change
 const handleFilterChange = (value) => {
  setSelectedFilter(value);
};
 // Clear all filters
 const clearAllFilters = () => {
  setSelectedFilter("all");
  setDistributionStatusFilter(null);
  setDateFilter(null);
  setSearchTerm("");
};
  return (
    <div className="container mx-auto py-10 animate-fade-in">
      <h1 className="text-3xl font-bold mb-8 hover:cursor-pointer" onClick={() => handleCardClick()}>Order Management</h1>
      {/* Search and Filter Section */}
      <div className="flex flex-wrap gap-4 items-center mb-6">
        {/* Search Input */}
        <div className="relative flex-1 min-w-[250px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search Orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
 {/* Filter Dropdown */}
 
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
                
        {/* Distribution Status Filter */}
        <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button 
      variant="outline" 
      className="min-w-[140px] bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
    >
      <SlidersHorizontal className="h-4 w-4 mr-2" />
      Distribution Status
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent className="bg-[#1a2035] border-white/20">
    <DropdownMenuItem 
      onClick={() => setDistributionStatusFilter(null)}
      className="focus:bg-white/10 focus:text-white"
    >
      All
    </DropdownMenuItem>
    <DropdownMenuItem 
      onClick={() => setDistributionStatusFilter("Approved")}
      className="focus:bg-white/10 focus:text-white"
    >
      Approved
    </DropdownMenuItem>
    <DropdownMenuItem 
      onClick={() => setDistributionStatusFilter("To be Approved")}
      className="focus:bg-white/10 focus:text-white"
    >
      To be Approved
    </DropdownMenuItem>
    <DropdownMenuItem 
      onClick={() => setDistributionStatusFilter("Invoiced")}
      className="focus:bg-white/10 focus:text-white"
    >
      Invoiced Orders
    </DropdownMenuItem>
    <DropdownMenuItem 
      onClick={() => setDistributionStatusFilter("Cancelled")}
      className="focus:bg-white/10 focus:text-white"
    >
      Canceled Orders
    </DropdownMenuItem>
    <DropdownMenuItem 
      onClick={() => setDistributionStatusFilter("Approved - On Hold")}
      className="focus:bg-white/10 focus:text-white"
    >
      Approved On Hold Orders
    </DropdownMenuItem>
    <DropdownMenuItem 
      onClick={() => setDistributionStatusFilter("Approved Back order")}
      className="focus:bg-white/10 focus:text-white"
    >
      Approved Back Order Orders
    </DropdownMenuItem>
    <DropdownMenuItem 
      onClick={() => setDistributionStatusFilter("On Hold")}
      className="focus:bg-white/10 focus:text-white"
    >
      On Hold Orders
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

        {/* Date Filter */}
        <Popover>
  <PopoverTrigger asChild>
    <Button variant="outline" className="min-w-[140px]">
      <Calendar className="h-4 w-4 mr-2" />
      {dateFilter ? formatDate(dateFilter.toISOString()) : "Filter Date"}
    </Button>
  </PopoverTrigger>
  <PopoverContent 
    className="w-auto p-0 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20 rounded-lg shadow-md"
    align="start"
    sideOffset={4}
  >
    <div className="p-2">
      <div className="flex justify-center"> {/* Ensure Calendar is centered */}
        <CalendarComponent
          mode="single"
          selected={dateFilter}
          onSelect={setDateFilter}
          initialFocus
          className="calendar" // Apply custom class for extra styling if needed
        />
      </div>
    </div>
  </PopoverContent>
</Popover>



        {/* Clear Filters */}
        {(distributionStatusFilter || dateFilter) && (
          <Button
            variant="ghost"
            onClick={clearAllFilters}
            className="text-sm"
          >
            Clear Filters
          </Button>
        )}
      </div>

      {/* Orders Table */}
      <div className="border rounded-lg overflow-hidden">
        {isLoading ? (
          <div className="text-center py-8">Loading orders...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">{error}</div>
        ) : paginatedData.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No orders found matching the current filters.
          </div>
        ) : (
          <Table>
            <TableHeader>
            <TableRow >
                <TableHead className="font-semibold">Docentry</TableHead>
                <TableHead className="font-semibold">Docnum</TableHead>
                <TableHead className="font-semibold">Canceled</TableHead>
                <TableHead className="font-semibold">Cardcode</TableHead>
                <TableHead className="font-semibold">Cardname</TableHead>
                <TableHead className="font-semibold">Distribution Status</TableHead>
                <TableHead className="font-semibold">Distribution Progress</TableHead>
                <TableHead className="font-semibold">Required Delivery Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((order) => (
                <TableRow
                  key={order.docEntry}
                  className="hover:bg-muted/50 transition-colors"
                >
                  <TableCell>{order.docentry}</TableCell>
                  <TableCell>{order.docnum}</TableCell>
                  <TableCell>{order.canceled}</TableCell>
                  <TableCell>{order.cardcode}</TableCell>
                  <TableCell>{order.cardname}</TableCell>
                  <TableCell>
                    <Badge 
                      className={`${
                        statusColors[order.u_DistributionStatus] || 'bg-gray-500'
                      } text-black`}
                    >
                      {order.u_DistributionStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{order.u_DistributionProgress}</TableCell>
                  <TableCell>{formatDate(order.u_RequiredDeliveryDate)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-4">
   <div className="flex justify-center">
  <Pagination
    totalPages={totalPages}
    currentPage={currentPage}
    onPageChange={(page) => {
      if (page >= 1 && page <= totalPages) {
        setCurrentPage(page);
      }
    }}
  />
</div>
        </div>
      )}
    </div>
  );
};

export default OrdersIndex;