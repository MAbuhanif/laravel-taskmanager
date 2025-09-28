import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Edit, Trash2 } from 'lucide-react';

interface Task {
    id: number;
    title: string;
    description: string | null;
    status: 'pending' | 'in_progress' | 'completed';
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

interface Props {
    task: Task;
}

const getStatusColor = (status: string) => {
    switch (status) {
        case 'completed':
            return 'bg-green-100 text-green-800';
        case 'in_progress':
            return 'bg-yellow-100 text-yellow-800';
        case 'pending':
            return 'bg-gray-100 text-gray-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};


export default function ShowTask({ task }: Props) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(`/tasks/${task.id}`, {
                onSuccess: () => {
                    router.visit('/tasks');
                }
            });
        }
    };

    return (
        <AppLayout>
            <Head title={`Task: ${task.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4 mb-6">
                        <Link href="/tasks">
                            <Button variant="outline" size="sm">
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Back to Tasks
                            </Button>
                        </Link>
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Task Details
                        </h2>
                    </div>

                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                <div className="space-y-2">
                                    <CardTitle className="text-2xl">{task.title}</CardTitle>
                                    <div className="flex gap-2">
                                        
                                        <Badge className={getStatusColor(task.status)}>
                                            {task.status.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link href={`/tasks/${task.id}/edit`}>
                                        <Button variant="outline">
                                            <Edit className="w-4 h-4 mr-2" />
                                            Edit
                                        </Button>
                                    </Link>
                                    <Button 
                                        variant="outline" 
                                        onClick={handleDelete}
                                        className="text-red-600 hover:text-red-700"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Description */}
                            {task.description && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                                        {task.description}
                                    </p>
                                </div>
                            )}

                            {/* Due Date */}
                            {task.due_date && (
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Due Date</h3>
                                    <p className="text-gray-700">
                                        {new Date(task.due_date).toLocaleDateString('en-US', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            )}

                            {/* Timestamps */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <h4 className="font-medium text-gray-500 mb-1">Created</h4>
                                    <p className="text-sm text-gray-700">
                                        {new Date(task.created_at).toLocaleString()}
                                    </p>
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-500 mb-1">Last Updated</h4>
                                    <p className="text-sm text-gray-700">
                                        {new Date(task.updated_at).toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}