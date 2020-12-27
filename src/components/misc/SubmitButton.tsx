import React from 'react'
import { ReactComponent as ChevronIcon } from '../../assets/icons/chevron.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as CheckIcon } from '../../assets/icons/transpcheck.svg'
import { Styled } from '../../styles/Add.styles'

export enum IconType {
  PLUS = 'PLUS',
  CHECK = 'CHECK'
}

type SubmitButtonProps = {
  icon?: IconType
  handleSubmit?: () => void
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  icon,
  handleSubmit
}) => {
  let buttonIcon
  switch (icon) {
    case IconType.PLUS:
      buttonIcon = <PlusIcon />
      break

    case IconType.CHECK:
      buttonIcon = <CheckIcon />
      break

    default:
      buttonIcon = <ChevronIcon />
  }

  return (
    <Styled.AddWidget__Button
      onClick={handleSubmit}
      data-test-id="submit-btn"
      rotateIcon={!Boolean(icon)}
    >
      {buttonIcon}
    </Styled.AddWidget__Button>
  )
}
