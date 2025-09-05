import AskSolonModal from "./common/AskSlonModal"

import { cn } from "@/lib/utils"

interface AskSloanProps {
  variant?: "light" | "dark"
  heading?: string
  description?: string
  buttonText?: string
  className?: string
}

const AskSloan: React.FC<AskSloanProps> = ({
  variant = "dark",
  heading = "Ask Sloan: Your Interactive Trading Assistant",
  description = "Curious about how our tools drive your success? Sloan is here to guide you every step of the way.",
  buttonText = "So Sloan, Tell Me",
  className,
}) => {
  const isLight = variant === "light"

  return (
    <div
      className={cn(
        `z-99 flex mt-10 md:mt-0 flex-col-reverse lg:flex-row justify-between items-center rounded-2xl px-4 py-14 md:p-12 lg:p-16 ${
          isLight ? "bg-graySkeleton border border-grayBorder text-black" : "bg-darkCyanBackground text-white"
        }`,
        className,
      )}
    >
      <div className="w-full lg:w-1/2 flex flex-col items-start gap-6 mt-6 lg:mt-0">
        <h3 className="text-[28px] font-medium md:text-left lg:text-left">{heading}</h3>
        <p className="text-base font-normal  md:text-left lg:text-left">{description}</p>
        <AskSolonModal buttonText={buttonText} />
        {/* <GloballyButton size="large">{buttonText}</GloballyButton> */}
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
        <div className="lg:w-[320px] lg:h-[320px] h-[308px] w-[308px] rounded-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            src="/sloan-for-quantified-ante-video-smart-money-concepts-support-assistance.mp4"
          />
        </div>
      </div>
    </div>
  )
}

export default AskSloan
