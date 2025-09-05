import { Spinner } from "@heroui/react"

const CustomLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen  absolute left-0 top-0 w-full">
      <Spinner color="primary" label="Loading..." labelColor="primary" />
    </div>
  )
}

export default CustomLoader
