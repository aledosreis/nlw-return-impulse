import html2canvas from "html2canvas";
import { Camera, Trash } from "phosphor-react";
import { useState } from "react";
import { Loading } from "../Loading";

interface ScreenshotButtonProps {
  screenshot: string | null;
  onScreenshorTook: (screenshot: string | null) => void;
}

export function ScreenshotButton({ screenshot, onScreenshorTook }: ScreenshotButtonProps) {
  const [isTakingScreenshot, setIsTakingScreenshot] = useState(false)

  async function handleTakeScreenshot() {
    setIsTakingScreenshot(true)

    const canvas = await html2canvas(document.querySelector('html')!)
    const base64image = canvas.toDataURL('image/png')

    onScreenshorTook(base64image)
    setIsTakingScreenshot(false)
  }

  if (screenshot) {
    return (
      <button
        type="button"
        className="screenshot-taken"
        onClick={() => onScreenshorTook(null)}
        style={{
          backgroundImage: `url(${screenshot})`,
          backgroundPosition: 'top center',
          backgroundSize: 180,
        }}
      >
        <Trash weight="fill" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleTakeScreenshot}
      className="take-screenshot"
    >
      {isTakingScreenshot ? <Loading /> : <Camera className="camera-icon" />}
    </button>
  )
}