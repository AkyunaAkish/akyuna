module.exports = (data, sortBy, sortOrder, sortDataType) => {
    return data.sort((a, b) => {
        if (sortDataType != 'date' && sortOrder == 'desc') {
            return b[sortBy] - a[sortBy];
        } else if (sortDataType != 'date' && sortOrder == 'asc') {
            return a[sortBy] - b[sortBy];
        } else if (sortDataType == 'date' && sortOrder == 'desc') {
            return new Date(b[sortBy]) - new Date(a[sortBy]);
        } else if (sortDataType == 'date' && sortOrder == 'asc') {
            return new Date(a[sortBy]) - new Date(b[sortBy]);
        }
    });
};