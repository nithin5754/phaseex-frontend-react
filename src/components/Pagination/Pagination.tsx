import { useAppDispatch } from "@/app/redux/api/store";
import { changePageNumber,  } from "@/app/redux/slice/listSlice";

import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "../ui/pagination";
import { toast } from "../ui/use-toast";

interface Props {
  total:number,
  CurrentPage:number

}

  const PaginationButton = ({total,CurrentPage}:Props) => {



     

const dispatch = useAppDispatch();

const changeCurrentPageNumberInc = (CurrentPage:number) => {

       if (Number(CurrentPage) < ( Number(total)/4)) {

           dispatch(changePageNumber((CurrentPage + 1)));

       } else if (Number(CurrentPage) >=( Number(total)/4)) {
    
        toast({
          title: "cannot increase more",
          variant: "destructive",
        });

       }

   }



   const changeCurrentPageNumberDec = (CurrentPage:number) => {

       if (Number(CurrentPage) === 1) {

      
           toast({
            title: "cannot go back ",
            variant: "destructive",
          });

       } else {
               
           dispatch(changePageNumber((Number(CurrentPage) - 1)));

       }

   }



    return (
   
      <Pagination>
  <PaginationContent>
    <PaginationItem>
      <PaginationPrevious onClick={()=>changeCurrentPageNumberDec(CurrentPage)}/>
    </PaginationItem>
    <PaginationItem>
      <PaginationLink href="#">{CurrentPage}</PaginationLink>
    </PaginationItem>

    <PaginationItem>
      <PaginationNext  onClick={()=>changeCurrentPageNumberInc(CurrentPage)}/>
    </PaginationItem>
  </PaginationContent>
</Pagination>

    )
  }
  export default PaginationButton