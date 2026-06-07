import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Task {
  name: string;
  completed: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule], // for ngModel
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  task: string = '';                          // Input value
  tasks: Task[] = [];                         // Task list
  searchText: string = '';                     // Search input
  filterType: 'all' | 'completed' | 'pending' = 'all'; // Filter
  editingIndex: number | null = null;         // Index of task being edited

  addTask() {
    if (this.task.trim() === '') return;

    if (this.editingIndex !== null) {
      this.tasks[this.editingIndex].name = this.task;
      this.editingIndex = null;
    } else {
      this.tasks.push({ name: this.task, completed: false });
    }

    this.task = '';
  }

  compoletedTAsk(item: Task) {
    item.completed = !item.completed;
  }

  editTask(item: Task) {
    this.task = item.name;
    this.editingIndex = this.tasks.indexOf(item);
  }

  deleteTask(item: Task) {
    const index = this.tasks.indexOf(item);
    if (index > -1) this.tasks.splice(index, 1);

    if (this.editingIndex === index) this.editingIndex = null;
  }

  getFilteredTasks(): Task[] {
    let filtered = this.tasks;

    if (this.searchText.trim() !== '') {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.filterType === 'completed') {
      filtered = filtered.filter(t => t.completed);
    } else if (this.filterType === 'pending') {
      filtered = filtered.filter(t => !t.completed);
    }

    return filtered;
  }

  getTotalCount(): number {
    return this.tasks.length;
  }

  completedTask(): number {
    return this.tasks.filter(t => t.completed).length;
  }

  pendingTask(): number {
    return this.tasks.filter(t => !t.completed).length;
  }
}