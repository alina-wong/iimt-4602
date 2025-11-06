"use client"

import React, { useState } from 'react';
import { AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Tooltip, MenuItem } from '@mui/material';
import { useRouter } from 'next/navigation';
//import './global.css';

const settings = [
    { label: 'Profile', path: '/profilecard' },
    { label: 'Profile settings', path: '/profile' },
    { label: 'Logout', path: '/signup' }
];

export default function Header() {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const router = useRouter();

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClose = (path) => {
        setAnchorElUser(null);
        if (path) router.push(path);
      };

    const goHome = () => {
        router.push("/");
      };
    
    return (
        <AppBar
            position="fixed"
            sx={{ backgroundColor: "#2a2238", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    {/* Clickable title */}
                    <Typography
                        variant="h6"
                        noWrap
                        onClick={goHome}
                        sx={{
                            mr: 2,
                            display: "flex",
                            fontFamily: "Helvetica",
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                            cursor: "pointer",
                        }}
                    >
                        Omniverse Marketplace
                    </Typography>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* User avatar menu */}
                    <Box>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="User Avatar" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: "45px" }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "right",
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.label} onClick={() => handleClose(setting.path)}>
                                    <Typography textAlign="center">{setting.label}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
    }