"use client"

import React, { useState } from 'react';
import { AppBar, IconButton, Typography, Tooltip, Toolbar} from '@mui/material';
import { useRouter } from 'next/navigation';
import WalletRoundedIcon from '@mui/icons-material/WalletRounded';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsRoundedIcon from '@mui/icons-material/SettingsRounded';
//import './global.css';

export default function Header() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const router = useRouter();

    const handleWalletClick = () => router.push("/wallet");
    const handleAvatarClick = () => router.push("/profile");
    const handleSettingsClick = () => router.push("/settings");
    
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
                    <Tooltip title="Wallet" arrow>
                        <IconButton onClick={handleWalletClick}>
                            <WalletRoundedIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Profile" arrow>
                        <IconButton onClick={handleAvatarClick}>
                            <AccountCircleIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Settings" arrow>
                        <IconButton onClick={handleSettingsClick}>
                            <SettingsRoundedIcon />
                        </IconButton>
                    </Tooltip>
                </Toolbar>
            </Toolbar>
        </AppBar>
      );
}