import { toast } from "@/components/ui/use-toast";



const UseHandleCopyLink = (link:string) => {
  navigator.clipboard.writeText(link)
    .then(() => {
      toast({
        title:`link copied`,
        variant: "destructive",
      });
    })
    .catch((error) => {
      console.error('Failed to copy link: ', error);
    });
};


export default UseHandleCopyLink