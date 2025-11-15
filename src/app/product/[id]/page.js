"use client";

import { Box, Typography, Card, CardMedia, Divider, Button, Grid, Chip, Avatar } from "@mui/material";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export default function ProductPage() {
    const router = useRouter();
    const params = useParams();
    
    // Mock item data
    const itemData = {
        1: { 
            name: "Gungnir", 
            price: "1.2 ETH", 
            img: "/MockNfts/nft1.png", 
            description: "A legendary spear from Norse mythology. This NFT represents the eternal weapon of Odin, crafted with divine precision.",
            creator: "OdinCrafts",
            collection: "Norse Legends"
        },
        2: { 
            name: "Green Energy", 
            price: "0.5 ETH", 
            img: "/MockNfts/nft2.png",
            description: "Sustainable energy visualization in digital art form. Represents the future of clean technology.",
            creator: "EcoArtist",
            collection: "Future Energy"
        },
        3: { 
            name: "Crakow!", 
            price: "2.0 ETH", 
            img: "/MockNfts/nft3.png",
            description: "A vibrant digital artwork inspired by the historic city of Krakow, blending traditional architecture with modern digital aesthetics.",
            creator: "PolishArtist",
            collection: "European Cities"
        },
        4: { 
            name: "Asiimov", 
            price: "3.1 ETH", 
            img: "/MockNfts/nft4.png",
            description: "Futuristic weapon skin design inspired by science fiction aesthetics. Clean lines meet advanced technology.",
            creator: "FutureTech",
            collection: "Sci-Fi Weapons"
        },
        5: { 
            name: "Chromatic abberation", 
            price: "0.8 ETH", 
            img: "/MockNfts/nft5.png",
            description: "An experimental digital art piece exploring the visual effects of chromatic aberration in digital photography.",
            creator: "DigitalLens",
            collection: "Photography Effects"
        },
        6: { 
            name: "StatTrak", 
            price: "0.8 ETH", 
            img: "/MockNfts/nft6.png",
            description: "Professional gaming equipment NFT with built-in statistics tracking capabilities.",
            creator: "GamePro",
            collection: "Gaming Gear"
        },
        7: { 
            name: "Dragon Lore", 
            price: "1.5 ETH", 
            img: "/MockNfts/nft7.png",
            description: "Legendary weapon adorned with ancient dragon mythology and golden accents.",
            creator: "MythForge",
            collection: "Legendary Weapons"
        },
        8: { 
            name: "Karambit", 
            price: "2.2 ETH", 
            img: "/MockNfts/nft8.png",
            description: "Curved blade design inspired by Southeast Asian martial arts traditions.",
            creator: "BladeArt",
            collection: "Martial Arts"
        },
        9: { 
            name: "Aerial", 
            price: "0.9 ETH", 
            img: "/MockNfts/nft9.png",
            description: "Stunning aerial photography NFT capturing landscapes from a bird's eye view.",
            creator: "SkyPhotographer",
            collection: "Aerial Views"
        },
        10: { 
            name: "Neon Rider", 
            price: "3.0 ETH", 
            img: "/MockNfts/nft10.png",
            description: "Cyberpunk-inspired digital art featuring neon lights and futuristic motorcycles.",
            creator: "CyberArtist",
            collection: "Cyberpunk"
        },
    };

    const item = itemData[params.id] || itemData[1];

    return (
        <Box sx={{ p: 5}}>
            <Button 
                onClick={() => router.push("/")} 
                sx={{ mb: 3 }}
                variant="outlined"
            >
                ← Back
            </Button>

            <Grid container spacing={2} sx={{ 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'flex-start'
            }}>
                {/* Image Section */}
                <Grid size={6}>
                    <Card elevation={3}>
                        <CardMedia
                            component="img"
                            image={item.img}
                            alt={item.name}
                            sx={{ 
                                width: "100%", 
                                height: 400, 
                                objectFit: "cover",
                                backgroundColor: "#ccc5b1ff",
                            }}
                        />
                    </Card>
                </Grid>

                {/* Details Section */}
                <Grid size={6}>
                    <Box>
                        <Typography variant="h3">
                            {item.name}
                        </Typography>
                        
                        <Typography variant="h4">
                            {item.price}
                        </Typography>

                        <Divider sx={{my: 3}}></Divider>

                        <Typography variant="body1" sx={{lineHeight: 1.6}}>
                            {item.description}
                        </Typography>

                        <Divider sx={{my: 3}}></Divider>

                        <Box>
                            <Typography variant="h6">
                                Creator
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                <Avatar sx={{ mr: 1 }}>{item.creator[0]}</Avatar>
                                <Typography variant="body1">{item.creator}</Typography>
                            </Box>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6">
                                Collection
                            </Typography>
                            <Typography variant="body1">
                                {item.collection}
                            </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                            <Button 
                                variant="contained" 
                                size="medium"
                                onClick={() => router.push(`/transaction?productId=${params.id}`)}
                                sx={{ 
                                    backgroundColor: 'black',
                                    '&:hover': { backgroundColor: '#333' }
                                }}
                            >
                                Buy Now
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
}