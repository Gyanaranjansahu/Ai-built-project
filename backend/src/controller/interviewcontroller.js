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
            interviewReport,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: error.message,
        });
    }
}

export default GenerateInterview;