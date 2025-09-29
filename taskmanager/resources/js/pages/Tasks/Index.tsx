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
import { Pagination } from '@/components/ui/pagination';
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

interface PaginatedTasks {
    data: Task[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}

interface Props {
    tasks: PaginatedTasks;
    filters: {
        status?: string;
    };
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

export default function TasksIndex({ tasks, filters }: Props) {
    const [statusFilter, setStatusFilter] = useState<string>(filters.status || 'all');

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        router.get('/tasks', { status: value === 'all' ? undefined : value }, {
            preserveState: true,
            replace: true,
        });
    };

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
                    <div className="mb-6">
                        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-700">Filter by status:</span>
                                <Select value={statusFilter} onValueChange={handleStatusChange}>
                                    <SelectTrigger className="w-40">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">All Tasks</SelectItem>
                                        <SelectItem value="pending">Pending</SelectItem>
                                        <SelectItem value="in_progress">In Progress</SelectItem>
                                        <SelectItem value="completed">Completed</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="text-sm text-gray-500">
                                Showing {tasks.from} to {tasks.to} of {tasks.total} tasks
                            </div>
                        </div>
                    </div>

                    {/* Tasks Grid */}
                    {tasks.data.length === 0 ? (
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
                            {tasks.data.map((task: Task) => (
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

                    {/* Pagination */}
                    {tasks.last_page > 1 && (
                        <div className="mt-8">
                            <Pagination
                                links={tasks.links}
                                currentPage={tasks.current_page}
                                lastPage={tasks.last_page}
                                from={tasks.from}
                                to={tasks.to}
                                total={tasks.total}
                            />
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}