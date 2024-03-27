import * as React from "react"
import { createContext, useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"
import Head from "next/head"
import CssBaseline from "@mui/material/CssBaseline"
import { CacheProvider } from "@emotion/react"
import createEmotionCache from "../src/createEmotionCache"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import { red } from "@mui/material/colors"
import CircularProgress from "@mui/material/CircularProgress"
import Box from "@mui/material/Box"
import AppLayout from "../components/AppLayout"
import NextNProgress from "nextjs-progressbar"
import useSWR from "swr"
import "../styles/globals.css"
import { styled, keyframes } from "@mui/system"

const fetcher = (url) => fetch(url).then((res) => res.json())
const clientSideEmotionCache = createEmotionCache()

export const RootCompContext = createContext(null)
export default function MainApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  const { data, isLoading, error } = useSWR("/api/getData", fetcher)
  const [darkState, setDarkState] = useState<boolean>(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredResults, setFilteredResults] = useState<any>([])
  const [postsData, setPostsData] = useState<any>([])
  const [filteredPostsData, setFilteredPostsData] = useState<any>([])

  const [arrowKeyLateralListIndex, setArrowKeyLateralListIndex] =
    useState<number>(0)
  const [arrowKeyItemIndex, setArrowKeyItemIndex] = useState<number>(0)
  const [arrowKeyLateralItemIndex, setArrowKeyLateralItemIndex] =
    useState<number>(0)
  const [mounted, setMounted] = useState<boolean>(false)

  useEffect(() => {
    setMounted(true)
    if (data) {
      let titles = []
      data.map((item) => {
        titles.push({
          id: item.episode_id,
          title: item.title,
          director: item.director,
        })
      })
      setPostsData(titles)
    }

    return () => {}
  }, [data])

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: {
            main: "#4674c3",
          },
          secondary: {
            main: "#11cb5f",
          },
          warning: {
            main: red[300],
          },
          mode: darkState ? "dark" : "light",
        },
      }),
    [darkState]
  )

  const handleThemeChange = () => {
    setDarkState(!darkState)
  }

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "100vh",
          width: "100vw",
          position: "fixed",
          top: 0,
          left: 0,
          margin: "auto",
          overflow: "hidden",
        }}
      >
        <CircularProgress />
        <LoadingText>
          Loading
          <Dot>.</Dot>
          <Dot>.</Dot>
          <Dot>.</Dot>
        </LoadingText>
      </Box>
    )
  }

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>

      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextNProgress
          color={theme.palette.mode === "light" ? "#CD6155" : "#CD6155"}
          startPosition={0.3}
          stopDelayMs={200}
          height={10}
          showOnShallow={true}
        />
        <RootCompContext.Provider
          value={{
            postsData,
            searchTerm,
            setSearchTerm,
            filteredResults,
            setFilteredResults,
            filteredPostsData,
            setFilteredPostsData,
            arrowKeyItemIndex,
            setArrowKeyItemIndex,
            arrowKeyLateralItemIndex,
            setArrowKeyLateralItemIndex,
            arrowKeyLateralListIndex,
            setArrowKeyLateralListIndex,
          }}
        >
          <div style={{ visibility: mounted ? "visible" : "hidden" }}>
            <AppLayout
              handleThemeChange={handleThemeChange}
              darkState={darkState}
              mainPage={
                <>
                  <Component {...pageProps} />
                </>
              }
            />
          </div>
        </RootCompContext.Provider>
      </ThemeProvider>
    </CacheProvider>
  )
}

MainApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}

const blink = keyframes`
  0% { opacity: 0; }
  50% { opacity: 1; }
  100% { opacity: 0; }
`
const LoadingText = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: theme.spacing(2),
}))

const Dot = styled("span")(({ theme }) => ({
  animation: `${blink} 1.4s infinite both`,
  animationDelay: "0s, 0.2s, 0.4s",
  margin: `0 ${theme.spacing(0.2)}`,
  fontSize: "1.5rem",
  "&:nth-of-type(2)": {
    animationDelay: "0.2s",
  },
  "&:nth-of-type(3)": {
    animationDelay: "0.4s",
  },
}))
