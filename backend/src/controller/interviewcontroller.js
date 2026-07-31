import { PDFParse } from "pdf-parse";
// convert file into text
import GenInterview from "../services/ai.js";
import interviewReportModel from "../schema/interview.model.js";

async function GenerateInterview(req, res) {
    try {
        const parser = new PDFParse({
            data: new Uint8Array(req.file.buffer),
        });

        const resumeContent = await parser.getText();

        const { selfDescription, jobDescription } = req.body;

        const interViewReportByAi = await GenInterview({
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
        });
console.log(JSON.stringify(interViewReportByAi,null,2));

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeContent.text,
            selfDescription,
            jobDescription,
            ...interViewReportByAi,
        });

        res.status(201).json({
            message: "Interview report generated successfully.",
            data:interviewReport,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
}

// get interview report by id 

async function getInterviewReportById(req,res){
    const{interviewId}=req.params
    console.log(interviewId);
    
    const InterviewReport=await interviewReportModel.findOne({user:interviewId})

    if(!InterviewReport){
        return res.status(404).json({
            message:"Interview Report not Found"
        })
    }
    res.status(200).json({
        message:"Interview Report Fetched Successfully",
        InterviewReport
    })
}
/**
 * get all the interview based on login user
 */
async function getAllInterview(req,res){
    const interviewReport=(await interviewReportModel.find({user:req.user})).sort({createdAt:-1}).select("-resume -selfDescription -jobDescription -_v -technicalQuestions -behavioralQuestions -skillGaps")
}
export { GenerateInterview,getInterviewReportById,getAllInterview};