import * as React from "react"
import { useState, useEffect } from "react"
import List from "@mui/material/List"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import { useContext } from "react"
import { RootCompContext } from "@/pages/_app"
import { Typography, Box } from "@mui/material"
import Highlighter from "react-highlight-words"
import { AdvancedImage } from "@cloudinary/react"
import { Cloudinary } from "@cloudinary/url-gen"
import { fill } from "@cloudinary/url-gen/actions/resize"
import { CLOUND_NAME } from "../../constants"

export default function PostSearchResultList(props) {
  const [searchTerms, setSearchTerms] = useState<string[]>([])
  const {
    searchTerm,
    filteredPostsData,
    maxRecordsReturned,
    arrowKeyItemIndex,
    arrowKeyLateralListIndex,
  } = useContext(RootCompContext)

  useEffect(() => {
    let searchStr: string[] = []
    searchStr.push(`${props.searchTerm}`)

    setSearchTerms(searchStr)
  }, [props.searchTerm])

  const cld = new Cloudinary({
    cloud: {
      cloudName: CLOUND_NAME,
    },
  })

  return (
    <>
      {filteredPostsData.length > 0 && searchTerm.length > 0 && (
        <>
          <Typography variant="subtitle1" sx={{ mt: 2, ml: 2, color: "black" }}>
            Search Results: {filteredPostsData.length || 0}
          </Typography>

          <List
            sx={{
              width: "100%",
              maxWidth: "100%",
              bgcolor: "background.paper",
            }}
          >
            {filteredPostsData
              .slice(0, maxRecordsReturned)
              .map((item, index) => (
                <ListItemButton
                  key={item.id}
                  sx={{
                    py: 0,
                    minHeight: 42,
                    color: "rgba(5,5,5,.8)",
                    marginBottom: "8px",
                    bgcolor:
                      arrowKeyLateralListIndex === 0 &&
                      arrowKeyItemIndex === index
                        ? "#EFEFEF"
                        : "background.paper",
                  }}
                  onClick={() =>
                    props.handleSelectedPost(item.id, item.title, item.director)
                  }
                >
                  <ListItemIcon sx={{ color: "inherit" }}>
                    <AdvancedImage
                      cldImg={cld
                        .image(`starwars/${item.id}`)
                        .resize(fill().width(100).height(150))}
                    />
                  </ListItemIcon>

                  <Box style={{ paddingLeft: "1rem" }}>
                    <Typography
                      component="div"
                      sx={{ color: "black", fontSize: 18, fontFamily: "Lato" }}
                    >
                      <Highlighter
                        searchWords={searchTerms}
                        autoEscape={true}
                        textToHighlight={`${item.title}`}
                      />
                    </Typography>
                    <Typography
                      component="div"
                      sx={{ color: "grey", marginTop: "0.5rem" }}
                    >
                      <Highlighter
                        searchWords={searchTerms}
                        autoEscape={true}
                        textToHighlight={`${item.director}`}
                      />
                    </Typography>
                  </Box>
                </ListItemButton>
              ))}
          </List>
        </>
      )}
    </>
  )
}
