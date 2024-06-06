





const useGreetings = () => {

  var currentTime = new Date();
  currentTime.getHours();
  var currentHour = currentTime.getHours();
  switch (true) {
      case (currentHour < 12):
         return 'Good Morning'
   
      case (currentHour > 12 && currentHour < 17):
             return 'Good Afternoon'
         
      default:
         return 'Good Evening'
  
  }



}
export default useGreetings