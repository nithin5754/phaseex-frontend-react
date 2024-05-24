import {
  useGetAllSpacesQuery,
  useGetInActiveSpaceCountQuery,
  useGetOnGoingSpacesQuery,
} from "@/app/redux/api/spaceApi";
import { SpaceHome } from "../../components/work-space/index";

import { useChangeVisiblityMutation } from "@/app/redux/api/spaceApi";
import { useAppDispatch } from "@/app/redux/api/store";
import {
  addAllspaces,
  changeVisibliltySpace,
} from "@/app/redux/slice/workspaceSlice";

import { useEffect, useState } from "react";
import { SpaceSkelton } from "../../components/shimmer/index";


const ViewSpace = () => {



  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  console.log(totalPages,"total oages");
  

  

  
  

  

  
  

  const [changeVisibility] = useChangeVisiblityMutation();
  const dispatch = useAppDispatch();

  let pageId: string = currentPage.toString();




  

  const { data: getAllSpaces, isLoading } = useGetAllSpacesQuery(pageId, {
    
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { data: getOnGoingSpace } = useGetOnGoingSpacesQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  const { data:getInactive } = useGetInActiveSpaceCountQuery(undefined, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (getInactive&&getInactive?.count) {
      setTotalPages(Math.ceil(getInactive.count / 10))
    }
  }, [getInactive]);
   




  useEffect(() => {
    if (getAllSpaces ) {
      dispatch(addAllspaces(getAllSpaces));
  
     
    }
  }, [dispatch, getAllSpaces]);

  const handleHideSubmit = async (id: string) => {
    try {
      await changeVisibility({ id }).unwrap();
      dispatch(changeVisibliltySpace(id));
    } catch (error) {
      console.error("Failed to change visibility", error);
    }
  };

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };



  if (isLoading) return <SpaceSkelton/>

  return (
    <>
      <SpaceHome
        allSpaces={getAllSpaces ? getAllSpaces : []}
        getOnGoingSpace={getOnGoingSpace ? getOnGoingSpace : []}
        handleHideSubmit={handleHideSubmit}
        currentPage={currentPage} 
        setCurrentPage={handleChangePage}    
        totalPages= {totalPages}
      />
    </>
  );
};
export default ViewSpace;
