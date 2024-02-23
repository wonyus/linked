import { Button, Card, CardActions, CardContent, Typography } from "@mui/material";

export default function Denied() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Word of the Day
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
      </CardContent>
      <CardActions>
        <Button href="/" size="small">
          Return to Home Page
        </Button>
      </CardActions>
    </Card>
  );
}
