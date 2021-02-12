import React, { Dispatch, SetStateAction, useEffect } from 'react'
import ReactQuill from 'react-quill'
import styled from 'styled-components'
import { device } from '../../styles/theme'
import 'react-quill/dist/quill.snow.css'

type EditorContainerProps = {
  readMode?: boolean
  showEditor?: boolean
}

const EditorContainer = styled.div<EditorContainerProps>`
  margin-top: ${props => props.theme.spacingS};

  .ql-toolbar {
    border: 2px solid ${props => props.theme.white};
    border-radius: ${props => props.theme.smallBorderRadius};
    display: ${props => (props.showEditor ? 'flex' : 'none')};
    align-items: center;
    flex-wrap: wrap;
    width: auto;
    margin: 0 auto;

    @media ${device.mobile} {
      .ql-formats {
        margin-right: 0.5rem;
      }
    }

    @media ${device.mobileS} {
      .ql-formats .ql-picker.ql-header {
        width: 80px;

        .ql-picker-label {
          font-size: 1.5rem;
        }
      }

      .ql-formats button {
        width: 24px;

        svg {
          width: 2rem;
        }
      }
    }

    @media ${device.mobileXS} {
      .ql-formats .ql-picker.ql-header {
        width: 75px;

        .ql-picker-label {
          font-size: 1.4rem;
        }
      }

      .ql-formats button {
        width: 20px;

        svg {
          width: 1.8rem;
        }
      }
    }
  }

  .ql-container {
    -webkit-overflow-scrolling: touch;
    overflow-y: auto;
    border: none;
    margin: ${props => props.theme.spacingXXS} 0;
    font-family: ${props => props.theme.fontFamily};
    min-height: 200px;
    max-height: 40vh;
  }

  .ql-editor {
    padding: ${props => props.theme.spacingXS};
  }

  .ql-snow .ql-stroke {
    stroke: ${props => props.theme.white};
  }

  .ql-snow .ql-picker-label::before {
    color: ${props => props.theme.white};
  }

  .ql-editor ul {
    padding-left: 0;
  }

  .ql-editor p,
  .ql-editor li {
    color: ${props => props.theme.white};
    font-size: 1.6rem;
    line-height: 3rem;
    font-weight: ${props =>
      props.readMode ? props.theme.fontRegular : props.theme.fontLight};
  }

  .ql-editor.ql-blank::before {
    left: ${props => props.theme.spacingS};
    color: ${props => props.theme.white};
    font-size: 1.7rem;
    font-weight: ${props => props.theme.fontLight};
    font-style: normal;
    opacity: 0.8;
  }
`

type NoteEditorProps = {
  value: string
  placeholder?: string
  readMode?: boolean
  showEditor?: boolean
  onDrawer?: boolean
  editorRef?: React.Ref<any>
  setValue?: Dispatch<SetStateAction<string>>
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  value,
  placeholder,
  readMode,
  showEditor = true,
  onDrawer,
  editorRef,
  setValue
}) => {
  const listenerOptions = {
    capture: false,
    passive: false
  }

  const preventInertiaScroll = (e: any) => {
    const top = e.scrollTop
    const totalScroll = e.scrollHeight
    const currentScroll = top + e.offsetHeight
    if (top === 0) {
      e.scrollTop = 1
    } else if (currentScroll === totalScroll) {
      e.scrollTop = top - 1
    }
  }

  const allowTouchMove = (e: any) => {
    const target = e.currentTarget
    if (target.scrollHeight > target.clientHeight) {
      e.stopPropagation()
      return true
    }

    e.preventDefault()
    return false
  }

  useEffect(() => {
    const editor = document.querySelector('.ql-container')
    const vh = Math.max(
      document.documentElement.clientHeight || 0,
      window.innerHeight || 0
    )
    const gap = onDrawer ? 150 : 40

    if (editor) {
      // @ts-ignore
      editor.style.maxHeight = `${vh - editor.offsetTop - gap}px`
    }
  })

  useEffect(() => {
    const editor = document.querySelector('.ql-container')
    editor?.addEventListener(
      'touchstart',
      preventInertiaScroll,
      listenerOptions
    )

    editor?.addEventListener('touchmove', allowTouchMove, listenerOptions)
  }, [listenerOptions])

  return (
    <EditorContainer
      readMode={readMode}
      showEditor={showEditor}
      className="editor-container"
    >
      <ReactQuill
        value={value}
        onChange={setValue}
        placeholder={placeholder}
        ref={editorRef}
      />
    </EditorContainer>
  )
}
