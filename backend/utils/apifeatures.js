class ApiFeatures {
    constructor(query,queryStr) {
        this.query = query;
        this.queryStr = queryStr;
    }

    search() {
        const keyword = this.queryStr.keyword ? {
            
            city: {
                $regex : this.queryStr.keyword,
                $options : "i"
            }
            
        } : {};
        console.log(keyword);
        this.query = this.query.find({ ...keyword});
        return this;
    }

    filter() {
        const querycopy = {...this.queryStr};
        //Removing some fileds from category
        const removeFields = ["keyword","page","limit"];
        removeFields.forEach((key)=>delete querycopy[key]);
        //this.query = this.query.find(querycopy);

        //Filter for price
        let queryStr = JSON.stringify(querycopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);
        this.query = this.query.find(JSON.parse(queryStr));
        
        console.log(queryStr);
        return this;

    }

    pagination(resultPerPage) {
        const currentPage = Number(this.queryStr.page) || 1;
        const skip = resultPerPage * (currentPage-1);
        this.query = this.query.limit(resultPerPage).skip(skip);
        return this;
    }
};

module.exports = ApiFeatures;