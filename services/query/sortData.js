export const sortData = (data, sortField, sortOrder = "ASC", validSortFields) => {
    if (sortField && !validSortFields.includes(sortField)) {
        throw new Error("Field sorting tidak valid");
    }

    return data.sort((a, b) => {
        if (sortField) {
            if (sortOrder === "DESC") {
                return a[sortField] < b[sortField] ? 1 : -1;
            }
            return a[sortField] > b[sortField] ? 1 : -1;
        }
        return 0;
    });
};
