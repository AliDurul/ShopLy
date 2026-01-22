import { Controller, Get } from '@nestjs/common';
import { InventoryService } from './inventory.service';

@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  getHello(): string {
    return this.inventoryService.getHello();
  }
}
