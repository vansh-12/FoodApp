const planModel = require("../Models/planModel");

module.exports.getAllPlans =async function getAllPlans(req,res){
    try{
        let plans = await planModel.find();
     if(plans){
            return res.json({
                message:'allplans retrived',
                data:plans,
            });            
        }else{
            return res.json({
                message:'plans not found',
            });
        }
    }catch(err){
        res.status(50).json({
            message:err.message,
        });
    }
}

module.exports.getPlan =async function getPlan(req,res){
    //console.log(req);
    let id= req.params.id;
    try{
    let plan = await planModel.findById(id);
     if(plan){
            return res.json({
                message:'plan retrived',
                data:plan,
            });            
        }else{
            return res.json({
                message:'plan not found',
            });
        }
    }catch(err){
        res.status(500).json({
            message:err.message,
            mess:"fail"
        });
    }
}

module.exports.createPlan =async function createPlan(req,res){
    try{
        let planData =req.body;
        let createdPlan = await planModel.create(planData);
        return res.json({
            message:'plan created successfully',
            data:createdPlan
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
}

module.exports.deletePlan =async function deletePlan(req,res){
    try{
        let id= req.params.id;

        let deletePlan =await planModel.findByIdAndDelete(id);
        return res.json({
            message:'plan deleted successfully',
            data:deletePlan
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
}

module.exports.updatePlan =async function updatePlan(req,res){
    try{
        let id= req.params.id;
        let dataToBeUpdated = req.body;
        console.log(id);
        console.log(dataToBeUpdated);
        let keys=[];
        for(let key in dataToBeUpdated){
            keys.push(key);
        }
        let plan =await planModel.findById(id);
        for(let i=0;i<keys.length;i++){
            plan[keys[i]] = dataToBeUpdated[keys[i]];
        }
        console.log(plan);
        //doc
        await plan.save();
        return res.json({
            message:"plan updated successfyull",
            data:plan
        });

    }catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
}

module.exports.top3Plan =async function top3Plan(req,res){
    try{
        const plans= await planModel.find().sort({
            ratingsAverage:-1
        }).limit(3);
        return res.json({
            message:'top3 plans',
            data:plans
        })
    }catch(err){
        res.status(500).json({
            message:err.message,
        });
    }
}
