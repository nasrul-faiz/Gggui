const axios = require('axios');

module.exports = async function (sock, chatId) {
    try {
        const apiKey = process.env.NEWS_API_KEY || '';
        if (!apiKey) {
            await sock.sendMessage(chatId, { text: '❌ NEWS_API_KEY is not configured.' });
            return;
        }
        const response = await axios.get(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`);
        const articles = response.data.articles.slice(0, 5); // Get top 5 articles
        let newsMessage = '📰 *Latest News*:\n\n';
        articles.forEach((article, index) => {
            newsMessage += `${index + 1}. *${article.title}*\n${article.description}\n\n`;
        });
        await sock.sendMessage(chatId, { text: newsMessage });
    } catch (error) {
        console.error('Error fetching news:', error);
        await sock.sendMessage(chatId, { text: 'Sorry, I could not fetch news right now.' });
    }
};
