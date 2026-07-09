import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

const interviewReportSchema = z.object({
  title: z.string(),
  matchScore: z.number(),

  technicalQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  behavioralQuestions: z.array(
    z.object({
      question: z.string(),
      intention: z.string(),
      answer: z.string(),
    })
  ),

  skillGaps: z.array(
    z.object({
      skill: z.string(),
      severity: z.enum(["low", "medium", "high"]),
    })
  ),

  preparationPlan: z.array(
    z.object({
      day: z.number(),
      focus: z.string(),
      tasks: z.array(z.string()),
    })
  ),
});

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

function buildFallbackInterviewReport() {
  return {
    title: "Interview Report",
    matchScore: 60,

    technicalQuestions: [
      {
        question: "Explain JavaScript closures.",
        intention: "Check JavaScript fundamentals.",
        answer: "Explain lexical scope and inner functions.",
      },
    ],

    behavioralQuestions: [
      {
        question: "Tell me about a challenge you faced.",
        intention: "Assess problem solving.",
        answer: "Use STAR method.",
      },
    ],

    skillGaps: [
      {
        skill: "Advanced React",
        severity: "medium",
      },
    ],

    preparationPlan: [
      {
        day: 1,
        focus: "React",
        tasks: ["Revise hooks", "Build mini project"],
      },
    ],
  };
}
console.log(process.env.GOOGLE_GENAI_API_KEY);
async function GenInterview({
  resume,
  selfDescription,
  jobDescription,
}) {
  try {
    if (!process.env.GOOGLE_GENAI_API_KEY) {
      return buildFallbackInterviewReport();
    }

    const prompt = `
Generate ONLY valid JSON.

Candidate Resume:
${resume}

Self Description:
${selfDescription}

Job Description:
${jobDescription}

Return EXACTLY this structure:

{
  "title": "string",
  "matchScore": number,
  "technicalQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "behavioralQuestions": [
    {
      "question": "string",
      "intention": "string",
      "answer": "string"
    }
  ],
  "skillGaps": [
    {
      "skill": "string",
      "severity": "low"
    }
  ],
  "preparationPlan": [
    {
      "day": 1,
      "focus": "string",
      "tasks": ["string"]
    }
  ]
}

Do not return markdown.
Do not return explanations.
Return JSON only.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    const report = JSON.parse(response.text);

    // Zod validation
    return interviewReportSchema.parse(report);

  } catch (error) {
    console.log(error);
    return buildFallbackInterviewReport();
  }
}

export default GenInterview;