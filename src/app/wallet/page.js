"use client";

import { Box, Typography, Grid, IconButton } from "@mui/material";
import MetaMaskIcon from "@mui/icons-material/Extension";
import CoinbaseIcon from "@mui/icons-material/CurrencyBitcoin";
import WalletConnectIcon from "@mui/icons-material/SyncAlt";
import DemoPaper from '@mui/material/Paper';
import { DataGrid } from '@mui/x-data-grid';
import "../globals.css";

export default function WalletPage() {
    const AccountBalance = 1.2345; // mock data

    const handlePlatformClick = (platform) => {
        alert(`Redirecting to ${platform}...`);
    };
//mock transaction data
    const columns = [
        { field: 'date', headerName: 'Date', width: 150 },
        { field: 'type', headerName: 'Type', width: 130 },
        { field: 'amount', headerName: 'Amount', width: 130 },
        { field: 'status', headerName: 'Status', width: 130 },
    ];

    const rows = [
        { id: 1, date: '2025-11-06', type: 'Deposit', amount: '+0.5 ETH', status: 'Completed' },
        { id: 2, date: '2025-11-05', type: 'Purchase', amount: '-0.2 ETH', status: 'Completed' },
        { id: 3, date: '2025-11-03', type: 'Withdrawal', amount: '-0.1 ETH', status: 'Pending' },
      ];

    return (
        <Box sx={{ 
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            minHeight: '80vh',
            pt: 8
        }}>
            <DemoPaper 
                variant="outlined" 
                sx={{ 
                    p: 4, 
                    mb: 4, 
                    textAlign: 'center',
                    minWidth: '150px'
                }}
            >
                <Typography variant="h6">
                    Your Ethereum Balance
                </Typography>
                <Typography variant="h3">
                    {AccountBalance} ETH
                </Typography>
            </DemoPaper>
            
            <Typography variant="h6" sx={{textAlign: 'center' }}>
                Transfer from wallets
            </Typography>
            
            <Grid container spacing={3} justifyContent="center" sx={{ maxWidth: '400px' }}>
                <Grid item>
                    <IconButton
                        sx={{ color: "#f6851b" }}
                        onClick={() => handlePlatformClick("MetaMask")}
                    >
                        <MetaMaskIcon fontSize="large" />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton
                        sx={{ color: "#0052ff" }}
                        onClick={() => handlePlatformClick("Coinbase Wallet")}
                    >
                        <CoinbaseIcon fontSize="large" />
                    </IconButton>
                </Grid>
                <Grid item>
                    <IconButton
                        sx={{ color: "#3b99fc" }}
                        onClick={() => handlePlatformClick("WalletConnect")}
                    >
                        <WalletConnectIcon fontSize="large" />
                    </IconButton>
                </Grid>
            </Grid>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
            />
        </Box>
    );
}