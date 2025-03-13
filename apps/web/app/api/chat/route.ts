import { HfInference } from '@huggingface/inference';

const inference = new HfInference(process.env.HUGGINGFACEHUB_ACCESS_TOKEN);

export async function POST(req:Request){
  try{
    console.log("hi");
   const { messages } = await req.json();
   console.log(messages);
   const latestMessage=messages[messages.length-1].content;
   const template={
    role: "system",
    content: `Answer the question below as an AI Assistant knowledgeable about PostPearl, a social media platform developed by Vishwas in 2024 during his time at IIIT Allahabad. PostPearl is designed for teenagers and developers, offering features like posts (text, images, videos), an AI chatbot, and user profiles. Its technology stack includes React (Next.js) for the frontend, Apollo Server with Prisma for the backend, PostgreSQL for the database, cloud-based hosting, and security measures such as OAuth authentication and secure APIs. If the provided context doesn't cover specific information, use your existing knowledge without mentioning the source or any limitations. Format responses using markdown where applicable.\n-----------\nQuestion: ${latestMessage}`,
  }
  
   const response = await inference.chatCompletion({
    model: 'TinyLlama/TinyLlama-1.1B-Chat-v1.0', 
    messages: [template],
  });
const message = response.choices[0].message;
const responseBody = { message };
console.log(responseBody);
return new Response(JSON.stringify(responseBody), {
  headers: { 'Content-Type': 'application/json' },
});
  }
  catch(error){
   console.log(error);
  }
 }