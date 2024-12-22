import { Container, Grid, Link, Typography } from "@mui/material";
import Copyright from "../utils/copyright"; // Pastikan ini default export jika tidak gunakan { Copyright }
import { footers } from "../data/footers"; // Pastikan footers adalah array dengan objek yang sesuai

export function Footer() {
  return (
    <Container
      maxWidth="md"
      component="footer"
      sx={{
        borderTop: (theme) => `1px solid ${theme.palette.divider}`,
        mt: 8,
        py: [3, 6],
      }}
    >
      <Grid container spacing={4} justifyContent="space-evenly">
        {footers && footers.length > 0 ? (
          footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            No footer data available.
          </Typography>
        )}
      </Grid>
      <Copyright sx={{ mt: 5 }} /> {/* Pastikan ini adalah komponen valid */}
    </Container>
  );
}
