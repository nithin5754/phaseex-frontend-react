
import {
  Card,
  CardContent,
  CardDescription,

  CardHeader,
  CardTitle,
} from "@/components/ui/card"




interface Props {
  title:string;
  description:string;

 

}

export function BoxCard({title,description}:Props) {
  return (
    <Card className="w-[250px] h-[150px] dark:border-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      
      </CardHeader>
      <CardContent className="flex items-center justify-center">
      <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  )
}
