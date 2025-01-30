const Filter = (query, fields) => {
    const conditions = {};

    Object.keys(query).forEach((key) => {
        if (fields.includes(key)) {
            conditions[key] = query[key];
        }
    });

    return conditions;

};

export default Filter;
