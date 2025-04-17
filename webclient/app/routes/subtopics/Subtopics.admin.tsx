import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { HiOutlinePencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useParams } from "react-router";
import {
  addSubtopic,
  deleteSubtopic,
  updateSubtopic,
} from "../../api/subtopics";
import { updateTopic } from "../../api/topics";
import SubtopicList, {
  TopicCard as SubtopicCard,
} from "../../shared/TopicList/TopicList";
import {
  AdminContainer,
  AdminLabel,
  RequiredAlert,
  AddForm,
  FormFooter,
  Submit,
  TextInput,
} from "../../styles/Forms";
import {
  CenteredContainer,
  ItemsCardButtons,
  StyledItemsCardButton,
} from "../../shared/TopicList/TopicList.styles";
import type { Topic } from "../topics/Topics.interfaces";
import type {
  AdminSubtopicsProps,
  Subtopic,
  SubtopicForm,
} from "./Subtopics.interfaces";
import { EditSubtopicModal } from "./components/EditSubtopic";
import { useState } from "react";

const SubtopicsAdmin = (props: AdminSubtopicsProps) => {
  const queryClient = useQueryClient();
  const { topicId } = useParams();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Subtopic>();
  // Add
  const addMutation = useMutation({
    mutationFn: addSubtopic,
    onSuccess: async (newTopic) => {
      queryClient.setQueryData<Array<Subtopic> | undefined>(
        ["subtopics"],
        (old) => [newTopic, ...(old as Array<Subtopic>)]
      );
    },
  });
  // Update
  const updateMutation = useMutation({
    mutationFn: ({
      subtopic,
      subtopicId,
    }: {
      subtopic: SubtopicForm;
      subtopicId: number;
    }) => updateSubtopic(subtopic, subtopicId),
    onSuccess: async (newTopic) => {
      queryClient.setQueryData<Array<Topic> | undefined>(["topics"], (old) => [
        newTopic,
        ...(old as Array<Topic>),
      ]);
    },
  });

  // Delete
  const deleteMutation = useMutation({
    mutationFn: deleteSubtopic,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subtopics"],
        exact: true,
        refetchType: "active",
      });
    },
  });

  const onSubmit = async (subtopic: SubtopicForm) => {
    if (topicId) {
      addMutation.mutate({ subtopic, topicId: Number(topicId) });
    } else {
      throw new Response("Erro interno", { status: 500 });
    }
  };

  const handleDelete = (subtopicId: number) => {
    if (window.confirm("Tem certeza de que quer remover este item?")) {
      deleteMutation.mutate(subtopicId);
    }
  };
  const handleUpdate = (subtopicId: number) => {
    setOpenModal(true);
  };
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <EditSubtopicModal />
      <AdminContainer>
        <AddForm onSubmit={handleSubmit(onSubmit)}>
          <AdminLabel htmlFor="topic_name">Nome do Subtópico</AdminLabel>
          <TextInput
            type="text"
            id="topic_name"
            {...register("subtopic_name", { required: true, maxLength: 64 })}
            aria-invalid={errors.subtopic_name ? "true" : "false"}
          />
          {errors.subtopic_name?.type === "required" && (
            <RequiredAlert role="alert">Nome é obrigatório</RequiredAlert>
          )}

          <AdminLabel htmlFor="description">Descrição</AdminLabel>
          <TextInput
            type="text"
            id="description"
            {...register("description", { required: true, maxLength: 64 })}
            aria-invalid={errors?.description ? "true" : "false"}
          />
          {errors.description?.type === "required" && (
            <RequiredAlert role="alert">Descrição é obrigatória</RequiredAlert>
          )}

          <FormFooter>
            <Submit type="submit">Criar</Submit>
          </FormFooter>
        </AddForm>
      </AdminContainer>
      {/* Lista de Subtopicos */}
      <CenteredContainer>
        <SubtopicList title="Subtópicos">
          {props.subtopics.map((subtopic: Subtopic) => (
            <SubtopicCard
              key={subtopic.subtopic_id}
              title={subtopic.subtopic_name}
              description={subtopic.description}
              link={`${subtopic.subtopic_id}/posts`}
            >
              <ItemsCardButtons>
                <StyledItemsCardButton onClick={() => handleUpdate}>
                  <HiOutlinePencilAlt size={20} />
                </StyledItemsCardButton>

                <StyledItemsCardButton
                  onClick={() => handleDelete(subtopic.subtopic_id)}
                >
                  <HiOutlineTrash size={20} />
                </StyledItemsCardButton>
              </ItemsCardButtons>
            </SubtopicCard>
          ))}
        </SubtopicList>
      </CenteredContainer>
    </>
  );
};

export default SubtopicsAdmin;
