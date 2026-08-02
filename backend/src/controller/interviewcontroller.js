import pdf from "pdf-parse";
import GenInterview from "../services/ai.js";
import interviewReportModel from "../schema/interview.model.js";

async function GenerateInterview(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Resume file is required",
      });
    }

    // Extract text from PDF
    const pdfData = await pdf(req.file.buffer);

    const { selfDescription, jobDescription } = req.body;

    const interViewReportByAi = await GenInterview({
      resume: pdfData.text,
      selfDescription,
      jobDescription,
    });

    console.log(JSON.stringify(interViewReportByAi, null, 2));

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: pdfData.text,
      selfDescription,
      jobDescription,
      ...interViewReportByAi,
    });

    res.status(201).json({
      message: "Interview report generated successfully.",
      data: interviewReport,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
}

// Get interview report by ID
async function getInterviewReportById(req, res) {
  const { interviewId } = req.params;

  const InterviewReport = await interviewReportModel.findOne({
    user: interviewId,
  });

  if (!InterviewReport) {
    return res.status(404).json({
      message: "Interview Report not Found",
    });
  }

  res.status(200).json({
    message: "Interview Report Fetched Successfully",
    InterviewReport,
  });
}

// Get all interviews
async function getAllInterview(req, res) {
  const interviewReport = await interviewReportModel
    .find({
      user: req.user.id,
    })
    .sort({ createdAt: -1 })
    .select(
      "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps",
    );

  res.status(200).json({
    message: "Interview Reports fetched successfully",
    interviewReport,
  });
}

export { GenerateInterview, getInterviewReportById, getAllInterview };
