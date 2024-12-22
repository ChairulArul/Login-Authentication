import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import { tiers } from "../data/tiers";
import StarIcon from "@mui/icons-material/Star";
import Rating from "@mui/material/Rating";
import DenseTable from "../data/table";
import AlertDialog from "../data/dialog";
import StandardImageList from "./Image";

export function PricingPlan() {
  return (
    <Container maxWidth="md" component="main">
      <Grid container spacing={5} alignItems="flex-end">
        {tiers.map((tier) => (
          <Grid
            item
            key={tier.title}
            xs={12}
            sm={tier.title === "Enterprise" ? 12 : 6}
            md={4}
            style={{ marginBottom: "30px" }}
          >
            <Card>
              <CardHeader
                title={tier.title}
                subheader={tier.subheader}
                titleTypographyProps={{ align: "center" }}
                action={tier.title === "Pro" ? <StarIcon /> : null}
                subheaderTypographyProps={{
                  align: "center",
                }}
                sx={{
                  backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                      ? theme.palette.grey[200]
                      : theme.palette.grey[700],
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "baseline",
                    mb: 2,
                  }}
                >
                  <Typography component="h2" variant="h3" color="text.primary">
                    ${tier.price}
                  </Typography>
                  <Typography variant="h6" color="text.secondary">
                    /mo
                  </Typography>
                </Box>
                <ul>
                  {tier.description.map((line) => (
                    <Typography
                      component="li"
                      variant="subtitle1"
                      align="center"
                      key={line}
                    >
                      {line}
                    </Typography>
                  ))}
                </ul>
              </CardContent>
              <CardActions>
                <Button fullWidth variant={tier.buttonVariant}>
                  {tier.buttonText}
                </Button>
              </CardActions>
              <Rating
                name="half-rating"
                defaultValue={2.5}
                precision={0.5}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  display: "flex",
                  margin: "auto",
                  padding: "10px",
                  width: "50%",
                }}
              />
            </Card>
          </Grid>
        ))}
      </Grid>
      <DenseTable />
      <AlertDialog />
      <StandardImageList />
    </Container>
  );
}
