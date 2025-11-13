"use client"

import React, { useState } from 'react';
import { AppBar, IconButton, Typography, Tooltip, Toolbar} from '@mui/material';
import { useRouter } from 'next/navigation';
import WalletRoundedIcon from '@mui/icons-material/WalletRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
import AddIcon from '@mui/icons-material/Add';
import StorefrontIcon from '@mui/icons-material/Storefront';
//import './global.css';

export default function Header() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const router = useRouter();

    const handleWalletClick = () => router.push("/wallet");
    const handleAvatarClick = () => router.push("/profile");
    const handleSettingsClick = () => router.push("/settings");
    const handleSellClick = () => router.push("/sell");
    const handleDashboardClick = () => router.push("/dashboard");
    
    return (
        <AppBar position="fixed">
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography
                    variant="h6"
                    sx={{ 
                        fontWeight: 700, 
                        cursor: "pointer",
                        fontFamily: '"Orbitron", "Exo 2", "Rajdhani", "Space Mono", monospace',
                        letterSpacing: "0.1em",
                        fontSize: "1.5rem",
                        textTransform: "uppercase",
                    }}
                    onClick={() => router.push("/")}
                >
                    Omniverse
                </Typography>

                <Toolbar sx={{ display: "flex", gap: 2}}>
                    <Tooltip title="Mint" arrow>
                        <IconButton 
                            onClick={handleSellClick}
                            sx={{
                                "&:hover": { color: "black" }
                            }}
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="My Dashboard" arrow>
                        <IconButton 
                            onClick={handleDashboardClick}
                            sx={{
                                "&:hover": { color: "black" }
                            }}
                        >
                            <StorefrontIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Wallet" arrow>
                        <IconButton 
                            onClick={handleWalletClick}
                            sx={{
                                "&:hover": { color: "black" }
                            }}
                        >
                            <WalletRoundedIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Profile" arrow>
                        <IconButton 
                            onClick={handleAvatarClick}
                            sx={{
                                "&:hover": { color: "black" }
                            }}
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Settings" arrow>
                        <IconButton 
                            onClick={handleSettingsClick}
                            sx={{
                                "&:hover": { color: "black" }
                            }}
                        >
                            <SettingsRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </Toolbar>
        </AppBar>
      );
}