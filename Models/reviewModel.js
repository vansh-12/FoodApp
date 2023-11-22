const mongoose=require('mongoose');
const db_link='mongodb+srv://admin:8%40NVWcmQuwM2e%2Ai@cluster0.yb9tb6x.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function(db){
  // console.log(db);
  console.log('review db connected');
})
.catch(function(err){
  console.log(err);
});

const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:[true, 'review is required']
    },
    rating:{
        type:Number,
        min:1,
        max:10,
        required:[true,'rating is required']
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'userModel',
        required:[true,'review must belong to a user']
    },
    plan:{
        type:mongoose.Schema.ObjectId,
        ref:'planModel',
        required:[true,'review must belong to a plan']
    }
});
//find findById, findOne
//hook regex ^
reviewSchema.pre(/^find/, function (next) {
    this.populate({//fill 
      path: "user",
      select: "name profileImage"
    }).populate("plan");
    next();
  });

const reviewModel=mongoose.model('reviewModel',reviewSchema);

module.exports=reviewModel;