export const mockRootData = `
{
  "mealHistory": {
    "values": [
      {
        "mealId": 1,
        "datetime": "2021-04-26T15:29:52",
        "food": [
          {
            "foodId": 1,
            "amount": 20
          },
          {
            "foodId": 2,
            "amount": 200
          }
        ]
      },
      {
        "mealId": 2,
        "datetime": "2021-05-01T18:10:11",
        "food": [
          {
            "foodId": 3,
            "amount": 250
          }
        ]
      },
      {
        "mealId": 3,
        "datetime": "2021-05-01T18:40:11",
        "food": [
          {
            "foodId": 3,
            "amount": 250
          }
        ]
      },
      {
        "mealId": 4,
        "datetime": "2021-05-01T22:10:11",
        "food": [
          {
            "foodId": 3,
            "amount": 150
          }
        ]
      },
      {
        "mealId": 5,
        "datetime": "2021-05-01T23:10:11",
        "food": [
          {
            "foodId": 3,
            "amount": 150
          }
        ]
      },
      {
        "mealId": 6,
        "datetime": "2021-05-02T23:10:11",
        "food": [
          {
            "foodId": 3,
            "amount": 150
          }
        ]
      }
    ]
  },

  "foodCatalogue": {
    "values": [
      {
        "foodId": 1,
        "name": "Cheese",
        "category": "diary",
        "defaultAmount": 50,
        "isScanned": false,
        "components": ["milk", "eggs"]
      },
      {
        "foodId": 2,
        "name": "Bread",
        "category": "Wheat",
        "defaultAmount": 50,
        "isScanned": true,
        "components": ["wheat", "gluten"]
      },
      {
        "foodId": 3,
        "name": "Vegan coffee",
        "category": "Coffees",
        "defaultAmount": 250,
        "isScanned": true,
        "components": ["caffeine", "oat milk"]
      }
    ]
  },

  "foodCategories": {
    "values": [
      {
        "name": "Diary",
        "defaultComponents": ["lactose", "eggs"]
      },
      {
        "name": "Chocolate",
        "defaultComponents": ["cocoa", "nuts"]
      },
      {
        "name": "Coffees",
        "defaultComponents": ["lactose", "caffeine", "sugar"]
      },
      {
        "name": "Bread",
        "defaultComponents": ["wheat", "gluten"]
      }
    ]
  },

  "symptomsHistory": {
    "values": [
      {
        "symptomId": 1,
        "option": "Bottom",
        "severity": 3,
        "datetime": "2021-05-28T15:29:52"
      },
      {
        "symptomId": 2,
        "option": "Left side",
        "severity": 5,
        "datetime": "2021-05-28T15:29:52"
      }
    ]
  },

  "symptomsCatalogue": {
    "values": [
      {
        "symptomId": 1,
        "name": "Stomach",
        "options": ["Upper", "Middle", "Bottom"]
      },
      {
        "symptomId": 2,
        "name": "Cramps",
        "options": ["Left side", "Middle", "Right side"]
      }
    ]
  }
}
`;
