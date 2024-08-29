import { FC } from "react";
import { Note, editNoteApi } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "../icons/TrashIcon";

interface Props {
  text: string;
}

export const WarningBanner: FC<Props> = ({ text }) => {
  return (
    <div role="alert" className="alert alert-warning">
      <span>{text}</span>
    </div>
  );
};
