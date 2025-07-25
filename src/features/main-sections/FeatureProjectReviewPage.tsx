import { ReviewContext } from "@/app/context/reviewr.context";
import { useGetAllReviewFolderQuery } from "@/app/redux/api/FolderApi";
import ProjectReviewCard from "@/components/review/ProjectReviewCard";

import { useParams } from "react-router-dom";

const FeatureProjectReviewPage = () => {
  const { id, folderId } = useParams();
  const shouldSkip = !id || !folderId;

  const { data: projects, isLoading } = useGetAllReviewFolderQuery(
    { workspaceId: id!, folderId: folderId! },
    {
      skip: shouldSkip,
      refetchOnMountOrArgChange: false,
    }
  );
  if (isLoading) return <h1>loading ....</h1>;

  return (
    <>
    {
      projects?.map((project)=>(
        <>
        <ReviewContext.Provider value={{project}}>
          <ProjectReviewCard />
        </ReviewContext.Provider>
        </>
      ))
    }
    </>
  );
};

export default FeatureProjectReviewPage;
