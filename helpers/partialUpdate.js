function sqlForPartialUpdate(table, items, key, id) {
  // Ensure table and key are strings to help prevent SQL injection
  if (typeof table !== 'string' || typeof key !== 'string') {
    throw new Error('Table and key must be strings');
  }

  // Initialize an array to keep track of the columns and the associated placeholders
  let columns = [];
  let values = [];

  // Filter out keys that start with "_" -- we don't want these in DB
  Object.entries(items).forEach(([column, value]) => {
    if (!column.startsWith("_")) {
      columns.push(`"${column}"=$${columns.length + 1}`);
      values.push(value);
    }
  });

  // Throw an error if no columns are provided for update
  if (columns.length === 0) {
    throw new Error('No valid columns provided for update');
  }

  // Add the id to the values array
  values.push(id);

  // Build the query string
  let cols = columns.join(", ");
  let query = `UPDATE "${table}" SET ${cols} WHERE "${key}"=$${columns.length + 1} RETURNING *`;

  return { query, values };
}

module.exports = sqlForPartialUpdate;


