import { LoaderCircleIcon } from "lucide-react"

export default function Loading() {
  return (
    <div className='h-full w-full flex items-center justify-center'>
        <LoaderCircleIcon className="animate-spin h-10 w-10"/>
    </div>
  )
}
