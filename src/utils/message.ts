import { addToast } from "@heroui/react"
interface NotificationInterface {
  showSuccessMessage: (message: string) => void
  showErrorMessage: (message: string) => void
}
class Notification implements NotificationInterface {
  private readonly duration: number
  constructor(duration: number) {
    this.duration = duration
  }
  public showSuccessMessage = (message: string): void => {
    addToast({
      description: message,
      color: "success",
    })
  }
  public showErrorMessage = (message: string): void => {
    addToast({
      description: message,
      color: "danger",
    })
  }
}

export const notify = new Notification(4000)
