import { useAppDispatch } from "../../hooks/main"
import { openModal } from "../../store/slices/customModal/modal.slice"

const SetupLock = ({
  image,
  desc,
  hideButton = false,
}: {
  image: string
  desc?: string
  hideButton?: boolean
}) => {
  const dispatch = useAppDispatch()

  return (
    <div
      className="w-full bg-[#F2F2F299] dark:bg-[#10123199] backdrop-blur-lg relative -top-20 left-0 z-1000 flex justify-center items-center"
      style={{ height: "100vh" }}
    >
      <div className="flex flex-col justify-center items-center gap-4 sm:gap-6 md:gap-8 h-[280px] sm:h-[300px] md:h-[315px] w-[320px] sm:w-[340px] md:w-[360px] px-4 sm:px-0">
        <div className="min-h-[80px] sm:min-h-[90px] md:min-h-[101px] min-w-[150px] sm:min-w-[170px] md:min-w-[186px] max-h-[80px] sm:max-h-[90px] md:max-h-[101px] w-full flex items-center justify-center">
          <img
            alt="Locked"
            className="h-full w-auto object-contain"
            src={image || "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock.svg"}
          />
        </div>
        <div className="w-full flex items-center justify-center flex-col gap-2 sm:gap-3">
          <p className="text-lg sm:text-xl md:text-2xl font-semibold leading-6 sm:leading-7 text-center px-2">
            {hideButton ? "Coming Soon" : "This Feature is Locked"}
          </p>
          <p className="font-normal text-xs sm:text-sm leading-[18px] sm:leading-[22px] text-center px-2">
            {desc}
          </p>
        </div>
        {!hideButton && (
          <button
            className="font-semibold text-xs sm:text-sm leading-5 tracking-wide bg-backgroundBlue py-2.5 sm:py-3 px-3 sm:px-4 text-white rounded-md hover:opacity-70 duration-300 w-full sm:w-auto"
            onClick={() => dispatch(openModal())}
          >
            Upgrade My Plan
          </button>
        )}
      </div>
    </div>
  )
}

export default SetupLock
