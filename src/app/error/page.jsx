import { FrownIcon } from "lucide-react"

const Error = () => {
    return (
        <div className="m-auto w-fit my-20 space-y-4 ">
            <FrownIcon className="h-10 w-10 md:h-12 md:w-12"></FrownIcon>
            <h2 className='text-xl md:text-2xl font-medium'>Something is not working now</h2>
            <h2 className='text-xl md:text-2xl font-medium'>Please, try again later</h2>
        </div>
    )
}
export default Error