import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Trash2, Edit, Plus, Eye } from 'lucide-react';

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
    tasks: Task[];
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

export default function TasksIndex({ tasks }: Props) {
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredTasks = tasks.filter(task => {
        const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
        return matchesStatus;
    });

    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this task?')) {
            router.delete(`/tasks/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Tasks" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-semibold leading-tight text-gray-800">
                            Task Manager
                        </h2>
                        <Link href="/tasks/create">
                            <Button>
                                <Plus className="w-4 h-4 mr-2" />
                                New Task
                            </Button>
                        </Link>
                    </div>
                    {/* Filters */}
                    <div className="mb-6 flex gap-4">
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-48">
                                <SelectValue placeholder="Filter by status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tasks Grid */}
                    {filteredTasks.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-12">
                                <p className="text-gray-500 text-lg mb-4">No tasks found</p>
                                <Link href="/tasks/create">
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Create your first task
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {filteredTasks.map((task) => (
                                <Card key={task.id} className="hover:shadow-lg transition-shadow">
                                    <CardHeader>
                                        <div className="flex justify-between items-start">
                                            <CardTitle className="text-lg">{task.title}</CardTitle>
                                            <div className="flex gap-2">
                                                <Badge className={getStatusColor(task.status)}>
                                                    {task.status.replace('_', ' ')}
                                                </Badge>
                                            </div>
                                        </div>
                                        {task.description && (
                                            <CardDescription className="line-clamp-2">
                                                {task.description}
                                            </CardDescription>
                                        )}
                                    </CardHeader>
                                    <CardContent>
                                        {task.due_date && (
                                            <p className="text-sm text-gray-600 mb-4">
                                                Due: {new Date(task.due_date).toLocaleDateString()}
                                            </p>
                                        )}
                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-500">
                                                Created {new Date(task.created_at).toLocaleDateString()}
                                            </span>
                                            <div className="flex gap-2">
                                                <Link href={`/tasks/${task.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/tasks/${task.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                </Link>
                                                <Button 
                                                    variant="outline" 
                                                    size="sm"
                                                    onClick={() => handleDelete(task.id)}
                                                    className="text-red-600 hover:text-red-700"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}