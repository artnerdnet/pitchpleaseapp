import { TNote } from 'pitchplease/dist/types';
import React from 'react';

type TNoteIndicatorProps = {
  note: TNote
}

export const NoteIndicator: React.FunctionComponent<TNoteIndicatorProps> = ({ note }) => {

  return (
    <div>
      {note.isFlat ?? 'flat'}
      {note.isSharp ?? 'sharp'}
      {note.name ?? `name: ${note.name}`}
    </div>
  );
}
