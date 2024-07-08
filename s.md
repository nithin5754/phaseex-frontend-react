deleteCollaborator: builder.mutation<boolean, SpaceCollabSendType>({
query: (credentials) => ({
url: "/space/delete-collaborator",
method: "DELETE",
body: { ...credentials },
}),

      async onQueryStarted({ workspaceId, collaboratorId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          workApiSlice.util.updateQueryData('getAllCollabInSpace', workspaceId, (draft) => {
            return draft.filter((collab: ReceiveCollaboratorType) => collab.id !== collaboratorId);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
          console.error("Error deleting collaborator:", error);
        }
      },

      invalidatesTags: (result, error, { workspaceId }) => [
        { type: "Collaborators", id: workspaceId },
        "Workspace"
      ],

    }),
