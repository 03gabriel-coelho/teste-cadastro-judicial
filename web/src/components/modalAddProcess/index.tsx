import * as React from "react";
import { Box, Button, Modal, TextField, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import style from "./index.module.css";
import {
  ModalAddProcessProps,
  ProcessFormValues,
  processSchema,
} from "document/types/componentsTypes";

export default function ModalAddProcess({
  open,
  setOpen,
  states,
  handleSubmitProcess,
  processToEdit
}: ModalAddProcessProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<ProcessFormValues>({
    resolver: zodResolver(processSchema),
  });

  const handleClose = () => {
    setOpen(false);
    reset();
  };

  const onSubmit = (data: ProcessFormValues) => {
    if (processToEdit) {
      handleSubmitProcess(data, processToEdit.id);
    } else {
      handleSubmitProcess(data);
    }
    handleClose();
  };

  React.useEffect(() => {
    if (processToEdit) {
      reset({
        process_number: processToEdit.process_number,
        opening_date: processToEdit.opening_date,
        description: processToEdit.description,
        customer: processToEdit.customer,
        attorney: processToEdit.attorney,
        state_id: processToEdit.state_id,
      });
    } else {
      reset();
      setValue("state_id", undefined as unknown as number);
      setValue("process_number", "");
      setValue("opening_date", "");
      setValue("description", "");
      setValue("customer", "");
      setValue("attorney", "")
    }
  }, [processToEdit, reset, open, setValue, states]);

  return (
    <Modal open={open} onClose={handleClose} aria-labelledby="modal-process">
      <Box className={style.modal}>
        <h2>{processToEdit ? "Editar Processo" : "Adicionar Novo Processo"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
          <section className={style.formContainer}>
            <TextField
              label="Número do Processo"
              {...register("process_number")}
              error={!!errors.process_number}
              helperText={errors.process_number?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Data de Abertura"
              type="date"
              {...register("opening_date")}
              error={!!errors.opening_date}
              helperText={errors.opening_date?.message}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Descrição"
              {...register("description")}
              error={!!errors.description}
              helperText={errors.description?.message}
              fullWidth
              margin="normal"
              multiline
              rows={3}
            />
            <TextField
              label="Cliente"
              {...register("customer")}
              error={!!errors.customer}
              helperText={errors.customer?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Advogado"
              {...register("attorney")}
              error={!!errors.attorney}
              helperText={errors.attorney?.message}
              fullWidth
              margin="normal"
            />
            <TextField
              select
              label="Estado"
              {...register("state_id")}
              defaultValue={processToEdit?.state_id || ""}
              error={!!errors.state_id}
              helperText={errors.state_id?.message}
              fullWidth
              margin="normal"
            >
              {states.map((state) => (
                <MenuItem key={state.id} value={state.id}>
                  {state.name_state} ({state.federal_state})
                </MenuItem>
              ))}
            </TextField>
          </section>

          <footer className={style.modalFooter}>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              {processToEdit ? "Salvar Alterações" : "Adicionar"}
            </Button>
          </footer>
        </form>
      </Box>
    </Modal>
  );
}
