import {
  useGetAllSpacesQuery,
  useGetOnGoingSpacesQuery,
} from "@/app/redux/api/spaceApi";
import { SpaceHome } from "../../components/work-space/index";

import { useChangeVisiblityMutation } from "@/app/redux/api/spaceApi";

import { SpaceSkelton } from "../../components/shimmer/index";

const ViewSpace = () => {
  const [changeVisibility] = useChangeVisiblityMutation();

  const { data: getAllSpaces, isLoading } = useGetAllSpacesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { data: getOnGoingSpace } = useGetOnGoingSpacesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const handleHideSubmit = async (id: string) => {
    try {
      await changeVisibility({ id }).unwrap();
    } catch (error) {
      console.error("Failed to change visibility", error);
    }
  };

  if (isLoading) return <SpaceSkelton />;

  return (
    <>
      <SpaceHome
        allSpaces={getAllSpaces ? getAllSpaces : []}
        getOnGoingSpace={getOnGoingSpace ? getOnGoingSpace : []}
        handleHideSubmit={handleHideSubmit}
      />
    </>
  );
};
export default ViewSpace;
