const { Configuration, OpenAIApi } = require("openai");

const ChatGPT = (msg, token) => {
  const configuration = new Configuration({
    apiKey: token ? token : process.env.APIKEY,
  });
  const openai = new OpenAIApi(configuration);

  const response = openai.createCompletion({
    model: "text-davinci-003",
    prompt: msg,
    temperature: 0.7,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  return response;
};

export default ChatGPT;
