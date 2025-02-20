const httpStatus = require("http-status");
const {getAllDoctorsList, checkTimeSlots} = require("../service/service.doctor")

const handleGetDoctors = async (req, res) => {
    try{
        const doctorList = await getAllDoctorsList();
        console.log(doctorList)
        if (doctorList) res.status(200).json(doctorList);
        else res.status(httpStatus.NOT_FOUND).json([]);
      }catch(error){ 
        res
        .status(httpStatus.BAD_REQUEST)
        .json({ error: error })
    }
}

const handleTimeSlot = async (req, res)=> {
    const { id } = req.params;
    const { date } = req.query;
    
    if(!date){
        return res.status(400).json({ error: "Date is required in YYYY-MM-DD format." });
    }
    
    const result = await checkTimeSlots(id, date);
    if(result.length>0){
        return res.status(200).json(result);
    }else{
        return res.status(400).json({msg: "No slots available"});
    }

}




  
module.exports = {handleGetDoctors, handleTimeSlot};