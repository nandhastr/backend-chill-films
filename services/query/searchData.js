import { Op } from "sequelize";

const searchData = (query, fields) => {
    const conditions = fields.map((field) => ({
        [field]: { [Op.like]: `%${query}%` },
    }));

    return {
        [Op.or]: conditions,
    };
};
export default searchData;