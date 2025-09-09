import { useState } from 'react';
import { getText } from '../services/helloText'

export type UseFetchData = {
    data: any,
    fetchData: () => Promise<void>
}

export const useFetchData = (): UseFetchData => {
    const [data, setData] = useState<string|undefined>("No Data");

    const logError = (error: string) => {
        setData(`Something went wrong ${error}`);
    }

    const fetchData = async () => {
        setData("Loading");
        try {
            const res = (await getText({example: "Anton" }));
            if (res.success) setData(res.data);
            if (res.error) logError(res.error);
            
        } catch (err) {
            
            logError(JSON.stringify(err));
        }
    }

    return {data, fetchData}
}