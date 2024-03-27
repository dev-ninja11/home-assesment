import Toolbar from "@mui/material/Toolbar"
import MuiAppBar from "@mui/material/AppBar"
import Container from "@mui/material/Container"
import { styled } from "@mui/material/styles"
import LayoutSearchField from "./search/LayoutSearchField"

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(1),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}))

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}))

export default function AppLayout(props) {
  return (
    <>
      <MuiAppBar position="fixed" sx={{ height: "56px" }}>
        <Toolbar>
          <LayoutSearchField />
        </Toolbar>
      </MuiAppBar>

      <Main>
        <DrawerHeader />
        <Container sx={{ marginTop: "10px" }}>{props.mainPage}</Container>
      </Main>
    </>
  )
}
