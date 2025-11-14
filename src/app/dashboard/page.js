"use client";

import {
    Box,
    Grid,
    Paper,
    Typography,
    AppBar,
    Toolbar,
    Button,
    IconButton,
    Container,
    Tooltip,
    Stack,
    Tabs,
    Tab,
} from "@mui/material";
import { LineChart, BarChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";
import { darken, lighten, styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { useState } from "react";

// --- Reuse your StyledDataGrid setup ---
const getBackgroundColor = (color, theme, coefficient) => ({
    backgroundColor: darken(color, coefficient),
    ...theme.applyStyles("light", {
        backgroundColor: lighten(color, coefficient),
    }),
});

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "#6A6A6A",
        color: "#FFFFFF",
        "& .MuiDataGrid-columnHeaderTitle": {
            color: "#FFFFFF",
            fontWeight: "bold",
        },
    },
    "& .MuiDataGrid-footerContainer": {
        "& .MuiTablePagination-root, .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows, .MuiSelect-icon, .MuiIconButton-root": {
            color: "#FFFFFF",
        },
    },
    "& .eth-positive": {
        ...getBackgroundColor(theme.palette.success.main, theme, 0.7),
    },
    "& .eth-negative": {
        ...getBackgroundColor(theme.palette.error.main, theme, 0.7),
    },
}));

// --- Mock data ---
const transactionRows = [
    { id: 1, date: "2025-11-06", type: "Mint", amount: "+15.5 ETH", status: "Completed" },
    { id: 2, date: "2025-11-05", type: "Sale", amount: "+6.2 ETH", status: "Completed" },
    { id: 3, date: "2025-11-04", type: "Gas Fee", amount: "-0.08 ETH", status: "Completed" },
    { id: 4, date: "2025-11-03", type: "Mint", amount: "+12.4 ETH", status: "Pending" },
    { id: 5, date: "2025-11-02", type: "Purchase", amount: "-8.3 ETH", status: "Completed" },
    { id: 6, date: "2025-11-01", type: "Sale", amount: "+22.8 ETH", status: "Completed" },
    { id: 7, date: "2025-10-31", type: "Mint", amount: "+18.6 ETH", status: "Completed" },
    { id: 8, date: "2025-10-30", type: "Gas Fee", amount: "-0.12 ETH", status: "Completed" },
    { id: 9, date: "2025-10-29", type: "Sale", amount: "+35.2 ETH", status: "Completed" },
    { id: 10, date: "2025-10-28", type: "Mint", amount: "+22.7 ETH", status: "Completed" },
    { id: 11, date: "2025-10-27", type: "Purchase", amount: "-15.5 ETH", status: "Completed" },
    { id: 12, date: "2025-10-26", type: "Gas Fee", amount: "-0.15 ETH", status: "Completed" },
    { id: 13, date: "2025-10-25", type: "Sale", amount: "+8.3 ETH", status: "Completed" },
    { id: 14, date: "2025-10-24", type: "Mint", amount: "+28.9 ETH", status: "Completed" },
    { id: 15, date: "2025-10-23", type: "Gas Fee", amount: "-0.09 ETH", status: "Completed" },
];

const transactionColumns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "amount", headerName: "Amount", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
];

const mintedNFTsRows = [
    { id: 1, name: "Cosmic Dragon #001", dateCreated: "2025-11-06", price: "15.5 ETH", status: "Pending Mint", buyer: "-", transactionId: 1 },
    { id: 2, name: "Digital Portrait", dateCreated: "2025-11-03", price: "12.4 ETH", status: "Pending Mint", buyer: "-", transactionId: 4 },
    { id: 3, name: "Abstract Geometry", dateCreated: "2025-10-31", price: "18.6 ETH", status: "Sold", buyer: "0x123...abc", transactionId: 7 },
    { id: 4, name: "Virtual Landscape", dateCreated: "2025-10-28", price: "22.7 ETH", status: "Sold", buyer: "0x456...def", transactionId: 10 },
    { id: 5, name: "Pixel Art Character", dateCreated: "2025-10-24", price: "28.9 ETH", status: "Listed", buyer: "-", transactionId: 14 },
    { id: 6, name: "Neon Dreams", dateCreated: "2025-10-20", price: "35.2 ETH", status: "Sold", buyer: "0x789...ghi", transactionId: 9 },
    { id: 7, name: "Cyberpunk City", dateCreated: "2025-10-18", price: "8.3 ETH", status: "Sold", buyer: "0xabc...123", transactionId: 13 },
    { id: 8, name: "Ocean Waves", dateCreated: "2025-10-15", price: "42.8 ETH", status: "Listed", buyer: "-", transactionId: null },
    { id: 9, name: "Space Explorer", dateCreated: "2025-10-12", price: "6.2 ETH", status: "Sold", buyer: "0xdef...456", transactionId: 2 },
];

