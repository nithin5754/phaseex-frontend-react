
import { differenceInDays } from 'date-fns';
import moment from 'moment'

 interface Props{
  list_due_date:string
 }

  const useTimeDue = ({list_due_date}:Props) => {
    const start_date = Date.now();
    const due_date = moment(list_due_date, 'MMMM D, YYYY').toDate();
    let Difference_In_Time:number =
    due_date.getTime() - start_date;


    let Difference_In_Days:number =
    Math.round
        (Difference_In_Time / (1000 * 3600 * 24));


        
    return Difference_In_Days
  }
  export default useTimeDue