
import { differenceInDays } from 'date-fns';
import moment from 'moment'

 interface Props{
  list_start_date:string
  list_due_date:string
 }

  const useTimeDue = ({list_start_date,list_due_date}:Props) => {
    const start_date = moment(list_start_date, 'MMMM D, YYYY').toDate();
    const due_date = moment(list_due_date, 'MMMM D, YYYY').toDate();
    let Difference_In_Time:number =
    due_date.getTime() - start_date.getTime();


    let Difference_In_Days:number =
    Math.round
        (Difference_In_Time / (1000 * 3600 * 24));


        console.log(differenceInDays,"due days");
        
    return Difference_In_Days
  }
  export default useTimeDue