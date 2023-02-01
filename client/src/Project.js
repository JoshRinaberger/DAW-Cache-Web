import { useParams } from "react-router-dom";

export default function Project () {
    const {id} = useParams();

    return (
        <div>
            <h1>Project</h1>
            <p>ID: {id}</p>
        </div>

    )
}