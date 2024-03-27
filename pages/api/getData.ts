import axios from "axios"
import { API_URL } from "../../constants"

export default async function handler(req, res) {
  try {
    const response = await axios.get(API_URL)
    const postData = response.data.results
    res.status(200).json(postData)
  } catch (err) {
    return res.json({ error: err })
  }
}
