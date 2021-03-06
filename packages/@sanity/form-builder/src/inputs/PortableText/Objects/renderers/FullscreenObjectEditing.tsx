/* eslint-disable react/prop-types */
import React, {FunctionComponent} from 'react'
import FullscreenDialog from 'part:@sanity/components/dialogs/fullscreen'
import Stacked from 'part:@sanity/components/utilities/stacked'
import {PortableTextBlock, Type, PortableTextChild} from '@sanity/portable-text-editor'
import {PresenceOverlay} from '@sanity/base/presence'

import {FormBuilderInput} from '../../../../FormBuilderInput'
import {Marker, Presence} from '../../../../typedefs'
import {Path} from '../../../../typedefs/path'
import {PatchEvent} from '../../../../PatchEvent'

type Props = {
  focusPath: Path
  markers: Marker[]
  object: PortableTextBlock | PortableTextChild
  onBlur: () => void
  onChange: (patchEvent: PatchEvent, path: Path) => void
  onClose: (event: React.SyntheticEvent) => void
  onFocus: (arg0: Path) => void
  path: Path
  presence: Presence[]
  readOnly: boolean
  type: Type
}

export const FullscreenObjectEditing: FunctionComponent<Props> = ({
  focusPath,
  markers,
  object,
  onBlur,
  onChange,
  onClose,
  onFocus,
  path,
  presence,
  readOnly,
  type
}): JSX.Element => {
  const handleChange = (patchEvent: PatchEvent): void => onChange(patchEvent, path)
  return (
    <Stacked>
      {(isActive: boolean): JSX.Element => (
        <div>
          <FullscreenDialog
            isOpen
            title={type.title}
            onEscape={(event: React.SyntheticEvent): void => isActive && onClose(event)}
            onClose={onClose}
          >
            {/* TODO: Styling */}
            {/* <div className={styles.formBuilderInputWrapper}> */}
            <div>
              <PresenceOverlay>
                <FormBuilderInput
                  type={type}
                  level={0}
                  readOnly={readOnly || type.readOnly}
                  value={object}
                  presence={presence}
                  onChange={handleChange}
                  onFocus={onFocus}
                  onBlur={onBlur}
                  focusPath={focusPath}
                  path={path}
                  markers={markers}
                />
              </PresenceOverlay>
            </div>
          </FullscreenDialog>
        </div>
      )}
    </Stacked>
  )
}
