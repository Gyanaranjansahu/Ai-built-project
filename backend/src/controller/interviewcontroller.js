import mongoose from "mongoose";
import { PDFParse } from "pdf-parse";
import GenInterview from "../services/ai.js";
import interviewReportModel from "../schema/interview.model.js";

async function GenerateInterview(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Resume file is required",
      });
    }

    // Extract text from PDF 
    const parser = new PDFParse({
      data: new Uint8Array(req.file.buffer),
    });

    const pdfData = await parser.getText();
    const resumeText = pdfData?.text?.trim() || "";

    const { selfDescription = "", jobDescription = "" } = req.body;

    const interViewReportByAi = await GenInterview({
      resume: resumeText,
      selfDescription,
      jobDescription,
    });

    const interviewReport = await interviewReportModel.create({
      user: req.user.id,
      resume: resumeText,
      selfDescription,
      jobDescription,
      ...interViewReportByAi,
    });

    res.status(201).json({
      success: true,
      message: "Interview report generated successfully.",
      data: interviewReport,
      interviewReport,
    });
  } catch (error) {
    console.error("GenerateInterview Error:", error);

    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate interview report",
    });
  }
}

async function getInterviewReportById(req, res) {
  try {
    const { interviewId } = req.params;

    if (!interviewId) {
      return res.status(400).json({
        success: false,
        message: "Interview ID is required",
      });
    }

    let interviewReport = null;

    if (mongoose.Types.ObjectId.isValid(interviewId)) {
      // 1. Try finding by direct report ID
      interviewReport = await interviewReportModel.findById(interviewId);

      // 2. If not found by direct ID, check if it was requested by user ID
      if (!interviewReport) {
        interviewReport = await interviewReportModel
          .findOne({ user: interviewId })
          .sort({ createdAt: -1 });
      }
    }

    if (!interviewReport) {
      return res.status(404).json({
        success: false,
        message: "Interview Report not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Interview Report Fetched Successfully",
      InterviewReport: interviewReport,
      interviewReport,
      data: interviewReport,
    });
  } catch (error) {
    console.error("getInterviewReportById Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}

async function getAllInterview(req, res) {
  try {
    const interviewReports = await interviewReportModel
      .find({
        user: req.user.id,
      })
      .sort({ createdAt: -1 })
      .select(
        "-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps"
      );

    res.status(200).json({
      success: true,
      message: "Interview Reports fetched successfully",
      interviewReport: interviewReports,
      interviewReports,
      data: interviewReports,
    });
  } catch (error) {
    console.error("getAllInterview Error:", error);
    res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
}

export {
  GenerateInterview,
  getInterviewReportById,
  getAllInterview,
};
