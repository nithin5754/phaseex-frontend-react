




const useGreetings = () => {
   
   let currentTime = new Date();
   let currentHour = currentTime.getHours();
 
  
   if (currentHour < 12) {
     return 'Good Morning';
   } else if (currentHour >= 12 && currentHour < 17) {
     return 'Good Afternoon';
   } else {
     return 'Good Evening';
   }
 };
 
 export default useGreetings;
 