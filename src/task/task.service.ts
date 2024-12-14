import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TaskTypes } from './types/task.types';

@Injectable()
export class TaskService {
    constructor(private pris: PrismaService) {}

    async getTasksAllTask() {
        return this.pris.task.findMany();
    }

    async getTask(id: string) {
        const toNumberId = Number(id);
        if (!isNaN(toNumberId)) {
            return this.pris.task.findUnique({ where: { id: toNumberId } });
        } else {
            throw new BadRequestException('Неправильный ID');
        }
    }

    async createTask(data: TaskTypes) {
        return this.pris.task.create({ data });
    }

    async updateTask(id: string, data: TaskTypes, updateType: 'patch' | 'put') {
        const toNumberId = Number(id);
        const body = updateType === 'patch' ? { ...data } : data;
        if (!isNaN(toNumberId)) {
            const isFindTask = this.pris.task.findUnique({
                where: { id: toNumberId },
            });
            if (!isFindTask) throw new NotFoundException('Task not foun');
            return this.pris.task.update({
                where: { id: toNumberId },
                data: body,
            });
        } else {
            throw new BadRequestException('Неправильный ID');
        }
    }
}
