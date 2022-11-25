const collegeModel = require('../Models/CollegeModel.js');
const internModel = require('../Models/InternModel.js');

const { checkName, checkUrl, validValue, strLower } = require('../Validator/valid.js');


//>--------------------------CREATE-COLLEGE API-----------------------------<

const createCollege = async (req, res) => {

    try {
         const { name, fullName, logoLink } = req.body

        if (Object.keys(req.body).length == 0) {
            return res.status(400).send({ status: false, message: "Please Enter details In Body😒😒😒" });
        }
        if (!validValue(name)) {
            return res.status(400).send({ status: false, message: 'Please Enter College Name😑😑😑' });
        }
        if (!checkName(name)) {
            return res.status(400).send({ status: false, message: 'Please Enter A Valid College Name😑😑😑!' });
        }
        if (!validValue(fullName)) {
            return res.status(400).send({ status: false, message: 'Please Enter College FullName😑😑😑' });
        }
        if (!checkName(fullName)) {
            return res.status(400).send({ status: false, message: 'Please Enter A Valid College FullName😑😑😑!' });
        }
        if (!validValue(logoLink)) {
            return res.status(400).send({ status: false, message: 'Please Enter College Logolink😑😑😑' });
        }
        if (!checkUrl(logoLink)) {
            return res.status(400).send({ status: false, message: 'Please Enter A Valid Logolink😑😑😑!' });
        }
        if (!strLower(name) ) {
            return res.status(400).send({ status: false, message: 'Please Enter Name In LowerCase Only😑😑😑' });
        }

        const nameExist = await collegeModel.findOne({ $or: [{ name: name },{ fullName: fullName }] })

        if (nameExist) {
            return res.status(400).send({ status: false, message: 'College Name Already Exist🤦‍♀️🤦!' });
        }

        const college = await collegeModel.create(req.body)

        const getCollege = await collegeModel.findOne(college).select({ _id: 0, createdAt: 0, updatedAt: 0, __v: 0 })

        return res.status(201).send({ status: true, data: getCollege });
    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}


//>--------------------------GET-COLLEGEDETAILS-API-----------------------------<

const getCollegeDetails = async (req, res) => {
    try {

        const { collegeName } = req.query
    
        if (!validValue(collegeName)) {
            return res.status(400).send({ status: false, message: 'Please Enter CollegeName😑😑😑' });
        }
        if (!strLower(collegeName)){
            return res.status(400).send({ status: false, message: 'Please Enter CollegeName In LowerCase Only😑😑😑' });
        }  
        const getCollege = await collegeModel.findOne({ name: collegeName }).select({name:1,fullName:1,logoLink:1}).lean()

        if (!getCollege) {
            return res.status(400).send({ status: false, message: 'CollegeName Does Not Exist😑😑😑' });
        }
        const getInterns = await internModel.find({ collegeId: getCollege._id }).select({ name: 1, email: 1, mobile: 1, _id: 1 })

        getCollege.interns = getInterns
        return res.status(201).send({ status: true, data: getCollege });project/internshipGroup21

    }
    catch (error) {
        return res.status(500).send({ status: false, message: error.message });
    }
}

module.exports = { createCollege, getCollegeDetails }
