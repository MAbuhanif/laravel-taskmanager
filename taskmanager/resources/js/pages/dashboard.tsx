import { CardContent } from '@/components/ui/card';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { CheckSquare, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <CardContent>
                <div className="text-2xl font-bold">Organize Your Work</div>
                <p className="text-xs text-muted-foreground">
                    Manage your tasks efficiently
                </p>
                <div className="mt-4 space-y-2">
                    <Link href="/tasks">
                        <Button className="w-full">
                            <CheckSquare className="mr-2 h-4 w-4" />
                            View Tasks
                        </Button>
                    </Link>
                    <Link href="/tasks/create">
                        <Button variant="outline" className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            New Task
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </AppLayout>
    );
}
