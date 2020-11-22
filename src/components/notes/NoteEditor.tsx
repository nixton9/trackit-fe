import React, { Dispatch, SetStateAction } from 'react'
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
    display: ${props => (props.showEditor ? 'block' : 'none')};

    @media ${device.mobile} {
      .ql-formats {
        margin-right: 0.5rem;
      }
    }
  }

  .ql-container {
    min-height: ${props => (props.readMode ? 'unset' : '40vh')};
    max-height: ${props => (props.readMode ? 'unset' : '55vh')};
    overflow-y: auto;
    border: none;
    margin: ${props => props.theme.spacingXXS} 0;
    font-family: ${props => props.theme.fontFamily};
  }

  .ql-editor {
    padding: ${props => props.theme.spacingS};
  }

  .ql-snow .ql-stroke {
    stroke: ${props => props.theme.white};
  }

  .ql-snow .ql-picker-label::before {
    color: ${props => props.theme.white};
  }

  .ql-editor p {
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
  setValue?: Dispatch<SetStateAction<string>>
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  value,
  placeholder,
  readMode,
  showEditor = true,
  setValue
}) => {
  return (
    <EditorContainer readMode={readMode} showEditor={showEditor}>
      <ReactQuill value={value} onChange={setValue} placeholder={placeholder} />
    </EditorContainer>
  )
}
