import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { 
    CheckSquare, 
    Plus, 
    Clock, 
    AlertCircle, 
    Calendar, 
    TrendingUp,
    Eye,
    Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Task {
    id: number;
    title: string;
    description: string | null;
    status: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

interface TaskStats {
    total: number;
    pending: number;
    in_progress: number;
    completed: number;
}

interface Props {
    recentTasks: Task[];
    taskStats: TaskStats;
    overdueTasks: number;
    tasksDueToday: number;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

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

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case 'high':
            return 'bg-red-100 text-red-800';
        case 'medium':
            return 'bg-orange-100 text-orange-800';
        case 'low':
            return 'bg-blue-100 text-blue-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

export default function Dashboard({ recentTasks, taskStats, overdueTasks, tasksDueToday }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            
            <div className="space-y-6 mx-2">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">
                            Welcome back! Here's an overview of your tasks.
                        </p>
                    </div>
                    <Link href="/tasks/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Task
                        </Button>
                    </Link>
                </div>

                {/* Stats Cards */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Tasks
                            </CardTitle>
                            <CheckSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{taskStats.total}</div>
                            <p className="text-xs text-muted-foreground">
                                All your tasks
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Pending Tasks
                            </CardTitle>
                            <Clock className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{taskStats.pending}</div>
                            <p className="text-xs text-muted-foreground">
                                Waiting to start
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                In Progress
                            </CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{taskStats.in_progress}</div>
                            <p className="text-xs text-muted-foreground">
                                Currently working on
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Completed
                            </CardTitle>
                            <CheckSquare className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{taskStats.completed}</div>
                            <p className="text-xs text-muted-foreground">
                                Tasks finished
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Alert Cards */}
                {(overdueTasks > 0 || tasksDueToday > 0) && (
                    <div className="grid gap-4 md:grid-cols-2">
                        {overdueTasks > 0 && (
                            <Card className="border-red-200 bg-red-50">
                                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                                    <AlertCircle className="h-4 w-4 text-red-600 mr-2" />
                                    <CardTitle className="text-sm font-medium text-red-800">
                                        Overdue Tasks
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-800">{overdueTasks}</div>
                                    <p className="text-xs text-red-600">
                                        Tasks past their due date
                                    </p>
                                </CardContent>
                            </Card>
                        )}

                        {tasksDueToday > 0 && (
                            <Card className="border-orange-200 bg-orange-50">
                                <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                                    <Calendar className="h-4 w-4 text-orange-600 mr-2" />
                                    <CardTitle className="text-sm font-medium text-orange-800">
                                        Due Today
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-orange-800">{tasksDueToday}</div>
                                    <p className="text-xs text-orange-600">
                                        Tasks due today
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                )}

                {/* Recent Tasks */}
                <div className="grid gap-6 lg:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Recent Tasks</CardTitle>
                                <Link href="/tasks">
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                            <CardDescription>
                                Your most recently created tasks
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {recentTasks.length === 0 ? (
                                <div className="text-center py-8">
                                    <CheckSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground mb-4">No tasks yet</p>
                                    <Link href="/tasks/create">
                                        <Button>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Create your first task
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {recentTasks.map((task) => (
                                        <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <h4 className="font-medium">{task.title}</h4>
                                                    <Badge className={getStatusColor(task.status)}>
                                                        {task.status.replace('_', ' ')}
                                                    </Badge>
                                                    <Badge className={getPriorityColor(task.priority)}>
                                                        {task.priority}
                                                    </Badge>
                                                </div>
                                                {task.description && (
                                                    <p className="text-sm text-muted-foreground line-clamp-1">
                                                        {task.description}
                                                    </p>
                                                )}
                                                {task.due_date && (
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        Due: {new Date(task.due_date).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                            <div className="flex gap-2">
                                                <Link href={`/tasks/${task.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/tasks/${task.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                            <CardDescription>
                                Common tasks and shortcuts
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Link href="/tasks/create">
                                <Button className="w-full justify-start">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create New Task
                                </Button>
                            </Link>
                            <Link href="/tasks">
                                <Button variant="outline" className="w-full justify-start">
                                    <CheckSquare className="mr-2 h-4 w-4" />
                                    View All Tasks
                                </Button>
                            </Link>
                            <Link href="/tasks?status=pending">
                                <Button variant="outline" className="w-full justify-start">
                                    <Clock className="mr-2 h-4 w-4" />
                                    View Pending Tasks
                                </Button>
                            </Link>
                            {overdueTasks > 0 && (
                                <Link href="/tasks?status=pending">
                                    <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
                                        <AlertCircle className="mr-2 h-4 w-4" />
                                        View Overdue Tasks ({overdueTasks})
                                    </Button>
                                </Link>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
