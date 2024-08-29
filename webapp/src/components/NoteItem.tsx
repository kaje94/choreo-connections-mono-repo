import { FC } from "react";
import { Note, deleteNoteApi, editNoteApi } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "../icons/TrashIcon";

interface Props {
  item: Note;
}

export const NoteItem: FC<Props> = ({ item }) => {
  const client = useQueryClient();

  const { mutate: editNote, isPending: isEditingNote } = useMutation({
    mutationFn: (completed: boolean) => editNoteApi({ ...item, completed }),
    onSuccess: (data) => {
      const notes: Note[] = client.getQueryData(["note-list"]) ?? [];
      client.setQueryData(
        ["note-list"],
        notes.map((item) => (item.id === data.id ? data : item))
      );
    },
  });

  const { mutate: deleteNote, isPending: isDeletingNote } = useMutation({
    mutationFn: (id: string) => deleteNoteApi(id),
    onSuccess: (_, id) => {
      const notes: Note[] = client.getQueryData(["note-list"]) ?? [];
      client.setQueryData(
        ["note-list"],
        notes.filter((item) => item.id !== id)
      );
    },
  });

  return (
    <div
      className={`card bg-base-200 px-6 py-4 ${
        isDeletingNote ? "animate-pulse" : ""
      }`}
    >
      <div className="flex gap-2 flex-row items-center">
        <input
          type="checkbox"
          defaultChecked
          className="checkbox"
          onChange={(e) => editNote(e.target.checked)}
          disabled={isEditingNote}
        />
        <p className="flex-1">{item.title}</p>
        <button
          className="btn btn-ghost btn-sm btn-square"
          onClick={() => deleteNote(item.id)}
          disabled={isDeletingNote}
        >
          <TrashIcon />
        </button>
      </div>
    </div>
  );
};
