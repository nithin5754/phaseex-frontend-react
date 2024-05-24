import { useGetDashBoardQuery } from "@/app/redux/api/AuthApi"
import { Link } from "react-router-dom"



const Hello = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
} = useGetDashBoardQuery()

let content;
if (isLoading) {
    content =<p>loading........</p>
} else if (isSuccess) {
    content = (
        <section className="users">
            <h1>hello</h1>
            <Link to={'/dashboard'}>dashboard</Link>
        </section>
    )
} else if (isError) {
    content = <p>{JSON.stringify(error)}</p>;
}

return content
}
export default Hello