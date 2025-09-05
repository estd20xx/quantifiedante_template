import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"
import React, { useEffect } from "react"

import CloseButton from "./common/CloseButton"
import CustomisedButton from "./common/CustomisedButton"
import { ButtonSize } from "./GloballyButton"

interface AskSolonEmbedProps {
  width?: string
  height?: string
  className?: string
  loading?: "eager" | "lazy"
  allow?: string
  buttonText: string
  size?: ButtonSize
}

const AskSolonModal: React.FC<AskSolonEmbedProps> = ({
  width = "100%",
  height = "600px",
  className = "formless-embed w-full",
  loading = "lazy",
  allow = "microphone",
  buttonText = "So Sloan, Tell Me",
  size = "large",
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    const script = document.createElement("script")

    script.src = "https://embed.formless.ai/embed.js"
    script.async = true
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <CustomisedButton variant="filled" size={size} onClick={onOpen}>
        {buttonText}
      </CustomisedButton>
      <Modal
        backdrop={"blur"}
        className=""
        classNames={{
          wrapper: "z-9999999 flex items-center p-0 ",
          backdrop: "backdrop-classes z-9999999 p-0",
          closeButton: "close-button-classes hidden",
        }}
        isOpen={isOpen}
        placement="top-center"
        size={"5xl"}
        onOpenChange={onOpenChange}
      >
        <ModalContent className=" relative">
          {(onClose) => (
            <>
              <ModalHeader className=" absolute top-0 text-black font-normal right-0">
                <CloseButton
                  iconClass="text-white text-white border-white"
                  parentClass="text-white"
                  onClose={onClose}
                />
              </ModalHeader>
              <ModalBody className="p-0">
                <iframe
                  allow={allow}
                  className={className}
                  height={height}
                  id={"ask-solon"}
                  loading={loading}
                  src={"https://formless.ai/c/UuFPcIDFsmb7"}
                  title={`Ask Solon`}
                  width={width}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}

export default AskSolonModal
