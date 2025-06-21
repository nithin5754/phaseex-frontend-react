import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


const ProjectComments = () => {
  return (
     <div className="space-y-4">
                  <div className="mt-6">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                      Comments
                    </h2>
                    <form className="mb-6 flex gap-2">
                      <Input
                        placeholder="Add a comment..."
                        className="flex-1"
                      />
                      <Button type="submit">Comment</Button>
                    </form>
                  </div>
                </div>
  )
}
export default ProjectComments