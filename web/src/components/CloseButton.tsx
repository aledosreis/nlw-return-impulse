import { Popover } from "@headlessui/react";
import { X } from "phosphor-react";

export function CloseButton() {
  return (
    <Popover.Button className="close-button" title="Fechar formulário de Feedback">
      <X weight="bold" className="close-icon" />
    </Popover.Button>
  )
}