import { MemberType } from "@namelessnerd/quantifiedante"

const DropDownMember = ({ member, paused }: { member: MemberType; paused?: boolean }) => {
  const colors: Record<MemberType, string> = {
    "No Plan": "bg-[#F8F8F8] text-black",
    "Professional Membership Plan": `${paused ? "bg-proBadgeBg text-proBadgeText" : "bg-cyanCustom text-white"}`,
    "Novice Membership Plan": `${paused ? "bg-greenLight text-greenSurface" : "bg-greenSurface text-white"}`,
    "Elite Membership Plan": paused ? "bg-eliteBadge text-eliteBadgeText" : "text-white bg-orangeElite",
  }

  const images: Record<MemberType, string> = {
    "No Plan": "",
    "Professional Membership Plan": paused
      ? "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/dashboard/quantified-ante-prefessional-membership-plan-paused-icon.svg"
      : "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/dashboard/pro.svg",
    "Novice Membership Plan": paused
      ? "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/dashboard/novicePaused.svg"
      : "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/dashboard/novice.svg",
    "Elite Membership Plan": paused
      ? "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/dashboard/quantified-ante-elite-membership-plan-paused-icon.svg"
      : "https://Quantified-Ante.b-cdn.net/Dashboard%20Images/images/dashboard/elite.svg",
  }

  return (
    <button
      className={`w-full  px-2 py-2 rounded-t-sm text-xs font-medium ${colors[member]} w-auto flex items-center gap-3`}
    >
      {member !== "No Plan" && <img alt={member} src={images[member]} width={19} />}
      {member === "No Plan" ? "No Membership Plan" : member} {member !== "No Plan" && paused && " - paused"}
    </button>
  )
}

export default DropDownMember
