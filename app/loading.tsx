import { LoaderCircleIcon } from "lucide-react"

export default function Loading() {
  return (
    <div className='h-[80vh] w-full flex items-center justify-center'>
        <LoaderCircleIcon className="animate-spin h-15 w-15"/>
    </div>
  )
}
