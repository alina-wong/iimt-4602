"use client";

import { Box, Card, CardActionArea, CardMedia, CardContent, Typography, Grid} from "@mui/material";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import FilterButton from "./components/FilterButton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./globals.css";

//i use mock data for the nfts for now
export default function Home() {
  const router = useRouter();
  const items = [
    { id: 1, name: "Gungnir", price: "1.2 ETH", img: "/MockNfts/nft1.png" },
    { id: 2, name: "Green Energy", price: "0.5 ETH", img: "/MockNfts/nft2.png" },
    { id: 3, name: "Crakow!", price: "2.0 ETH", img: "/MockNfts/nft3.png" },
    { id: 4, name: "Asiimov", price: "3.1 ETH", img: "/MockNfts/nft4.png" },
    { id: 5, name: "Chromatic abberation", price: "0.8 ETH", img: "/MockNfts/nft5.png" },
  ];
//possibility to add a search bar & filter later?
  const gridItems = [
    { id: 6, name: "StatTrak", price: "0.8 ETH", img: "/MockNfts/nft6.png" },
    { id: 7, name: "Dragon Lore", price: "1.5 ETH", img: "/MockNfts/nft7.png" },
    { id: 8, name: "Karambit", price: "2.2 ETH", img: "/MockNfts/nft8.png" },
    { id: 9, name: "Aerial", price: "0.9 ETH", img: "/MockNfts/nft9.png" },
    { id: 10, name: "Neon Rider", price: "3.0 ETH", img: "/MockNfts/nft10.png" },
  ];

  const settings = {
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "150px",
    focusOnSelect: true,
    speed: 350,
    responsive: [
      { breakpoint: 960, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <>
      <FilterButton />
      
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Popular this week
        </Typography>

      <Slider {...settings}>
        {items.map((item, index) => (
          <Box key={index} sx={{ px: 1 }}>
            <Card
              sx={{
                backgroundColor: "background.paper",
                transition: "transform 0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <CardActionArea onClick={() => router.push(`/product/${item.id}`)}>
                <CardMedia
                  component="img"
                  height="75"
                  image={item.img}
                  alt={item.name}
                />
                <CardContent>
                  <Typography variant="subtitle1" sx={{ fontWeight: 70 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 700 }}>
                    {item.price}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Box>
        ))}
      </Slider>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          More NFTs
        </Typography>
        <Grid container spacing={2}>
          {gridItems.map((item, index) => (
            <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
              <Card
                sx={{
                  px: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  
                  "&:hover": { transform: "scale(1.03)", transition: "transform 0.3s" },
                }}
              >
                <CardActionArea 
                  sx={{ height: "100%" }}
                  onClick={() => router.push(`/product/${item.id}`)}
                >
                  <CardMedia
                    component="img"
                    image={item.img}
                    alt={item.name}
                    sx={{ width: "100%", height: 140, objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 70 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {item.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
    </>
  );
}
