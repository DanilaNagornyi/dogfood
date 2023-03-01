import {useEffect, useState} from 'react';
const useApi = (handle) => {
    const [data, setData] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        handle()
            .then((result) => {
              setData(result);
            })
            .catch((err) => {
              setError(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, [handle]);

    return {data, setData, isLoading, error};
}

export default useApi;
