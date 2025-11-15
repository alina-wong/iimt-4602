"use client";

import { Box, Typography, Card, CardMedia, Divider, Button, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Alert, CircularProgress, Paper, Avatar, Chip, Stepper, Step, StepLabel } from "@mui/material";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const steps = [
  'Payment Method',
  'Billing Information',
  'Complete Purchase',
];

export default function TransactionPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get('productId') || '1';
    
    const [activeStep, setActiveStep] = useState(0);
    const [paymentMethod, setPaymentMethod] = useState('platform'); // 'platform' or 'external'
    const [walletMethod, setWalletMethod] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [platformBalance] = useState(1.2345); // Mock platform balance
    const [billingInfo, setBillingInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
        address: ''
    });
    
    // Mock item data
    const itemData = {
        1: { 
            name: "Gungnir", 
            price: "1.2 ETH", 
            img: "/MockNfts/nft1.png", 
            description: "A legendary spear from Norse mythology.",
            creator: "OdinCrafts",
            collection: "Norse Legends"
        },
        2: { 
            name: "Green Energy", 
            price: "0.5 ETH", 
            img: "/MockNfts/nft2.png",
            description: "Sustainable energy visualization in digital art form.",
            creator: "EcoArtist",
            collection: "Future Energy"
        },
        3: { 
            name: "Crakow!", 
            price: "2.0 ETH", 
            img: "/MockNfts/nft3.png",
            description: "A vibrant digital artwork inspired by the historic city of Krakow.",
            creator: "PolishArtist",
            collection: "European Cities"
        },
        4: { 
            name: "Asiimov", 
            price: "3.1 ETH", 
            img: "/MockNfts/nft4.png",
            description: "Futuristic weapon skin design inspired by science fiction.",
            creator: "FutureTech",
            collection: "Sci-Fi Weapons"
        },
        5: { 
            name: "Chromatic abberation", 
            price: "0.8 ETH", 
            img: "/MockNfts/nft5.png",
            description: "An experimental digital art piece exploring chromatic aberration.",
            creator: "DigitalLens",
            collection: "Abstract Experiments"
        }
    };

    const item = itemData[productId] || itemData[1];
    
    // Calculate fees
    const itemPrice = parseFloat(item.price.replace(' ETH', ''));
    const platformFee = itemPrice * 0.02;
    const gasFee = 0.005;
    const totalPrice = itemPrice + platformFee + gasFee;

    const handleInputChange = (field, value) => {
        setBillingInfo(prev => ({ ...prev, [field]: value }));
    };

    const handleNext = () => {
        if (activeStep === 0) {
            if (paymentMethod === 'external' && !walletMethod) {
                alert('Please select a wallet method');
                return;
            }
            if (paymentMethod === 'platform' && platformBalance < totalPrice) {
                alert('Insufficient platform balance. Please select external wallet or top up your account.');
                return;
            }
        }
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handlePurchase = () => {
        setIsProcessing(true);
        
        // Simulate transaction processing
        setTimeout(() => {
            setIsProcessing(false);
            alert('Purchase completed successfully!');
            router.push('/profile');
        }, 3000);
    };

    return (
        <Box sx={{minHeight: "80vh", display: 'flex' }}>
            {/* Left Side - Product Summary */}
            <Box sx={{ 
                width: '50%', 
                backgroundColor: '#e1dfdcff',
                p: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start', // Changed from 'center' to 'flex-start'
                minHeight: '80vh' // Ensure consistent height
            }}>
                {/* Order Summary */}
                <Box sx={{ p: 3, mb: 1, backgroundColor: '#e1dfdcff', borderRadius: 1, flex: 'none' }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>
                        Order Summary
                    </Typography>
                    
                    <Box sx={{ display: 'flex', mb: 3 }}>
                        <CardMedia
                            component="img"
                            image={item.img}
                            alt={item.name}
                            sx={{ 
                                width: 100, 
                                height: 100, 
                                objectFit: "cover",
                                borderRadius: 1,
                                mr: 2
                            }}
                        />
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                by {item.creator}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {item.collection}
                            </Typography>
                        </Box>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>Item Price:</Typography>
                        <Typography>{item.price}</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography>Platform Fee (2.5%):</Typography>
                        <Typography>{platformFee.toFixed(3)} ETH</Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography>Gas Fee:</Typography>
                        <Typography>{gasFee.toFixed(3)} ETH</Typography>
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total:</Typography>
                        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>{totalPrice.toFixed(3)} ETH</Typography>
                    </Box>
                </Box>
            </Box>

            {/* Right Side - Transaction Form */}
            <Box sx={{ 
                width: '50%',
                backgroundColor: '#f5f3f0',
                p: 4,
                display: 'flex',
                flexDirection: 'column'
            }}>
                {/* Stepper */}
                <Box sx={{ width: '100%', mb: 4 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>

                {/* Step Content */}
                <Box sx={{ flex: 1 }}>
                    {activeStep === 0 && (
                        <Box>
                            <Typography>
                                Select Payment Method
                            </Typography>
                            
                            {/* Platform Balance Display */}
                            <Box sx={{ mb: 2, p: 3, backgroundColor: 'white', borderRadius: 1, border: '1px solid #e0e0e0' }}>
                                <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'bold' }}>
                                    Platform Balance
                                </Typography>
                                <Typography variant="h5" sx={{ mb: 2, color: 'primary.main' }}>
                                    {platformBalance.toFixed(4)} ETH
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {platformBalance >= totalPrice ? 
                                        `✓ Sufficient balance (${(platformBalance - totalPrice).toFixed(4)} ETH remaining after purchase)` :
                                        `⚠ Insufficient balance (need ${(totalPrice - platformBalance).toFixed(4)} ETH more)`
                                    }
                                </Typography>
                            </Box>
                            
                            {/* Payment Method Selection */}
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="subtitle2" sx={{ mb: 2 }}>
                                    Choose Payment Method:
                                </Typography>
                                
                                {/* Platform Balance Option */}
                                <Box 
                                    onClick={() => setPaymentMethod('platform')}
                                    sx={{ 
                                        p: 2, 
                                        mb: 2, 
                                        backgroundColor: paymentMethod === 'platform' ? '#e8f5e8' : 'white',
                                        border: paymentMethod === 'platform' ? '2px solid' : '1px solid #e0e0e0',
                                        borderColor: paymentMethod === 'platform' ? '#4caf50' : '#e0e0e0',
                                        borderRadius: 1,
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: paymentMethod === 'platform' ? '#e8f5e8' : '#f5f5f5' }
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: paymentMethod === 'platform' ? '#2e7d32' : 'inherit' }}>
                                        Pay with Platform Balance
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Use your existing platform balance ({platformBalance.toFixed(4)} ETH)
                                    </Typography>
                                    {platformBalance < totalPrice && (
                                        <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                                            Insufficient balance - please top up or use external wallet
                                        </Typography>
                                    )}
                                </Box>
                                
                                {/* External Wallet Option */}
                                <Box 
                                    onClick={() => setPaymentMethod('external')}
                                    sx={{ 
                                        p: 2, 
                                        backgroundColor: paymentMethod === 'external' ? '#e3f2fd' : 'white',
                                        border: paymentMethod === 'external' ? '2px solid' : '1px solid #e0e0e0',
                                        borderColor: paymentMethod === 'external' ? '#2196f3' : '#e0e0e0',
                                        borderRadius: 1,
                                        cursor: 'pointer',
                                        '&:hover': { backgroundColor: paymentMethod === 'external' ? '#e3f2fd' : '#f5f5f5' }
                                    }}
                                >
                                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: paymentMethod === 'external' ? '#1565c0' : 'inherit' }}>
                                        Pay with External Wallet / Top-up
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Connect external wallet for direct payment or to top up platform balance
                                    </Typography>
                                </Box>
                            </Box>
                            
                            {/* Wallet Selection (only shown if external payment selected) */}
                            {paymentMethod === 'external' && (
                                <FormControl fullWidth sx={{ mb: 3 }}>
                                    <InputLabel>Select Wallet</InputLabel>
                                    <Select
                                        value={walletMethod}
                                        label="Select Wallet"
                                        onChange={(e) => setWalletMethod(e.target.value)}
                                        sx={{ backgroundColor: 'white' }}
                                    >
                                        <MenuItem value="metamask">MetaMask</MenuItem>
                                        <MenuItem value="coinbase">Coinbase Wallet</MenuItem>
                                        <MenuItem value="walletconnect">WalletConnect</MenuItem>
                                    </Select>
                                </FormControl>
                            )}
                        </Box>
                    )}

                    {activeStep === 1 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Billing Information
                            </Typography>
                            
                            {/* First Box: First Name and Last Name */}
                            <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                <TextField
                                    fullWidth
                                    label="First Name"
                                    value={billingInfo.firstName}
                                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                                    sx={{ backgroundColor: 'white' }}
                                />
                                <TextField
                                    fullWidth
                                    label="Last Name"
                                    value={billingInfo.lastName}
                                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                                    sx={{ backgroundColor: 'white' }}
                                />
                            </Box>
                            
                            {/* Second Box: Billing Address Multiline */}
                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Billing Address"
                                    multiline
                                    rows={3}
                                    value={billingInfo.address}
                                    onChange={(e) => handleInputChange('address', e.target.value)}
                                    sx={{ backgroundColor: 'white' }}
                                />
                            </Box>
                            
                            {/* Third Box: Email */}
                            <Box sx={{ mb: 3 }}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    type="email"
                                    value={billingInfo.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    sx={{ backgroundColor: 'white' }}
                                />
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                    Your receipt and purchase confirmation will be sent to this email address.
                                </Typography>
                            </Box>
                        </Box>
                    )}

                    {activeStep === 2 && (
                        <Box>
                            <Typography variant="h6" sx={{ mb: 3 }}>
                                Review & Complete Purchase
                            </Typography>
                            
                            <Alert severity="info" sx={{ mb: 3 }}>
                                Please review your information before completing the purchase
                            </Alert>

                            <Paper sx={{ p: 2, mb: 3, backgroundColor: 'white' }}>
                                <Typography variant="subtitle2">Payment Method: {paymentMethod === 'platform' ? 'Platform Balance' : `External Wallet (${walletMethod})`}</Typography>
                                <Typography variant="subtitle2">Name: {billingInfo.firstName} {billingInfo.lastName}</Typography>
                                <Typography variant="subtitle2">Email: {billingInfo.email}</Typography>
                                <Typography variant="subtitle2">Address: {billingInfo.address}</Typography>
                            </Paper>

                            {isProcessing && (
                                <Box sx={{ textAlign: 'center', mb: 3 }}>
                                    <CircularProgress sx={{ mb: 2 }} />
                                    <Typography>Processing transaction...</Typography>
                                </Box>
                            )}
                        </Box>
                    )}
                </Box>

                {/* Navigation Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
                    <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        variant="outlined"
                    >
                        Back
                    </Button>
                    
                    {activeStep === steps.length - 1 ? (
                        <Button
                            variant="contained"
                            onClick={handlePurchase}
                            disabled={isProcessing}
                            sx={{ 
                                backgroundColor: 'black',
                                '&:hover': { backgroundColor: '#333' }
                            }}
                        >
                            {isProcessing ? 'Processing...' : 'Complete Purchase'}
                        </Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ 
                                backgroundColor: 'black',
                                '&:hover': { backgroundColor: '#333' }
                            }}
                        >
                            Next
                        </Button>
                    )}
                </Box>
            </Box>
        </Box>
    );
}