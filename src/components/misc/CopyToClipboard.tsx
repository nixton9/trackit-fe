import React, { useRef } from 'react'
import styled from 'styled-components'

const TextArea = styled.textarea`
  position: absolute;
  top: -9999px;
  left: -9999px;
  opacity: 0;
`

type CopyToClipboardProps = {
  text: string
  onCopy: () => void
}

export const CopyToClipboard: React.FC<CopyToClipboardProps> = ({
  text,
  onCopy
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const copyToClipboard = (e: React.MouseEvent<HTMLDivElement>) => {
    textAreaRef.current?.select()
    document.execCommand('copy')
    onCopy()
  }

  return (
    <>
      <div onClick={copyToClipboard}>Copy text</div>
      <TextArea ref={textAreaRef} value={text} onChange={() => null} />
    </>
  )
}
