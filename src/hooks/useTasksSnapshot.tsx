import { getTasksCollection } from '@/services/tasks';
import { FirestoreError, onSnapshot, query, QuerySnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';

interface TasksSnapshotParams {
    onNext: (snapshot: QuerySnapshot) => void;
    onError?: (error: FirestoreError) => void;
}

export const useTasksSnapshot = ({ onNext, onError }: TasksSnapshotParams) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const q = query(getTasksCollection());
        const unsubscribe = onSnapshot(
            q,
            (snapshot) => {
                setIsLoading(true);
                setError(null);

                onNext(snapshot);

                setIsLoading(false);
            },
            (error) => {
                setError('Firestore error. Please try again later.');
                console.error('Firestore error: ', error);

                onError?.(error);

                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [onNext, onError]);

    return { isLoading, error };
};
