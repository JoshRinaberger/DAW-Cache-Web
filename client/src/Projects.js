import { Link } from "react-router-dom";

export default function Projects () {
    return (
        <div>
            <h1>Projects</h1>
            <Link to="/project/1">Project 1</Link>
            <Link to="/project/2">Project 2</Link>
        </div>
        
    )
}