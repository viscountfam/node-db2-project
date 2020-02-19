
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars').truncate()
    .then(function () {
      // Inserts seed entries
      const cars = [
        {id: 1,
          VIN: "1HGBH41JXMN109231",
          make: "Honda",
          model: "Accord",
          mileage: 12000,
          condition: "good"  },
        {id: 2, 
          VIN: "1HGBH41JLYX976234",
          make: "Ford",
          model: "Mustang",
          mileage: 225000,
          condition: "salvage"
        },
        {id: 3, 
          VIN: "1NRSCH41JXMN159245",
          make: "Mitsubishi",
          model: "Lancer",
          mileage: 2000,
          condition: "pristine"
        }
      ]
      return knex('cars').insert(cars);
    });
};
