"use client";

import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { deleteCategory } from '../create/actions';

interface FormDeleteProps {
    id: number;
}

export default function FormDelete({ id }: FormDeleteProps) {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleDelete = async () => {
        setIsSubmitting(true);

        const formData = new FormData();

        const result = await deleteCategory(null, formData, id);

        if (result.error) {
            setError(result.error);
        } else {
            router.push('/dashboard/categories');
        }

        setIsSubmitting(false);
    };

    return (
        <div>
            {error && <p className="text-red-500">{error}</p>}
            <Button
                variant="destructive"
                size="sm"
                disabled={isSubmitting}
                onClick={handleDelete}
            >
                <Trash className="w-4 h-4" />
                {isSubmitting ? 'Deleting...' : 'Delete'}
            </Button>
        </div>
    );
}
