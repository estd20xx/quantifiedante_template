import { useAppDispatch } from "../../hooks/main"
import { openModal } from "../../store/slices/customModal/modal.slice.ts"

function ComponentLock({ image, title, desc, hideButton = false }) {
  const dispatch = useAppDispatch()
  return (
    <>
      <div className="w-full bg-white mt-8 shadow-sm py-5 dark:bg-[#10123199] backdrop-blur-2xl rounded-2xl overflow-hidden relative top-0 left-0 z-200 flex justify-center items-center" style={{ height: "450px" }}>
        <div className="flex flex-col justify-center items-center gap-8 h-[315px] w-[360px]">
          <div className="min-h-[101px] min-w-[186px]  max-h-[101px] w-full flex items-center justify-center">
            <img
              src={image || "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/lock.svg"}
              alt="Locked"
              className="h-full object-cover"
            />
          </div>
          <div className="w-full flex items-center justify-center flex-col gap-3">
            <p className="text-2xl font-semibold leading-7">{hideButton ? "Coming Soon" : "This Feature is Locked"}</p>
            <p className="font-normal text-sm leading-[22px] text-center">{desc}</p>
          </div>
          {!hideButton && (
            <button
              className="font-semibold text-sm leading-5 tracking-wide bg-backgroundBlue py-3 px-4 text-white rounded-md hover:opacity-70 duration-300"
              onClick={() => dispatch(openModal())}
            >
              Upgrade My Plan
            </button>
          )}
        </div>
      </div>


    </>
  )
}

export default ComponentLock