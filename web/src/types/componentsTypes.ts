import { z } from "zod";
import { Process } from "./processTypes";
import { IconType } from "react-icons/lib";
import { ProgressProcess } from "./progressProcessTypes";

export interface ItemProps {
  item: string | React.ReactNode;
  Icon: IconType;
  route: string;
  selected?: boolean;
}

export type ModalConfirmState = {
  open: boolean;
  process: Process | ProgressProcess | null;
};
export default interface ModalConfirmProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  processOrProgress: Process | ProgressProcess | null;
  handleSubmit: (process: Process | ProgressProcess) => void;
}

export const processSchema = z.object({
  process_number: z
    .string()
    .min(1, { message: "O número do processo é obrigatório" })
    .max(20, {
      message: "O número do processo deve ter no máximo 20 caracteres",
    }),
  opening_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data de abertura inválida",
  }),
  description: z.string().min(1, { message: "A descrição é obrigatória" }),
  customer: z
    .string()
    .min(1, { message: "O cliente é obrigatório" })
    .max(100, { message: "O cliente deve ter no máximo 100 caracteres" }),
  attorney: z
    .string()
    .min(1, { message: "O advogado é obrigatório" })
    .max(100, { message: "O advogado deve ter no máximo 100 caracteres" }),
  state_id: z
    .number({ message: "O estado é obrigatório" }),
});

export type ProcessFormValues = z.infer<typeof processSchema>;
export interface ModalAddProcessProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  states: { id: number; federal_state: string; name_state: string }[];
  handleSubmitProcess: (data: ProcessFormValues, id?: number) => void;
  processToEdit?: Process;
}

export interface ModalProgressProcessProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  process: Process | null;
}

export const progressProcessSchema = z.object({
  date: z.string().refine((date) => !isNaN(Date.parse(date)), {
    message: "Data inválida",
  }),
  description: z.string().min(1, { message: "A descrição é obrigatória" }),
});

export type ProgressProcessFormValues = z.infer<typeof progressProcessSchema>;

export interface ModalAddProgressProcessProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  handleSubmitProcess: (data: ProgressProcessFormValues, id?: number) => void;
  progressToEdit?: ProgressProcess;
}