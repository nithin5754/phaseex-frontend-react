import { Link } from "react-router-dom"

const LandingPage = () => {
  return (
    <div>
      
      Welcome to my page
      <Link to={'/dashboard'}>DashBoard</Link>
    </div>
  )
}
export default LandingPage