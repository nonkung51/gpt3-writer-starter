import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix = 
`
Write me a Sun Tzu-style wisdom from the message below. Please include every detail in it and show that the writer has no feelings when saying it.

Message: 
`;
const generateAction = async (req, res) => {
  // Run first prompt

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput} \n`,
    temperature: 0.7,
    max_tokens: 250,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;