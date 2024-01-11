import React from 'react';
import { useParams } from 'react-router-dom';
import RenderStringWithUrl from './renderStringWithUrl';

export default function MethodDetail(): JSX.Element {
    const { methodId } = useParams();
    
    // Use methodId to fetch the details of the method from your data source
    // You can fetch the details dynamically based on methodId
  
    const methodDetails: { title: string, description: string } = {
        // Sample data for demonstration (replace with your data retrieval logic)
        title: `Method ${methodId}`,
        description: `Description for Method ${methodId}`
    };
  
    return (
        <div>
            <h2>{methodDetails.title}</h2>
            <p>{RenderStringWithUrl(methodDetails.title, methodDetails.description)}</p>
        </div>
    );
};