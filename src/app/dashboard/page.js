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
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { LineChart, BarChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid";
import { darken, lighten, styled } from "@mui/material/styles";
import { useRouter } from "next/navigation";

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
    { id: 1, date: "2025-11-06", type: "Mint", amount: "+0.5 ETH", status: "Completed" },
    { id: 2, date: "2025-11-05", type: "Sale", amount: "+0.2 ETH", status: "Completed" },
    { id: 3, date: "2025-11-04", type: "Gas Fee", amount: "-0.01 ETH", status: "Completed" },
    { id: 4, date: "2025-11-03", type: "Mint", amount: "+0.4 ETH", status: "Pending" },
    { id: 5, date: "2025-11-02", type: "Purchase", amount: "-0.3 ETH", status: "Completed" },
];

const transactionColumns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "amount", headerName: "Amount", width: 130 },
    { field: "status", headerName: "Status", width: 130 },
];

export default function DashboardPage() {
    const router = useRouter();

    const handleMintClick = () => {
        router.push('/sell');
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
                    <Tooltip title="Mint New NFT">
                        <IconButton
                            onClick={handleMintClick}
                            sx={{
                                backgroundColor: "darkgray",
                                color: "white",
                                "&:hover": { backgroundColor: "black" },
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </AppBar>

            <Container maxWidth="xl">
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
            </Container>
        </Box>
    );
}