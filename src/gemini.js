import {GoogleGenerativeAI} from '@google/generative-ai';


const apiKey = "AIzaSyCWfWJ7Ne25n3NdxHCEOn92qlJUXQr6BIY";
const genAI = new GoogleGenerativeAI(apiKey);

async function generateContent(prompt){
    try{
        const model = await genAI.getGenerativeModel({model : 'gemini-1.5-flash'});

        const chatSession = model.startChat({
            generationConfig : {
                temperature : 1,
                topP : 0.95,
                topK : 64,
                maxOutputTokens : 8192,
            },
            history : [],
        });

        const result = await chatSession.sendMessage(prompt);
        return result.response.text();
        }catch(error){
            throw new Error("This is my Error !");
        }
}

export default generateContent;