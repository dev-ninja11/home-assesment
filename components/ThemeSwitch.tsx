import * as React from "react"
import { useTheme } from "@mui/material/styles"
import Brightness4Icon from "@mui/icons-material/Brightness4"
import Brightness7Icon from "@mui/icons-material/Brightness7"
import { IconButton } from "@mui/material"

export default function ThemeSwitch(props) {
  const theme = useTheme()

  const handleChange = (event) => {
    props.handleThemeChange(event.target.checked)
  }

  return (
    <IconButton sx={{ ml: 1 }} onClick={handleChange} color="inherit">
      {theme.palette.mode === "dark" ? (
        <Brightness7Icon />
      ) : (
        <Brightness4Icon />
      )}
    </IconButton>
  )
}
