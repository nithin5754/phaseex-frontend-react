import { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"


interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
}


const DashBoardWSCard = (props: Props) => {
  return (
    <Card className="relative overflow-hidden h-full w-full bg-white dark:bg-background dark:text-primary dark:border-border">
    <CardHeader className="flex pb-2">
      <CardTitle>{props.title}</CardTitle>
      <props.icon
        size={120}
        className="text-muted-foreground  absolute -bottom-4 -right-8 stroke-primary opacity-10 "
      />
      <CardContent>
        <div className="text-2xl font-bold text-primary">
          1
        </div>
      </CardContent>
    </CardHeader>
  </Card>
  )
}
export default DashBoardWSCard