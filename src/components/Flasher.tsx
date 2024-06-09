import useUpdateFlash from "../utils/useUpdateFlash"

type Props = {
  className?: string
  children?: React.ReactNode
  flashColor?: string
  customTrigger?: any[]
  shadowType?: "text" | "box"
}
export default function Flasher({ className = "", children, flashColor = "#FFFFFF", customTrigger, shadowType = "text" }: Props) {
  const ref = useUpdateFlash(customTrigger ?? [children], flashColor, shadowType)

  return (
    <div ref={ref} className={className}>{children}</div>
  )
}
