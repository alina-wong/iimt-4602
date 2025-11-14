"use client";
// bug need fixing: ETH text color + unresponsive button
import { Box, Typography, TextField, Button, Card, Grid, MenuItem, Select, FormControl, InputLabel, InputAdornment, OutlinedInput, FormHelperText, Paper, CircularProgress, Alert } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setNftData(prev => ({ ...prev, image: file }));
            
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
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

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const validTypes = ['image/', '.obj', '.fbx', '.gltf', '.glb', '.zip', '.rar', '.7z', '.blend', '.ma', '.mb'];
        const isValidType = validTypes.some(type => 
            file.type.startsWith(type) || file.name.toLowerCase().includes(type)
        );
        
        if (file && isValidType) {
            setNftData(prev => ({ ...prev, image: file }));
            
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
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
                <Grid item xs={12} md={8} lg={6} sx={{ maxWidth: '600px' }}>
                    <Card className={styles.sectionCard}>
                        <Typography variant="h6" className={styles.formTitle}>
                            NFT Details
                        </Typography>
                        
                        <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600, mt: 2 }}>
                            Upload your NFT:
                        </Typography>
                        <Paper
                            className={styles.uploadArea}
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                        >
                            {imagePreview ? (
                                <Box className={styles.previewContainer}>
                                    <img 
                                        src={imagePreview} 
                                        alt="Preview" 
                                        className={styles.previewImage}
                                    />
                                    <Typography variant="body2" sx={{ mt: 2 }}>
                                        Click to change image
                                    </Typography>
                                </Box>
                            ) : (
                                <>
                                    <CloudUploadIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                                    <Typography variant="h6" sx={{ mb: 1 }}>
                                        Drag & drop your file here
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        or click to browse files
                                    </Typography>
                                    <Typography variant="caption" sx={{ mt: 1 }}>
                                        Images: PNG, JPG, GIF | 3D Models: OBJ, FBX, GLTF | Mods: ZIP, RAR up to 50MB
                                    </Typography>
                                </>
                            )}
                            <input
                                type="file"
                                accept="image/*,.obj,.fbx,.gltf,.glb,.zip,.rar,.7z,.blend,.ma,.mb"
                                onChange={handleImageUpload}
                                className={styles.hiddenFileInput}
                            />
                        </Paper>
                        
                        <div className={styles.formContainer}>
                            <TextField
                                label="NFT Name"
                                className={styles.textField}
                                value={nftData.name}
                                onChange={(e) => handleInputChange('name', e.target.value)}
                            />
                            
                            <TextField
                                label="Description"
                                multiline
                                rows={3}
                                className={styles.textFieldMultiline}
                                value={nftData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
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
                                    endAdornment={<InputAdornment position="end">ETH</InputAdornment>} //slight bug text cant change to black
                                    label="Price"
                                    inputProps={{
                                        'aria-label': 'price',
                                    }}
                                />
                            </FormControl>
                            
                            <FormControl className={styles.selectField} variant="outlined">
                                <InputLabel>Category</InputLabel>
                                <Select
                                    value={nftData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    label="Category"
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
                        
                        <Button
                            className={styles.submitButton}
                            onClick={handleSubmit}
                            disabled={!nftData.name || !nftData.price || !nftData.image || !nftData.category || isLoading}
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
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}