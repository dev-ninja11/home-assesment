import * as React from "react"
import { useContext, useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Grid from "@mui/material/Grid"
import SearchResultList from "./PostSearchResultList"
import { RootCompContext } from "@/pages/_app"

export default function BasicGrid(props) {
  const { filteredPostsData, setFilteredPostsData } =
    useContext(RootCompContext)
  const [searchTerm, setSearchTerm] = useState(null)

  useEffect(() => {
    setFilteredPostsData(props.filteredPostsData)
  }, [props.data])

  useEffect(() => {
    setSearchTerm(props.searchTerm)
  }, [props.searchTerm])

  return (
    <>
      {props.showResults && searchTerm && filteredPostsData.length > 0 && (
        <>
          <Box
            sx={{
              width: "100%",
              maxHeight: "60vh",
              position: "relative",
              zIndex: 99,
              display: "block",
              opacity: 1.0,
              backgroundColor: "#FAFAFA",
              "&:hover": {
                backgroundColor: "#FAFAFA",
                opacity: 1.0,
              },
            }}
          >
            <Grid container spacing={1} columns={16}>
              <Grid item xs={16}>
                {Boolean(filteredPostsData) && (
                  <Box
                    style={{ margin: 1, maxHeight: "49vh", overflow: "auto" }}
                  >
                    {filteredPostsData.length > 0 && (
                      <>
                        <SearchResultList
                          key={1}
                          data={filteredPostsData}
                          handleSelectedPost={props.handleSelectedPost}
                          searchTerm={props.searchTerm}
                        />
                      </>
                    )}
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        </>
      )}
    </>
  )
}
