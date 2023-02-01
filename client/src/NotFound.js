import { Link } from "react-router-dom";

export default function NotFound () {
    return (
        <div>
            <h1>Error: Page Not Found.</h1>
            <h2>Return Home:</h2>
            <Link to='/'>Home</Link>
        </div>
        
    )
}