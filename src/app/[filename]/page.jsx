import { fetchImageData } from "../actions";
import ImageClientPage from "@/components/ImageClientPage";

const ImagePage = async ({ params }) => {
    const { filename } = params
    const image = await fetchImageData(filename)
    return (
        <>
            <ImageClientPage image={image} />
        </>
    )
}

export default ImagePage