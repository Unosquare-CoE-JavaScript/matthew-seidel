import { useState } from "react";
import axios from "axios"

export const useGraphQL = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    
    const fetchData = async (query, variables) => {
        setLoading(true);
        try {
            
        
        } catch (error) {
        setError(error);
        }
        setLoading(false);
    }
    
    return { data, error, loading, fetchData };
}
