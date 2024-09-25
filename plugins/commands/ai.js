import axios from 'axios';

async function onCall({ message, api, event = {}, args }) {
    const { threadID, senderID, messageID } = event || {};

    if (args.length === 0) {
        return message.reply("Please provide a question after 'ai'.");
    }

    if (message.isReply && message.attachments && message.attachments[0]) {
        const attachment = message.attachments[0];

        if (attachment.type === "photo") {
            const imageURL = attachment.url;
            const geminiUrl = `https://joncll.serv00.net/chat.php?ask=${encodeURIComponent(args.join(" "))}&imgurl=${encodeURIComponent(imageURL)}`;

            try {
                const response = await axios.get(geminiUrl);
                const { vision } = response.data;

                if (vision) {
                    message.reply(`𝗚𝗲𝗺𝗶𝗻𝗶 𝗩𝗶𝘀𝗶𝗼𝗻 𝗜𝗺𝗮𝗴𝗲 𝗥𝗲𝗰𝗼𝗴𝗻𝗶𝘁𝗶𝗼𝗻\n━━━━━━━━━━━━━━━━━━\n${vision}\n━━━━━━━━━━━━━━━━━━`);
                } else {
                    message.reply("🤖 Failed to recognize the image.");
                }
            } catch (error) {
                message.reply(error.message);
            }

            return;
        }
    }

    const apiUrl = `https://jonellccprojectapis10.adaptable.app/api/gptconvo?ask=${encodeURIComponent(args.join(" "))}&id=${senderID}`;

    try {
        const response = await axios.get(apiUrl);
        const { response: result } = response.data;

        const responseMessage = `𝗖𝗛𝗔𝗧𝗚𝗣𝗧\n━━━━━━━━━━━━━━━━━━\n${result}\n━━━━━━━━━━━━━━━━━━`;
        message.reply(responseMessage);
    } catch (error) {
        message.reply(error.message);
    }
}

export default {
    onCall,
};

//ai command by jonell
