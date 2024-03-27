import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import { GIT_REPO_URL } from "../constants"

function Copyright() {
  return (
    <Box sx={{ position: "absolute", bottom: 1, right: "1rem" }}>
      <Typography variant="body2" color="text.secondary" align="center">
        {"Created by Joseph © "}
        <Link color="inherit" href={GIT_REPO_URL}>
          Source Code
        </Link>{" "}
        {new Date().getFullYear()}
      </Typography>
    </Box>
  )
}

export default function Album() {
  return (
    <>
      <Container maxWidth="sm">
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Home Assesment
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          Using the React MUI library, create an App Bar with a search field
          that show results as you type.
        </Typography>
      </Container>
      <Copyright />
    </>
  )
}
