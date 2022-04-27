export function formatQuestion(question, author) {
    const { id, optionOne, optionTwo } = question;
    const { name, avatarURL } = author;
  
    return { name, id, avatarURL, optionOne, optionTwo };
  }