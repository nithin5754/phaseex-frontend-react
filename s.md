 
        {/* <div className="flex items-center justify-center dark:bg-background dark:text-primary dark:border-border">
          {allSpaces.length > 0 &&
            !allSpaces.every((space) => space.active) && (
              <div className="pagination flex items-center space-x-2">
                <Button
                  className="p-1 text-sm w-12 bg-slate-500 text-[12px] text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  Prev
                </Button>
                <span className="text-sm">{currentPage}</span>
                <Button
                  className="p-1 text-sm w-12 bg-slate-500 text-[12px] text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
                  disabled={currentPage >= totalPages}
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  Next
                </Button>
              </div>
            )}
        </div> */}
   
    
        {/* </div> */}



        //LIST COLLOBORATOR

         const [addCollaboratorToList]=useAddCollaboratorToListMutation()

 const handleAddCollab=async()=>{

 let sendDataAddCollab:SendAddCollabListType={
   workspaceId:workspaceId,
   folderId:folderId,
   listId: list.id,
   collabId:,
   roles: ""
 }

  await addCollaboratorToList(sendDataAddCollab).unwrap()
 }