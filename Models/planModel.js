//mongoose connect to mongodb
const mongoose = require("mongoose");
//8@NVWcmQuwM2e*i
const db_link = "mongodb+srv://admin:8%40NVWcmQuwM2e%2Ai@cluster0.yb9tb6x.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(db_link)
    .then(function (db) {
        console.log("plan db connect");
        //console.log(db);
    })
    .catch(function (err) {
        console.log(err);
    });
//schema
const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        //custom errror message
        maxlength: [20, 'plan name should not increase 20 chars']
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: [true, 'price not enterrred']
    },
    ratingsAverage: {
        type: Number
    },
    discount: {
        type: Number,
        Validate: [function () {
            return this.discount < 100
        }, 'discount should not exceed prrice']
    }
});
//model
const planModel = mongoose.model("planModel", planSchema);
//iifee just involked func
/*(async function createPlan() {
    let planObj = {
        name: 'Superfood001',
        duration: 30,
        price: 1000,
        ratingsAverage: 5,
        discount: 20
    }
    //let data=await planModel.create(planObj);//or
    //console.log(data);
    const doc = new planModel(planObj);//documnt made
    await doc.save();
})();*/


module.exports = planModel;
