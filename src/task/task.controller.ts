import { Body, Controller, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskTypes } from './types/task.types';

@Controller('task')
export class TaskController {
    constructor(private readonly taskService: TaskService) {}
    @Get()
    async getAllTask() {
        return this.taskService.getTasksAllTask();
    }
    @Get(':id')
    async getTask(@Param('id') id: string) {
        return this.taskService.getTask(id);
    }
    @Post()
    async createTask(@Body() data: TaskTypes) {
        return this.taskService.createTask(data);
    }
    @Put(':id')
    updateTask(@Body() data: TaskTypes, @Param('id') id: string) {
        return this.taskService.updateTask(id, data, 'put');
    }
    @Patch(':id')
    patchUpdateTask(@Body() data: TaskTypes, @Param('id') id: string) {
        return this.taskService.updateTask(id, data, 'patch');
    }
}
