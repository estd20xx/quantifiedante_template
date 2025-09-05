import { cn } from "../lib/utils"
import AskSolonModal from "./AskSolonModal"

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
        `z-99 flex mt-6 sm:mt-8 md:mt-10 flex-col-reverse lg:flex-row justify-between items-center rounded-xl sm:rounded-2xl px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:p-16 lg:mx-[103px] md:mx-[103px] mx-4 ${
          isLight ? "bg-graySkeleton border border-grayBorder text-black" : "bg-darkCyanBackground text-white"
        }`,
        className,
      )}
    >
      <div className="w-full lg:w-1/2 flex flex-col items-start gap-4 sm:gap-6 mt-4 sm:mt-6 lg:mt-0">
        <h3 className="text-2xl sm:text-3xl md:text-4xl font-medium leading-tight">{heading}</h3>
        <p className="text-sm sm:text-base font-normal leading-relaxed">{description}</p>
        <AskSolonModal buttonText={buttonText} />
        {/* <GloballyButton size="large">{buttonText}</GloballyButton> */}
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center lg:justify-end">
        <div className="w-[200px] sm:w-[250px] md:w-[280px] lg:w-[320px] h-[200px] sm:h-[250px] md:h-[280px] lg:h-[320px] rounded-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            src="https://Quantified-Ante.b-cdn.net/Dashboard%20Images/AI_girl.mp4"
          />
        </div>
      </div>
    </div>
  )
}

export default AskSloan
