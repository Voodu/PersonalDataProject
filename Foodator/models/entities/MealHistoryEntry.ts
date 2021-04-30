import { FoodHistoryEntry } from './FoodHistoryEntry';

export class MealHistoryEntry {
  mealId = 0;
  datetime: Date = new Date();
  food: FoodHistoryEntry[] = [];
}
