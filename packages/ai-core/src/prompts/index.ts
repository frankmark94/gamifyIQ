export const DOCUMENT_ANALYSIS_PROMPT = `
You are an expert in corporate training and compliance. Analyze the following document and extract key information for creating gamified training content.

Document Content:
{content}

Please provide a structured analysis including:
1. Key topics and concepts
2. Important rules or guidelines
3. Common violations or mistakes
4. Risk level assessment
5. Training requirements
6. A concise summary

Format your response as a JSON object with the following structure:
{
  "keyTopics": ["topic1", "topic2", ...],
  "compliance": boolean,
  "riskLevel": "low" | "medium" | "high",
  "requiredTraining": boolean,
  "summary": "Brief summary of the document",
  "importantRules": ["rule1", "rule2", ...],
  "commonViolations": ["violation1", "violation2", ...]
}
`

export const SCENARIO_GENERATION_PROMPT = `
You are an expert game designer specializing in corporate training. Create engaging, realistic scenarios based on the following document analysis.

Document Analysis:
{analysis}

Document Content:
{content}

Create {scenarioCount} training scenarios with the following requirements:
- Each scenario should test understanding of key concepts
- Include realistic workplace situations
- Provide 4 multiple choice options with only one correct answer
- Include detailed explanations for why the correct answer is right
- Make scenarios engaging and relevant to employees
- Vary difficulty levels appropriately

Format your response as a JSON array of scenarios:
[
  {
    "title": "Scenario title",
    "description": "Realistic workplace situation",
    "question": "What should you do?",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": 0,
    "explanation": "Why this is correct",
    "points": 100,
    "difficulty": "medium",
    "topic": "relevant topic"
  }
]
`

export const QUESTION_REFINEMENT_PROMPT = `
Review and improve the following training scenario to ensure it is:
1. Clearly written and unambiguous
2. Relevant to workplace situations
3. Appropriately challenging
4. Educational and engaging

Original Scenario:
{scenario}

Provide an improved version maintaining the same structure but with better clarity, realism, and educational value.
`