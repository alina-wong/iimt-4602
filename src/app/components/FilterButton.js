import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

const images = [
    {
        url: 'https://images.unsplash.com/photo-1598776454302-94acd47baaa8?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Skins',
        width: '33.333%',
    },
    {
        url: 'https://images.unsplash.com/photo-1678034845457-0aa59891d6c9?q=80&w=1624&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: 'Mods',
        width: '33.333%',
    },
    {
        url: 'https://images.unsplash.com/photo-1683089598416-24ecf70305b1?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        title: '3D Objects',
        width: '33.333%',
    },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 250,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important',
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
        },
        '& .MuiTypography-root': {
            border: '4px solid currentColor',
        },
    },
}));

const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: '50%',
    transform: 'translateX(-50%)',
    transition: theme.transitions.create('opacity'),
}));

export default function ButtonBaseDemo() {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            {images.map((image) => (
                <ImageButton
                    focusRipple
                    key={image.title}
                    style={{
                        width: image.width,
                    }}
                >
                    <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                    <ImageBackdrop className="MuiImageBackdrop-root" />
                    <Image>
                        <Typography
                            component="span"
                            variant="subtitle1"
                            color="inherit"
                            sx={(theme) => ({
                                position: 'relative',
                                p: 4,
                                pt: 2,
                                pb: `calc(${theme.spacing(1)} + 6px)`,
                                fontWeight: 'bold',
                            })}
                        >
                            {image.title}
                            <ImageMarked className="MuiImageMarked-root" />
                        </Typography>
                    </Image>
                </ImageButton>
            ))}
        </Box>
    );
}
