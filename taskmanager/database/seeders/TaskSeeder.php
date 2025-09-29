<?php

namespace Database\Seeders;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TaskSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::first(); 
    

    $tasks = [
        [
            'title' => 'Complete project documentation',
            'description' => 'Finalize and submit the project documentation by end of the week.',
            'status' => 'in_progress',
            'due_date' => now()->addDays(5),
        ],
        [
            'title' => 'Team meeting',
            'description' => 'Weekly sync-up with the team to discuss project progress and blockers.',
            'status' => 'pending',
            'due_date' => now()->addDays(2),
        ],
        [
            'title' => 'Code review',
            'description' => 'Review the latest pull requests and provide feedback.',
            'status' => 'completed',
            'due_date' => now()->subDays(1),
        ],
        [
            'title' => 'Update project roadmap',
            'description' => 'Revise the project roadmap based on recent changes and feedback.',
            'status' => 'in_progress',
            'due_date' => now()->addDays(10),
        ],
        [
            'title' => 'Client presentation',
            'description' => 'Prepare and deliver the presentation for the upcoming client meeting.',
            'status' => 'pending',
            'due_date' => now()->addDays(7),
        ],
        [
            'title' => 'Bug fixing',
            'description' => 'Address and resolve reported bugs in the latest release.',
            'status' => 'in_progress',
            'due_date' => now()->addDays(3),
        ],
        [
            'title' => 'Research new technologies',
            'description' => 'Explore and document new technologies that could benefit the project.',
            'status' => 'pending',
            'due_date' => now()->addDays(15),
        ],

    ];
        foreach ($tasks as $task) {
            Task::create(array_merge($task, ['user_id' => $user->id]));
        }
    }
        
}