const mintedNFTsColumns = [
    { field: "name", headerName: "NFT Name", width: 200 },
    { field: "dateCreated", headerName: "Created", width: 130 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "status", headerName: "Status", width: 100 },
    { field: "buyer", headerName: "Buyer", width: 150 },
];

export default function DashboardPage() {
    const router = useRouter();
    const [tabValue, setTabValue] = useState(0);

    const handleMintClick = () => {
        router.push('/sell');
    };

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ minHeight: "100vh" }}>
            {/* --- Header --- */}
            <AppBar
                position="static"
                color="transparent"
                sx={{
                    border: "1px solid rgba(255,255,255,0.1)",
                }}
            >
                <Toolbar sx={{ justifyContent: "space-between" }}>
                    <Typography variant="h6">
                        Your Dashboard
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl">
                {/* Tabs */}
                <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
                    <Tabs 
                        value={tabValue} 
                        onChange={handleTabChange} 
                        aria-label="dashboard tabs"
                        sx={{
                            '& .MuiTabs-indicator': {
                                backgroundColor: 'black',
                            },
                            '& .MuiTab-root': {
                                color: 'gray',
                                fontWeight: 600,
                                '&.Mui-selected': {
                                    color: 'black',
                                },
                            },
                        }}
                    >
                        <Tab label="Monthly Statistics" />
                        <Tab label="My Minted NFTs" />
                    </Tabs>
                </Box>

                {/* Tab Content */}
                {tabValue === 0 && (
                    <Stack
                        direction="row"
                        spacing={{ xs:1, sm:2, md:3 }}
                        sx={{
                            justifyContent: "space-evenly",
                            alignItems: "center",
                            flexWrap: "wrap",
                            rowGap: { xs: 1, sm: 2, md: 3 }
                        }}
                    >
                    {/* Stats Papers */}
                    {[
                        { 
                            title: "Total Minted", 
                            value: "4,892", 
                            color: "#4caf50", 
                            trendData: [120, 150, 180, 220, 280, 350, 420, 380, 450, 520, 580, 650, 720, 680, 750, 820, 890, 920, 850, 780, 890, 950, 1020, 1080, 1150, 1220, 1280, 1350, 1420, 1480],
                            trend: "+12.5%"
                        },
                        { 
                            title: "Total Sales", 
                            value: "1,203", 
                            color: "#4caf50", 
                            trendData: [45, 52, 48, 65, 70, 58, 75, 82, 78, 90, 95, 88, 102, 108, 95, 118, 125, 132, 128, 145, 152, 148, 165, 172, 168, 185, 192, 188, 205, 212],
                            trend: "+8.3%"
                        },
                        { 
                            title: "Revenue (ETH)", 
                            value: "532.4", 
                            color: "#4caf50", 
                            trendData: [15, 18, 22, 19, 25, 28, 32, 29, 35, 38, 42, 39, 45, 48, 52, 49, 55, 58, 62, 59, 65, 68, 72, 69, 75, 78, 82, 79, 85, 88],
                            trend: "+15.7%"
                        },
                    ].map((item, idx) => (
                        <Paper
                            key={idx}
                            variant="elevation"
                            square={false}
                            sx = {{backgroundColor: "rgba(255,255,255,0.12)", p:4, width: 420, height: 300}}
                        >
                            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                {item.title}
                            </Typography>
                            <Typography
                                variant="h4"
                                sx={{ color: item.color, fontWeight: 600 }}
                            >
                                {item.value}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Last 30 days
                            </Typography>
                            
                            {/* Trend indicator */}
                            <Typography 
                                variant="body2" 
                                sx={{ color: item.color, fontWeight: "bold", mt: 1 }}
                            >
                                {item.trend}
                            </Typography>

                            {/* Mini trend chart */}
                            <LineChart
                                width={250}
                                height={150}
                                series={[
                                    {
                                        data: item.trendData,
                                        color: item.color,
                                        curve: "linear",
                                        showMark: false,
                                    },
                                ]}
                                xAxis={[{ 
                                    scaleType: "point", 
                                    data: Array.from({length: 30}, (_, i) => i + 1),
                                    hideTooltip: true,
                                }]}
                                yAxis={[{ hideTooltip: true }]}
                                grid={{ horizontal: false, vertical: false }}
                                margin={{ left: 0, right: 0, top: 5, bottom: 10 }}
                                disableAxisListener
                                slots={{
                                    tooltip: () => null,
                                }}
                                sx={{
                                    '& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel': {
                                        display: 'none',
                                    },
                                    '& .MuiChartsAxis-left .MuiChartsAxis-tickLabel': {
                                        display: 'none',
                                    },
                                }}
                            />
                        </Paper>
                    ))}

                    {/* Chart 1 - Minting Activity */}
                    <Paper
                        sx={{
                            p: 3,
                            square: false,
                            backgroundColor: "rgba(255,255,255,0.12)",
                        }}
                        variant="elevation"
                        square={false}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Minting Activity (Last 30 Days)
                        </Typography>
                        <LineChart
                            height={400}
                            width={600}
                            series={[
                                {
                                    data: [4, 8, 15, 18, 21],
                                    color: "orange",
                                    label: "Mints",
                                },
                            ]}
                            xAxis={[{ scaleType: "point", data: ["Day 1", "Day 5", "Day 15", "Day 20", "Day 30"] }]}
                            slots={{
                                tooltip: () => null,
                            }}
                        />
                    </Paper>

                    {/* Chart 2 - Monthly Sales Volume */}
                    <Paper
                        sx={{
                            p: 3,
                            square: false,
                            backgroundColor: "rgba(255,255,255,0.12)",
                            backdropFilter: "blur(8px)",
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                            Monthly Sales Volume
                        </Typography>
                        <BarChart
                            height={400}
                            width={600}
                            xAxis={[{ data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"] }]}
                            series={[
                                {
                                    data: [500, 750, 800, 1200, 1500, 1300, 1000],
                                    color: "#1c74bcff",
                                },
                            ]}
                            slots={{
                                tooltip: () => null,
                            }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            For the last 6 months
                        </Typography>
                    </Paper>

                    {/* Transactions Table */}
                    <Paper
                        sx={{
                            p: 3,
                            square: false,
                            backgroundColor: "rgba(255,255,255,0.12)",
                            maxWidth: 580,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                            Recent Transactions
                        </Typography>
                        <Box sx={{ height: 400, width: "100%" }}>
                            <StyledDataGrid
                                rows={transactionRows}
                                columns={transactionColumns}
                                pageSize={5}
                                getRowClassName={(params) => {
                                    if (params.row.amount.includes("+")) {
                                        return "eth-positive";
                                    } else if (params.row.amount.includes("-")) {
                                        return "eth-negative";
                                    }
                                    return "";
                                }}
                            />
                        </Box>
                    </Paper>
                    </Stack>
                )}

                {/* Tab 2 - My Minted NFTs */}
                {tabValue === 1 && (
                    <Stack spacing={3}>
                        {/* NFT Statistics Summary */}
                        <Stack 
                            direction="row" 
                            spacing={3} 
                            sx={{ 
                                justifyContent: "center",
                                flexWrap: "wrap",
                                gap: 3 
                            }}
                        >
                            <Paper sx={{ p: 3, backgroundColor: "rgba(255,255,255,0.12)", minWidth: 200 }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    Total Minted
                                </Typography>
                                <Typography variant="h4" sx={{ color: "#4caf50", fontWeight: 600 }}>
                                    4,893
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    NFTs Created
                                </Typography>
                            </Paper>
                            
                            <Paper sx={{ p: 3, backgroundColor: "rgba(255,255,255,0.12)", minWidth: 200 }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    Total Sold
                                </Typography>
                                <Typography variant="h4" sx={{ color: "#4caf50", fontWeight: 600 }}>
                                    1,204
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    25% Success Rate
                                </Typography>
                            </Paper>
                            
                            <Paper sx={{ p: 3, backgroundColor: "rgba(255,255,255,0.12)", minWidth: 200 }}>
                                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                                    Total Revenue
                                </Typography>
                                <Typography variant="h4" sx={{ color: "#4caf50", fontWeight: 600 }}>
                                    533.4 ETH
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    From Sales
                                </Typography>
                            </Paper>
                        </Stack>

                        {/* NFT Table */}
                        <Paper sx={{ p: 3, backgroundColor: "rgba(255,255,255,0.12)" }}>
                            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
                                My NFT Collection
                            </Typography>
                            <Box sx={{ height: 400, width: "100%" }}>
                                <StyledDataGrid
                                    rows={mintedNFTsRows}
                                    columns={mintedNFTsColumns}
                                    pageSize={5}
                                    getRowClassName={(params) => {
                                        if (params.row.status === "Sold") {
                                            return "eth-positive";
                                        }
                                        return "";
                                    }}
                                />
                            </Box>
                        </Paper>
                    </Stack>
                )}
            </Container>
        </Box>
    );
}