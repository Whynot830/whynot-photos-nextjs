import { fetchImages } from "@/app/actions"
import Gallery from "@/components/Gallery"

const Home = async () => {
  const images = await fetchImages()
  return (
    <Gallery images={images} />
  )
}
export default Home