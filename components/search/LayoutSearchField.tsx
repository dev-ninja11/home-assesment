import * as React from "react"
import { useContext, useRef, useEffect, useState } from "react"
import { RootCompContext } from "@/pages/_app"
import { alpha, styled } from "@mui/material/styles"
import InputBase from "@mui/material/InputBase"
import SearchIcon from "@mui/icons-material/Search"
import ClearIcon from "@mui/icons-material/Clear"
import { Box, Stack } from "@mui/material"
import ClickAwayListener from "@mui/base/ClickAwayListener"
import SearchResultsGrid from "./SearchResultsGrid"
import DialogShowRecord from "./DialogShowRecord"

const Search = styled("div")(({ theme }) => ({
  position: "relative",

  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    width: "auto",
  },
  [theme.breakpoints.down("sm")]: {
    width: "auto",
  },
}))

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
  },
}))

const SearchClearIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 1),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 1,
  cursor: "pointer",
  zIndex: 99,
}))

interface IPostRecord {
  id: number
  title: string
  director: string
}

export default function LayoutSearchField(props) {
  var searchInputRef = useRef<HTMLInputElement>()
  const [showRecordDialog, setShowRecordDialog] = useState<boolean>(false)
  const [showResults, setShowResults] = useState(false)

  const [chosenRecord, setChosenRecord] = useState<IPostRecord | undefined>(
    undefined
  )
  const {
    searchTerm,
    setSearchTerm,
    postsData,
    setFilteredPostsData,
    filteredPostsData,
    arrowKeyItemIndex,
    setArrowKeyItemIndex,
    setSelectProduct,
  } = useContext(RootCompContext)

  const arrowUpPressed = useKeyPress("ArrowUp")
  const arrowDownPressed = useKeyPress("ArrowDown")
  const enterKeyPressed = useKeyPress("Enter")
  const [counter, setCounter] = useState(0)
  const [displaySearchTerm, setDisplaySearchTerm] = useState("")

  useEffect(() => {
    if (arrowUpPressed) {
      if (arrowKeyItemIndex > 0) {
        setCounter(counter - 1)
        setArrowKeyItemIndex(arrowKeyItemIndex - 1)
      }
      setDisplaySearchTerm(filteredPostsData[arrowKeyItemIndex].title)
    }
  }, [arrowUpPressed])

  useEffect(() => {
    if (arrowDownPressed) {
      if (arrowKeyItemIndex <= filteredPostsData.length - 2) {
        setCounter(counter + 1)
        setArrowKeyItemIndex(arrowKeyItemIndex + 1)
      }
      setDisplaySearchTerm(filteredPostsData[arrowKeyItemIndex].title)
    }
  }, [arrowDownPressed])

  useEffect(() => {
    if (enterKeyPressed) {
      const { title } = filteredPostsData[arrowKeyItemIndex]
      setChosenRecord(filteredPostsData[arrowKeyItemIndex])
      setDisplaySearchTerm(title)
      setSearchTerm(title)
      setShowResults(false)
      setShowRecordDialog(true)
    }
  }, [enterKeyPressed])

  const handleCloseRecordDialogBox = () => {
    setShowRecordDialog(false)
  }

  const handleSelectedPost = (id, title, director) => {
    const chosenRecord: IPostRecord = {
      id: id,
      title: title,
      director: director,
    }
    setChosenRecord(chosenRecord)
    setShowRecordDialog(true)
  }

  useEffect(() => {
    setArrowKeyItemIndex(0)
  }, [searchTerm])

  const handleSearchTerm = (e) => {
    const newSearchTerm = e.target.value
    setSearchTerm(newSearchTerm)

    if (!showResults) {
      setShowResults(true)
    }

    if (newSearchTerm.length === 0) {
      setFilteredPostsData([])
      return
    }

    const filteredPosts = postsData.filter((element) =>
      [element.title, element.director].some((text) =>
        text.toLowerCase().includes(newSearchTerm.toLowerCase())
      )
    )
    setFilteredPostsData(filteredPosts.slice(0, 9))
  }

  const handleOpenSearchResults = () => {
    setShowResults(true)
  }

  const handleSelectedProduct = (id) => {
    setSelectProduct(id)
    setShowResults(false)
  }

  const handleClearSearchTerm = (e) => {
    setSearchTerm("")
    setDisplaySearchTerm("")
    setFilteredPostsData([])
    searchInputRef.current.focus()
  }

  return (
    <>
      <Box
        alignContent="center"
        sx={{
          position: "absolute",
          top: "8px",
          left: "20vw",
          width: "60vw",
          zIndex: 99,
        }}
      >
        <ClickAwayListener onClickAway={() => setShowResults(false)}>
          <Box textAlign="left" sx={{ width: "100%", position: "relative" }}>
            <Stack spacing={1}>
              <Search sx={{ margin: 0 }}>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                {searchTerm.length > 0 && (
                  <SearchClearIconWrapper>
                    <ClearIcon onClick={(e) => handleClearSearchTerm(e)} />
                  </SearchClearIconWrapper>
                )}
                <StyledInputBase
                  inputRef={(input) => {
                    searchInputRef.current = input
                  }}
                  sx={{ width: "100%", paddingRight: "30px" }}
                  placeholder="Search Products"
                  inputProps={{ "aria-label": "search google maps" }}
                  onChange={(e) => handleSearchTerm(e)}
                  onFocus={() => handleOpenSearchResults()}
                  value={searchTerm}
                />
              </Search>

              <SearchResultsGrid
                handleSelectedPost={handleSelectedPost}
                showResults={showResults}
                searchTerm={searchTerm}
                handleSelectedProduct={handleSelectedProduct}
              />
            </Stack>
          </Box>
        </ClickAwayListener>
      </Box>
      {chosenRecord && (
        <DialogShowRecord
          data={chosenRecord}
          handleClose={handleCloseRecordDialogBox}
          open={showRecordDialog}
        />
      )}
    </>
  )
}

const useKeyPress = (targetKey) => {
  const [keyPressed, setKeyPressed] = useState(false)

  useEffect(() => {
    const downHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(true)
      }
    }

    const upHandler = ({ key }) => {
      if (key === targetKey) {
        setKeyPressed(false)
      }
    }

    window.addEventListener("keydown", downHandler)
    window.addEventListener("keyup", upHandler)

    return () => {
      window.removeEventListener("keydown", downHandler)
      window.removeEventListener("keyup", upHandler)
    }
  }, [targetKey])

  return keyPressed
}
