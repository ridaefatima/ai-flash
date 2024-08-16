import { NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';
import dotenv from 'dotenv';

dotenv.config();

const inference = new HfInference(process.env.HUGGINGFACE_API_KEY);

const systemPrompt = `
You are a helpful assistant that generates flashcards. You take in text and generate exactly 10 flashcards from it. Both back and front should be one short sentence long. Aim to create a balanced set of flashcards that covers the topic comprehensively.  You MUST return your response in the following JSON format, with no additional text before or after the JSON:

{
  "flashcards":[
    {
      "front": str,
      "back": str
    },
    //...(8 more flashcards)

  ]
}
`;

export async function POST(req) {
    const data = await req.text(); // Read the raw text from the request

    const context = `${systemPrompt}\n\nText: ${data}`;

    try {
        const completion = await inference.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [{ role: "user", content: context }],
            max_tokens: 500,
        });

        // Log the raw response content for debugging
        let responseContent = completion.choices[0]?.message?.content || '{}';
        console.log('Raw response content:', responseContent);

        // Sanitize and attempt to parse the JSON response
        let flashcards = [];
        try {
            responseContent = sanitizeJson(responseContent);
            flashcards = JSON.parse(responseContent).flashcards || [];
        } catch (parseError) {
            console.error('JSON Parsing Error:', parseError.message);
        }

        // Filter out invalid flashcards
        const validFlashcards = flashcards.filter(card => {
            return card.front && typeof card.front === 'string' &&
                   card.back && typeof card.back === 'string';
        });

        // Return the valid flashcards as a JSON response
        return NextResponse.json(validFlashcards);
    } catch (error) {
        // Log and return an error response if something goes wrong
        console.error(`Error generating flashcards: ${error.message}`);
        return NextResponse.json({ error: `Error generating flashcards: ${error.message}` });
    }
}

// Helper function to sanitize JSON content by removing incomplete or invalid sections
function sanitizeJson(content) {
    try {
        // Attempt to find and remove any unterminated strings or invalid JSON
        let sanitizedContent = content;

        // Remove incomplete flashcard entries or lines that may cause JSON parsing errors
        sanitizedContent = sanitizedContent.replace(/,\s*{\s*"front":\s*"[^"]*$/, '');

        return sanitizedContent;
    } catch (error) {
        console.error('Error sanitizing JSON:', error.message);
       return
    }
}
