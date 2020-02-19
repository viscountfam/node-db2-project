
exports.up = function(knex) {
    return knex.schema.createTable('cars', tbl => {
        tbl.increments()
        tbl.string('VIN', 256)
        .notNullable()
        .index()

        tbl.string('make', 128);

        tbl.string('model', 250);

        tbl.integer('mileage')

        tbl.string('condition', 200);


    })
  
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists("cars")
};
