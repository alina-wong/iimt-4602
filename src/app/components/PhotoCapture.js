"use client";

import { Box, Typography, Button, Paper } from "@mui/material";
import { useState } from "react";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function PhotoCapture({ onFileSelect, imagePreview, className }) {
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [stream, setStream] = useState(null);
    const [isPhotogrammetryMode, setIsPhotogrammetryMode] = useState(false);
    const [capturedPhotos, setCapturedPhotos] = useState([]);
    const [currentAngleIndex, setCurrentAngleIndex] = useState(0);
    const [isProcessingPhotos, setIsProcessingPhotos] = useState(false);
    
    const captureAngles = [
        { name: "Front", angle: 0, description: "Face the object directly" },
        { name: "Front-Right", angle: 45, description: "45° to the right" },
        { name: "Right Side", angle: 90, description: "Right side of object" },
        { name: "Back-Right", angle: 135, description: "135° to the right" },
        { name: "Back", angle: 180, description: "Behind the object" },
        { name: "Back-Left", angle: 225, description: "225° to the right" },
        { name: "Left Side", angle: 270, description: "Left side of object" },
        { name: "Front-Left", angle: 315, description: "315° to the right" },
        { name: "Top View", angle: -30, description: "From above at 30° angle" },
        { name: "Low View", angle: -60, description: "From below at 60° angle" }
    ];

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file && onFileSelect) {
            onFileSelect(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        const validTypes = ['image/', '.obj', '.fbx', '.gltf', '.glb', '.zip', '.rar', '.7z', '.blend', '.ma', '.mb'];
        const isValidType = validTypes.some(type => 
            file.type.startsWith(type) || file.name.toLowerCase().includes(type)
        );
        
        if (file && isValidType && onFileSelect) {
            onFileSelect(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleCamera = async () => {
        try {
            if (isCameraActive) {
                // Stop camera
                if (stream) {
                    stream.getTracks().forEach(track => track.stop());
                    setStream(null);
                }
                setIsCameraActive(false);
                setIsPhotogrammetryMode(false);
                setCapturedPhotos([]);
                setCurrentAngleIndex(0);
            } else {
                
                const mediaStream = await navigator.mediaDevices.getUserMedia({ 
                    video: { 
                        width: { ideal: 1920 },
                        height: { ideal: 1080 },
                        facingMode: 'environment',
                        focusMode: 'continuous'
                    } 
                });
                setStream(mediaStream);
                setIsCameraActive(true);
                setIsPhotogrammetryMode(true);
                setCapturedPhotos([]);
                setCurrentAngleIndex(0);
            }
        } catch (error) {
            // Camera access denied or not available
        }
    };

    const capturePhoto = async () => {
        const video = document.getElementById('cameraVideo');
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);
        
        setIsProcessingPhotos(true);
        
        try {
            // Simple photo capture without processing for now
            canvas.toBlob((blob) => {
                const file = new File([blob], `photogrammetry-${currentAngleIndex + 1}.jpg`, { type: 'image/jpeg' });
                
                if (isPhotogrammetryMode) {
                    const newPhoto = {
                        file,
                        angle: captureAngles[currentAngleIndex],
                        timestamp: Date.now()
                    };
                    setCapturedPhotos(prev => [...prev, newPhoto]);
                    
                    // Move to next angle
                    if (currentAngleIndex < captureAngles.length - 1) {
                        setCurrentAngleIndex(prev => prev + 1);
                    } else {
                        // All photos captured, ready for Rust processing
                        completePhotogrammetry();
                    }
                } else {
                    // Single photo mode
                    if (onFileSelect) {
                        onFileSelect(file);
                    }
                    handleCamera();
                }
                
                setIsProcessingPhotos(false);
            }, 'image/jpeg', 0.9);
            
        } catch (error) {
            setIsProcessingPhotos(false);
        }
    };
    
    const completePhotogrammetry = () => {
        // For now, use the first photo as the main file
        if (capturedPhotos.length > 0 && onFileSelect) {
            onFileSelect(capturedPhotos[0].file);
        }
        
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
        setIsCameraActive(false);
        setIsPhotogrammetryMode(false);
        setCapturedPhotos([]);
        setCurrentAngleIndex(0);
    };
    
    const startPhotogrammetry = async () => {
        setIsPhotogrammetryMode(true);
        setCapturedPhotos([]);
        setCurrentAngleIndex(0);
        await handleCamera();
    };
    
    const skipAngle = () => {
        if (currentAngleIndex < captureAngles.length - 1) {
            setCurrentAngleIndex(prev => prev + 1);
        } else {
            completePhotogrammetry();
        }
    };
    
    const cancelPhotogrammetry = () => {
        setIsPhotogrammetryMode(false);
        setCapturedPhotos([]);
        setCurrentAngleIndex(0);
        handleCamera(); // Stop camera
    };
    
    // TODO: Re-implement when Rust backend integration is complete
    // const handle3DPreviewClose = () => {
    //     // Handle 3D preview from Rust backend
    // };

    return (
        <Paper
            className={className}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            sx={{ position: 'relative' }}
        >
            {/* TODO: Re-enable 3D preview with Rust backend integration */}
            {imagePreview ? (
                <Box sx={{ textAlign: 'center', p: 3 }}>
                    <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ 
                            maxWidth: '100%', 
                            maxHeight: '300px', 
                            borderRadius: '8px' 
                        }}
                    />
                    <Typography variant="body2" sx={{ mt: 2 }}>
                        Click to change image
                    </Typography>
                    <input
                        type="file"
                        accept="image/*,.obj,.fbx,.gltf,.glb,.zip,.rar,.7z,.blend,.ma,.mb"
                        onChange={handleImageUpload}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            opacity: 0,
                            cursor: 'pointer'
                        }}
                    />
                </Box>
            ) : isCameraActive ? (
                <Box sx={{ textAlign: 'center', p: 3 }}>
                    {isPhotogrammetryMode && (
                        <Box sx={{ mb: 3, p: 2, backgroundColor: '#e3f2fd', borderRadius: 1 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Photogrammetry Mode
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 2 }}>
                                Photo {currentAngleIndex + 1} of {captureAngles.length}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                                <Box 
                                    sx={{ 
                                        width: 100, 
                                        height: 8, 
                                        backgroundColor: '#e0e0e0', 
                                        borderRadius: 4,
                                        overflow: 'hidden'
                                    }}
                                >
                                    <Box 
                                        sx={{ 
                                            width: `${((currentAngleIndex + 1) / captureAngles.length) * 100}%`, 
                                            height: '100%', 
                                            backgroundColor: '#26ce99ff',
                                            transition: 'width 0.3s ease'
                                        }}
                                    />
                                </Box>
                            </Box>
                            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1565c0' }}>
                                {captureAngles[currentAngleIndex].name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {captureAngles[currentAngleIndex].description}
                            </Typography>
                        </Box>
                    )}
                    
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <video
                            id="cameraVideo"
                            autoPlay
                            playsInline
                            ref={(video) => {
                                if (video && stream) {
                                    video.srcObject = stream;
                                }
                            }}
                            style={{ 
                                width: '100%', 
                                maxWidth: '400px', 
                                height: 'auto',
                                borderRadius: '8px' 
                            }}
                        />
                        
                        {isPhotogrammetryMode && (
                            <Box 
                                sx={{ 
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    pointerEvents: 'none'
                                }}
                            >
                                <Box 
                                    sx={{ 
                                        width: 60,
                                        height: 60,
                                            border: '3px solid #26ce99ff',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}
                                >
                                    <Box 
                                        sx={{ 
                                            width: 8,
                                            height: 8,
                                            backgroundColor: '#31a27bff',
                                            borderRadius: '50%'
                                        }}
                                    />
                                </Box>
                            </Box>
                        )}
                    </Box>
                    
                    <Box sx={{ mt: 2, display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Button 
                            variant="contained"
                            onClick={capturePhoto}
                            disabled={isProcessingPhotos}
                            sx={{ 
                                backgroundColor: 'black',
                                '&:hover': { backgroundColor: '#333' }
                            }}
                        >
                            {isProcessingPhotos ? 'Capturing...' : (isPhotogrammetryMode ? 'Capture Angle' : 'Capture Photo')}
                        </Button>
                        
                        {isPhotogrammetryMode && (
                            <Button 
                                variant="outlined"
                                onClick={skipAngle}
                                sx={{ 
                                    color: '#333',
                                    borderColor: '#333',
                                    '&:hover': {
                                        backgroundColor: 'rgba(33, 150, 243, 0.04)',
                                        borderColor: '#333'
                                    }
                                }}
                            >
                                Skip Angle
                            </Button>
                        )}
                        
                        <Button 
                            variant="outlined"
                            onClick={isPhotogrammetryMode ? cancelPhotogrammetry : handleCamera}
                            sx={{ 
                                color: 'black',
                                borderColor: 'black',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.04)',
                                    borderColor: 'black'
                                }
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                    
                    {isPhotogrammetryMode && capturedPhotos.length > 0 && (
                        <Box sx={{ mt: 3 }}>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                Captured: {capturedPhotos.length} photos
                            </Typography>
                            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
                                {capturedPhotos.map((photo, index) => (
                                    <Box 
                                        key={index}
                                        sx={{ 
                                            width: 40,
                                            height: 30,
                                            backgroundColor: '#4caf50',
                                            borderRadius: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <Typography variant="caption" sx={{ color: 'white', fontSize: '10px' }}>
                                            {index + 1}
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        </Box>
                    )}
                </Box>
            ) : (
                <Box sx={{ textAlign: 'center', p: 10 }}>
                    <CloudUploadIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="h6" sx={{ mb: 1 }}>
                        Drop or browse to upload your file
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        or try out our camera feature
                    </Typography>
                    
                    <Box sx={{ display: 'flex', gap: 1, mb: 1, justifyContent: 'center' }}>
                        <Button 
                            variant="outlined" 
                            size="small"
                            startIcon={<CameraAltIcon />}
                            onClick={handleCamera}
                            sx={{ 
                                color: 'black',
                                borderColor: 'black',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.04)',
                                    borderColor: 'black'
                                }
                            }}
                        >
                            Use Camera
                        </Button>
                        <Button 
                            variant="outlined" 
                            size="small"
                            component="label"
                            startIcon={<CloudUploadIcon />}
                            sx={{ 
                                color: 'black',
                                borderColor: 'black',
                                '&:hover': {
                                    backgroundColor: 'rgba(0,0,0,0.04)',
                                    borderColor: 'black'
                                }
                            }}
                        >
                            Browse Files
                            <input
                                type="file"
                                accept="image/*,.obj,.fbx,.gltf,.glb,.zip,.rar,.7z,.blend,.ma,.mb"
                                onChange={handleImageUpload}
                                style={{ display: 'none' }}
                            />
                        </Button>
                    </Box>
                </Box>
            )}
        </Paper>
    );
}