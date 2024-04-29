const chatInput = document.querySelector(".chat_input .input_msg");
const sendChatBtn = document.querySelector(".chat_input i");
const chatBox = document.querySelector(".chatbox")


// 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

let userMessage;
const API_KEY = "sk-proj-cNIyx2pXMAfAQecj9ODFT3BlbkFJjNcUUM53FnqcLPAAjvOI";

const createChatLi = (message, className) => {
    // creating a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p>${message}</p><i class="fa-solid fa-robot"></i>` : `<i class="fa-solid fa-robot"></i><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const generateResponse = ()=>{
    const API_URL ="https://api.openai.com/v1/chat/completions";

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{role: "user", content: userMessage}]
        })
    }


    fetch(API_URL, requestOptions).then(res => res.json()).then(data =>{
        console.log(data)
    }).catch((error) =>{
        console.log(error);

    })
}


const handleChat = ()=>{
    userMessage = chatInput.value.trim();
    if(!userMessage) return;

    chatBox.appendChild(createChatLi(userMessage, "outgoing"));

    setTimeout(() => {
        // Display thinking message while waiting for the response
        chatBox.appendChild(createChatLi("Thinking...", "incoming"));
        generateResponse();
    }, 300);

    chatInput.value = "";
}

sendChatBtn.addEventListener("click", handleChat);