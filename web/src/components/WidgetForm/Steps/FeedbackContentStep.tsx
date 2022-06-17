import { ArrowLeft } from "phosphor-react";
import { FormEvent, useState } from "react";
import { FeedbackType, feedbackTypes } from "..";
import { api } from "../../../lib/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { ScreenshotButton } from "../ScreenshotButton";

interface FeedbackContentStepProps {
  feedbackType: FeedbackType;
  onFeedbackRestartRequested: () => void
  onFeedbackSent: () => void
}

export function FeedbackContentStep({ feedbackType, onFeedbackRestartRequested, onFeedbackSent }: FeedbackContentStepProps) {
  const [screenshot, setScreenshot] = useState<string | null>(null)
  const [comment, setComment] = useState('')
  const [isSendingFeedback, setIsSendingFeedback] = useState(false)

  const feedbackTypeInfo = feedbackTypes[feedbackType]

  async function handleSubmitFeedback(event: FormEvent) {
    event.preventDefault();

    setIsSendingFeedback(true)

    await api.post('feedbacks', {
      type: feedbackType,
      comment,
      screenshot,
    })

    setIsSendingFeedback(false)
    onFeedbackSent()
  }

  return (
    <>
      <header>
        <button
          type="button"
          className="back-button"
          onClick={onFeedbackRestartRequested}
        >
          <ArrowLeft weight="bold" className="back-icon" />
        </button>

        <span className="title">
          <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt} />
          {feedbackTypeInfo.title}
        </span>

        <CloseButton />
      </header>
      <form onSubmit={handleSubmitFeedback} className="form">
        <textarea
          placeholder="Conte com detalhes o que está acontecendo..."
          onChange={event => setComment(event.target.value)}
        />

        <footer>
          <ScreenshotButton
            screenshot={screenshot}
            onScreenshorTook={setScreenshot}
          />
          <button
            type="submit"
            disabled={comment.length === 0 || isSendingFeedback}
            className="submit-button"
          >
            {isSendingFeedback ? <Loading /> : 'Enviar Feedback'}
          </button>
        </footer>
      </form>
    </>
  )
}