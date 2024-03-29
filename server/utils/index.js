// Requiring ObjectId from mongoose npm package
const ObjectId = require('mongoose').Types.ObjectId;
 
// Validator function
function isValidObjectId(id){
     
    if(ObjectId.isValid(id)){
        if((String)(new ObjectId(id)) === id)
            return true;       
        return false;
    }
    return false;
}

function trimAllObjValue(obj) {
    Object.keys(obj).map(k => 
        obj[k] = typeof obj[k] == 'string' ? obj[k].trim() : obj[k]);
}

// exports
module.exports = {
    isValidObjectId,
    trimAllObjValue
}