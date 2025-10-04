<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with task overview.
     */
    public function index(): Response
    {
        /** @var User $user */
        $user = Auth::user();
        
        // Get recent tasks (last 6 tasks)
        $recentTasks = $user->tasks()->latest()->limit(6)->get();
        
        // Get task statistics
        $taskStats = [
            'total' => $user->tasks()->count(),
            'pending' => $user->tasks()->where('status', 'pending')->count(),
            'in_progress' => $user->tasks()->where('status', 'in_progress')->count(),
            'completed' => $user->tasks()->where('status', 'completed')->count(),
        ];
        
        // Get overdue tasks
        $overdueTasks = $user->tasks()
            ->where('due_date', '<', now())
            ->where('status', '!=', 'completed')
            ->count();
        
        // Get tasks due today
        $tasksDueToday = $user->tasks()
            ->whereDate('due_date', today())
            ->where('status', '!=', 'completed')
            ->count();

        return Inertia::render('dashboard', [
            'recentTasks' => $recentTasks,
            'taskStats' => $taskStats,
            'overdueTasks' => $overdueTasks,
            'tasksDueToday' => $tasksDueToday,
        ]);
    }
}