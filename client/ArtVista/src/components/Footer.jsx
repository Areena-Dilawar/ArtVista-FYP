import React from "react";
import { Box, Typography, Grid, IconButton, TextField, Button } from "@mui/material";
import { Facebook, Twitter, Instagram, LinkedIn, Email, CreditCard, LocalAtm } from "@mui/icons-material";

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "black", color: "white", py: 4, px: 3 }}>
      <Grid container spacing={3} justifyContent="center">
        {/* Brand & Copyright */}
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" fontWeight="bold">ArtVista</Typography>
          <Typography variant="body2">Your Hub for Artistic Exploration & Sales</Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>© 2025 ArtVista. All Rights Reserved.</Typography>
        </Grid>

        {/* Quick Links */}
        <Grid item xs={12} sm={2}>
          <Typography variant="h6">Quick Links</Typography>
          <Typography variant="body2">Home</Typography>
          <Typography variant="body2">About</Typography>
          <Typography variant="body2">Categories</Typography>
          <Typography variant="body2">Contact</Typography>
        </Grid>

        {/* Customer Support */}
        <Grid item xs={12} sm={2}>
          <Typography variant="h6">Support</Typography>
          <Typography variant="body2">FAQs</Typography>
          <Typography variant="body2">Return Policy</Typography>
          <Typography variant="body2">Privacy Policy</Typography>
          <Typography variant="body2">Terms & Conditions</Typography>
        </Grid>

        {/* Social Media */}
        <Grid item xs={12} sm={2}>
          <Typography variant="h6">Follow Us</Typography>
          <Box mt={1}>
            <IconButton sx={{ color: "white" }}><Facebook /></IconButton>
            <IconButton sx={{ color: "white" }}><Twitter /></IconButton>
            <IconButton sx={{ color: "white" }}><Instagram /></IconButton>
            <IconButton sx={{ color: "white" }}><LinkedIn /></IconButton>
          </Box>
        </Grid>

        {/* Newsletter Signup */}
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Newsletter</Typography>
          <Box display="flex" gap={1} mt={1}>
            <TextField 
              variant="outlined" 
              size="small" 
              placeholder="Your Email" 
              sx={{ bgcolor: "white", borderRadius: 1, flexGrow: 1 }}
            />
            <Button variant="contained" color="primary">
              <Email />
            </Button>
          </Box>
        </Grid>

        {/* Payment Methods */}
        <Grid item xs={12} sm={3} textAlign="center" mt={2}>
          <Typography variant="h6">Payment Methods</Typography>
          <Box mt={1} display="flex" justifyContent="center" gap={2}>
            <IconButton sx={{ color: "white" }}>
              <LocalAtm /> {/* Cash on Delivery Icon */}
            </IconButton>
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>
            We accept Cash on Delivery 
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Footer;
