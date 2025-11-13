"use client";

import { Box, Typography, Avatar, Grid, Card, CardMedia, CardContent, Button } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import "../globals.css";

const mockNFTs = [
    { name: "Cyber Ape #142", img: "/MockNfts/usernft1.jpeg", price: "2.3 ETH" },
    { name: "Neon Cat #88", img: "/MockNfts/usernft2.jpeg", price: "1.1 ETH" },
    { name: "Voxel Bot #512", img: "/MockNfts/usernft3.jpeg", price: "3.8 ETH" }
];

export default function ProfilePage() {
    const walletAddress = "0x92c...a1F7";

    return (
        <Box sx={{ mt: 10, px: 4, pb: 6 }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                    mb: 5,
                    background: "linear-gradient(90deg, #4b0082, #8c61ff)",
                    borderRadius: "16px",
                    p: 3,
                    color: "#fff",
                }}
            >
                <Avatar
                    src="/user-avatar.png"
                    sx={{ width: 80, height: 80, border: "2px solid white" }}
                />
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        Alina’s Collection
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                        {walletAddress}
                        <ContentCopyIcon sx={{ fontSize: 16, cursor: "pointer" }} />
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 1 }}>
                        NFT Enthusiast | Member since 2025
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    variant="contained"
                    sx={{ backgroundColor: "#fff", color: "#4b0082", fontWeight: 600 }}
                >
                    Edit Profile
                </Button>
            </Box>

            <Typography variant="h6" sx={{ mb: 3 }}>
                Collection Showcase
            </Typography>
            <Grid container spacing={3}>
                {mockNFTs.map((nft, index) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card
                            sx={{
                                backgroundColor: "background.paper",
                                borderRadius: 4,
                                transition: "transform 0.3s",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={nft.img}
                                alt={nft.name}
                                sx={{ height: 200, objectFit: "cover" }}
                            />
                            <CardContent>
                                <Typography sx={{ fontWeight: 600 }}>{nft.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {nft.price}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}