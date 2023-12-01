// import { RouteComponentProps } from 'react-router-dom';

import { Header } from "@geotab/react-component-library";
import { useParams } from "react-router-dom";

export default function Method() {
    const { methodId } = useParams();

    console.log(sessionStorage);
    console.log(methodId);
    return (
        <div>
            <Header title="Method"></Header>
        </div>
    )
} 