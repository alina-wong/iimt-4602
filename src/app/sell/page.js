"use client";
// bug need fixing: ETH text color + unresponsive button
import { Box, Typography, TextField, Button, Card, Grid, MenuItem, Select, FormControl, InputLabel, InputAdornment, OutlinedInput, FormHelperText, CircularProgress, Alert } from "@mui/material";
import { useState } from "react";
import PhotoCapture from "../components/PhotoCapture";
import styles from './page.module.css';
import "../globals.css";

export default function SellPage() {
    const [nftData, setNftData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        image: null
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const categories = ['Skins', 'Mods', '3D Objects'];

    const handleInputChange = (field, value) => {
        setNftData(prev => ({ ...prev, [field]: value }));
    };

    const handleFileSelect = (file) => {
        setNftData(prev => ({ ...prev, image: file }));
        
        const reader = new FileReader();
        reader.onload = (e) => setImagePreview(e.target.result);
        reader.readAsDataURL(file);
    };

    const handleSubmit = () => {
        setIsLoading(true);
        setMessage({ type: '', text: '' });
        
        // Simulate processing
        setTimeout(() => {
            setMessage({ 
                type: 'success', 
                text: 'NFT successfully minted!' 
            });
            
            // Reset form
            setNftData({
                name: '',
                description: '',
                price: '',
                category: '',
                image: null
            });
            setImagePreview(null);
            setIsLoading(false);
        }, 2000);
    };

    return (
        <Box className={styles.pageContainer}>
            <Typography variant="h4" className={styles.title}>
                Mint & List NFT
            </Typography>
            
            <Typography variant="body1" className={styles.subtitle}>
                Upload your digital artwork, add details, and mint it as an NFT on the blockchain. <br />
                Once minted, it will be listed for sale in the marketplace.
            </Typography>
            
            {message.text && (
                <Alert 
                    severity={message.type}
                    className={styles.centeredAlert}
                    onClose={() => setMessage({ type: '', text: '' })}
                >
                    {message.text}
                </Alert>
            )}
            
            <Grid container justifyContent="center">
                <Grid item xs={12} sx={{ maxWidth: '95vw', width: '100%' }}>
                    <Card className={styles.sectionCard}>
                        <Typography variant="h6" className={styles.formTitle}>
                            NFT Details
                        </Typography>
                        
                        <Grid container spacing={4} sx={{ mt: 1, minHeight: '400px' }}>
                            {/* Left side - Upload area */}
                            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                                    Upload your NFT:
                                </Typography>
                                
                                <Box sx={{ flexGrow: 1, minHeight: '300px' }}>
                                    <PhotoCapture 
                                        onFileSelect={handleFileSelect}
                                        imagePreview={imagePreview}
                                        className={styles.uploadArea}
                                    />
                                </Box>
                            </Grid>
                            
                            {/* Right side - Form fields */}
                            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>
                                    NFT Information:
                                </Typography>
                                
                                <Box sx={{ flexGrow: 1 }}>
                                    <div className={styles.formContainer}>
                                        <TextField
                                            label="NFT Name"
                                            className={styles.textField}
                                            value={nftData.name}
                                            onChange={(e) => handleInputChange('name', e.target.value)}
                                            fullWidth
                                            sx={{ mb: 2 }}
                                        />
                                        
                                        <TextField
                                            label="Description"
                                            multiline
                                            rows={3}
                                            className={styles.textFieldMultiline}
                                            value={nftData.description}
                                            onChange={(e) => handleInputChange('description', e.target.value)}
                                            fullWidth
                                            sx={{ mb: 2 }}
                                        />
                                        
                                        <FormControl 
                                            fullWidth 
                                            variant="outlined"
                                            sx={{ 
                                                mb: 2,
                                                '& .MuiOutlinedInput-root': {
                                                    backgroundColor: 'white'
                                                }
                                            }}
                                        >
                                            <InputLabel htmlFor="outlined-adornment-price">Price</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-price"
                                                type="number"
                                                value={nftData.price}
                                                onChange={(e) => handleInputChange('price', e.target.value)}
                                                endAdornment={<InputAdornment position="end">ETH</InputAdornment>}
                                                label="Price"
                                                inputProps={{
                                                    'aria-label': 'price',
                                                }}
                                            />
                                        </FormControl>
                                        
                                        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                                            <InputLabel>Category</InputLabel>
                                            <Select
                                                value={nftData.category}
                                                onChange={(e) => handleInputChange('category', e.target.value)}
                                                label="Category"
                                                sx={{ backgroundColor: 'white' }}
                                                MenuProps={{
                                                    PaperProps: {
                                                        sx: {
                                                            backgroundColor: 'white',
                                                            '& .MuiMenuItem-root': {
                                                                backgroundColor: 'white',
                                                                color: 'black',
                                                                '&:hover': {
                                                                    backgroundColor: '#f5f5f5',
                                                                },
                                                                '&.Mui-selected': {
                                                                    backgroundColor: '#e3f2fd',
                                                                    '&:hover': {
                                                                        backgroundColor: '#bbdefb',
                                                                    },
                                                                },
                                                            },
                                                        },
                                                    },
                                                }}
                                            >
                                                {categories.map((category) => (
                                                    <MenuItem key={category} value={category}>
                                                        {category}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl> 
                                    </div>
                                </Box>
                            </Grid>
                        </Grid>
                        
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                            <Button
                                className={styles.submitButton}
                                onClick={handleSubmit}
                                disabled={!nftData.name || !nftData.price || !nftData.image || !nftData.category || isLoading}
                                size="large"
                            >
                                {isLoading ? (
                                    <Box className={styles.loadingContainer}>
                                        <CircularProgress size={20} />
                                        Minting...
                                    </Box>
                                ) : (
                                    'Mint NFT'
                                )}
                            </Button>
                        </Box>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}