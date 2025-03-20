'use client'

import { useParams } from 'next/navigation';
import TutorDetail from '@/components/tutor/TutorDetail';

export default function TutorDetailPage() {
    const params = useParams();
    const id = Number(params.id);

    return <TutorDetail id={id} />;
} 