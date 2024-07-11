import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="#">
        Honis
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export default function StickyFooter() {
  return (
    <Paper elevation={10}>
      <Box
        component="footer"
        sx={{
          textAlign: "center",
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: "rgba(252, 211, 77,0.8)",
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
      </Box>
    </Paper>
  );
}
