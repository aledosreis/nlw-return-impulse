import { ChatTeardropDots } from 'phosphor-react'
import { Popover } from '@headlessui/react'
import { WidgetForm } from './WidgetForm'
import './widgetStyle.css'

export function Widget() {
  return (
    <Popover className="popover">
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>

      <Popover.Button className="popover-button">
        <ChatTeardropDots className="widget-button-icon" />

        <span className="span-text">
          <span className="span-pad"></span>
          Feedback
        </span>
      </Popover.Button >
    </Popover>
  )
}