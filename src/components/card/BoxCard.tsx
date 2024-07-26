

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Link2, LucideIcon } from "lucide-react"
import { Link } from "react-router-dom"

interface Props {
  title:string;
  description:string;
  link:string;
  icon:LucideIcon

}

export function BoxCard({title,description,link,icon}:Props) {
  return (
    <Card className="w-[250px] h-[150px] dark:border-border">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
       <Link to={link}><Link2/></Link>
      </CardContent>
    </Card>
  )
}
