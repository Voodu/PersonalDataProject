import { FoodCatalogue } from './FoodCatalogue';
import { FoodCategories } from './FoodCategories';
import { MealHistory } from './MealHistory';
import { SymptomsCatalogue } from './SymptomsCatalogue';
import { SymptomsHistory } from './SymptomsHistory';

export interface Root {
  mealHistory: MealHistory;
  foodCatalogue: FoodCatalogue;
  foodCategories: FoodCategories;
  symptomsHistory: SymptomsHistory;
  symptomsCatalogue: SymptomsCatalogue;
}
