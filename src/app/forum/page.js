"use client";

import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Typography, Card, CardMedia, CardContent, Avatar, IconButton } from "@mui/material";
import Header from "../components/Header";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import { useState } from 'react';


const subforums = [
  { name: "Creators Hub", icon: "🛠️" },
  { name: "Minecraft Mods", icon: "🧩" },
  { name: "NFT Projects", icon: "🎨" },
  { name: "General Discussion", icon: "💬" }
];

const initialPosts = [
  {
    id: 1,
    title: 'Showcase: My First NFT Collection!',
    content: 'Excited to share my first NFT collection with the community! Feedback welcome.',
    upvotes: 12,
    downvotes: 1,
    comments: 3,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    title: 'Looking for Collaborators',
    content: "Anyone interested in collaborating on a Minecraft mod? Let's connect!",
    upvotes: 8,
    downvotes: 0,
    comments: 2,
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
];

export default function ForumPage() {
  const [posts, setPosts] = useState(initialPosts);

  const handleUpvote = (postId) => {
    setPosts((prev) => prev.map(post => post.id === postId ? { ...post, upvotes: post.upvotes + 1 } : post));
  };
  const handleDownvote = (postId) => {
    setPosts((prev) => prev.map(post => post.id === postId ? { ...post, downvotes: post.downvotes + 1 } : post));
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", background: "#f5f5f5" }}>
      <Header />
      <Box component="nav" sx={{ width: { sm: 240 }, flexShrink: { sm: 0 }, mt: 8 }}>
        <Drawer
          variant="permanent"
          sx={{
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
              top: 64,
              height: 'calc(100vh - 64px)'
            },
          }}
          open
        >
          <Box sx={{ overflowY: 'auto', height: '100%' }}>
            <Typography variant="h6" sx={{ p: 2, fontWeight: 700 }}>
              Forums
            </Typography>
            <List>
              {subforums.map((forum) => (
                <ListItemButton key={forum.name}>
                  <ListItemIcon sx={{ minWidth: 36, fontSize: 22 }}>{forum.icon}</ListItemIcon>
                  <ListItemText primary={forum.name} primaryTypographyProps={{ fontSize: '1.05rem' }} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
      <Box className="main-content" sx={{ flexGrow: 1, mt: 8, p: 3 }}>
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }}>
          Creators Hub
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 800, mx: 'auto', width: '100%' }}>
          {posts.map((post) => (
            <Card key={post.id} sx={{ mb: 2 }}>
              {post.image && (
                <CardMedia
                  component="img"
                  image={post.image}
                  alt={post.title}
                  sx={{ width: '100%', maxHeight: 320, objectFit: 'cover' }}
                />
              )}
              <CardContent>
                <Typography variant="h6" component="div">{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">{post.content}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                  <IconButton onClick={() => handleUpvote(post.id)}>
                    <ThumbUpIcon />
                  </IconButton>
                  <Typography sx={{ minWidth: 24 }}>{post.upvotes}</Typography>
                  <IconButton onClick={() => handleDownvote(post.id)}>
                    <ThumbDownIcon />
                  </IconButton>
                  <Typography sx={{ minWidth: 24 }}>{post.downvotes}</Typography>
                  <IconButton>
                    <CommentIcon />
                  </IconButton>
                  <Typography sx={{ minWidth: 24 }}>{post.comments}</Typography>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
