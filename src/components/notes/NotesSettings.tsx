import React, { useState, useEffect, Dispatch, SetStateAction } from 'react'
import Drawer from '../misc/Drawer'
import { TagChip } from './TagChip'
import { TagEditor } from './TagEditor'
import { SelectMenu } from '../misc/SelectMenu'
import { NotificationTypes, notificationState } from '../misc/Notification'
import { alertState } from '../misc/Alert'
import { Styled } from '../../styles/Settings.styles'
import { TAGS, NOTES } from '../../utils/queries'
import { useToggleElement } from '../../utils/useToggleElement'
import { ReactComponent as SettingsIcon } from '../../assets/icons/settings.svg'
import { ReactComponent as PlusIcon } from '../../assets/icons/plus.svg'
import { ReactComponent as MinusIcon } from '../../assets/icons/minus.svg'
import { NoteTag } from '../../utils/ModuleTypes'
import { SortBySettings, sortByOptions } from '../../utils/SettingsTypes'
import { useSetRecoilState } from 'recoil'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useHistory } from 'react-router-dom'

const DELETE_TAG = gql`
  mutation DeleteTag($id: ID!) {
    deleteTag(id: $id) {
      id_tag
    }
  }
`

type NotesSettingsProps = {
  tags: NoteTag[]
  sortBy: string
  setSortBy: Dispatch<SetStateAction<SortBySettings>>
}

const NotesSettings: React.FC<NotesSettingsProps> = ({
  tags,
  sortBy,
  setSortBy
}) => {
  const [showTagEditor, setShowTagEditor] = useState(false)
  const [activeTag, setActiveTag] = useState<NoteTag | null>(null)

  const setNotification = useSetRecoilState(notificationState)
  const setAlert = useSetRecoilState(alertState)

  const history = useHistory()

  const [open, setOpen, overlayEl] = useToggleElement(() =>
    setShowTagEditor(false)
  )

  const { refetch: refetchTags } = useQuery(TAGS, {
    fetchPolicy: 'network-only'
  })
  const { refetch: refetchNotes } = useQuery(NOTES)

  const [deleteTag] = useMutation(DELETE_TAG)

  const handleSortByChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setSortBy(e.target.value as SortBySettings)

  const handleTagClick = (tag: NoteTag) => {
    setActiveTag(tag)
    setShowTagEditor(true)
  }

  const handlePlusClick = () => {
    if (showTagEditor) {
      setShowTagEditor(false)
    } else {
      setActiveTag(null)
      setShowTagEditor(true)
    }
  }

  const handleDeleteTag = (tagId: string | number, tagName: string) => {
    deleteTag({
      variables: {
        id: tagId
      }
    })
      .then(res => {
        setNotification({
          text: `Tag '${tagName}' was deleted`,
          type: NotificationTypes.Success
        })
        refetchTags()
        refetchNotes()
      })
      .catch(err =>
        setNotification({
          text: 'There was a problem, please try again',
          type: NotificationTypes.Error
        })
      )
  }

  const handleDeleteTagConfirm = (tagId: string | number, tagName: string) => {
    setShowTagEditor(false)
    setAlert({
      text: 'This tag will be removed.',
      onConfirm: () => handleDeleteTag(tagId, tagName)
    })
  }

  useEffect(() => {
    history.push(`#`)

    window.onpopstate = (e: any) => {
      setOpen(false)
    }
  }, [history, setOpen])

  return (
    <>
      <SettingsIcon
        className="settings-icon"
        onClick={() => setOpen(true)}
        data-test-id="notes-settings-icon"
      />

      <Drawer
        title="Settings"
        open={open}
        setOpen={setOpen}
        overlayRef={overlayEl}
      >
        <>
          <Styled.SettingsBlock>
            <Styled.SettingsBlock__Label htmlFor="sort-by">
              Sort by
            </Styled.SettingsBlock__Label>
            <Styled.SettingsBlock__Input>
              <SelectMenu
                id="sort-by"
                value={sortBy}
                onChange={handleSortByChange}
                options={sortByOptions}
              />
            </Styled.SettingsBlock__Input>
          </Styled.SettingsBlock>

          <Styled.SettingsBlock>
            <Styled.SettingsBlock__Label>Tags</Styled.SettingsBlock__Label>
            <Styled.SettingsBlock__Tags>
              {tags &&
                tags.map(tag => (
                  <TagChip
                    key={tag.id}
                    id={tag.id}
                    name={tag.name}
                    color={tag.color}
                    onClick={() => handleTagClick(tag)}
                    onDelete={() => handleDeleteTagConfirm(tag.id, tag.name)}
                  />
                ))}
              <Styled.SettingsBlock__Icon
                onClick={handlePlusClick}
                className="mbl-click"
                data-test-id="tags-add-icon"
              >
                {showTagEditor ? <MinusIcon /> : <PlusIcon />}
              </Styled.SettingsBlock__Icon>
            </Styled.SettingsBlock__Tags>
          </Styled.SettingsBlock>

          {showTagEditor && (
            <TagEditor
              tag={activeTag}
              closeEditor={() => setShowTagEditor(false)}
            />
          )}
        </>
      </Drawer>
    </>
  )
}

export default NotesSettings
