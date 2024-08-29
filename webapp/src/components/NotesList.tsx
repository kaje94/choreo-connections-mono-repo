import { FC, useState } from "react";
import { NoteItem } from "./NoteItem";
import { PlusIcon } from "../icons/PlusIcon";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addNoteApi, getNodesApi } from "../api";

export const NotesList: FC = () => {
  const client = useQueryClient();
  const [newName, setNewName] = useState("");

  const {
    data: notes = [],
    error: notesError,
    isLoading: isLoadingNotes,
  } = useQuery({
    queryKey: ["note-list"],
    queryFn: getNodesApi,
  });

  const { mutate: addNote, isPending: isAddingNote } = useMutation({
    mutationFn: (title: string) => addNoteApi(title),
    onSuccess: (data) => client.setQueryData(["note-list"], [...notes, data]),
  });

  return (
    <div className="h-screen container max-w-2xl">
      <div className="flex flex-col gap-2 justify-center min-h-full py-10">
        <h1 className="text-primary text-center text-6xl m-6 font-bold opacity-75">
          Notes
        </h1>
        <div className="flex items-center gap-4 mb-4">
          <input
            className="input flex-1 input-bordered"
            placeholder="Note title..."
            onChange={(e) => setNewName(e.target.value)}
            value={newName}
          />
          <button
            className="btn btn-square"
            onClick={() => {
              addNote(newName);
              setNewName("");
            }}
            disabled={newName.length === 0}
          >
            <PlusIcon />
          </button>
        </div>
        {isLoadingNotes && (
          <span className="loading loading-ring loading-lg self-center" />
        )}
        {notes.map((item) => (
          <NoteItem key={item.id} item={item} />
        ))}
        {!isLoadingNotes && !notesError && notes.length === 0 && (
          <div className="p-6 text-center font-thin text-2xl opacity-50 text-secondary">
            Get started by adding your first note!
          </div>
        )}
        {!isLoadingNotes && notesError && (
          <div role="alert" className="alert alert-error">
            Failed to load notes
          </div>
        )}
        {isAddingNote && <div className="h-16 skeleton" />}
      </div>
    </div>
  );
};
