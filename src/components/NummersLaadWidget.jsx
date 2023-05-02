import * as React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { Card, CardContent, Typography, Box } from "@mui/material";

function LaadWidget() {
  return (
    <Card sx={{ width: "70%", height: "auto" }}>
      <CardContent>
        <Typography textAlign={"center"} variant="h4" p={5}>
          Nummers aan het laden...
        </Typography>
      </CardContent>
      <CardContent>
        <Box p={5}>
          <LinearProgress />
        </Box>
      </CardContent>
    </Card>
  );
}

export default LaadWidget;
