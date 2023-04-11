class message {
    static messageList = [];

    /**
     * Add message to messageList for tracking purposes
     * @param {number} type 0/1 for Error/Success 
     * @param {string} msg The message to be outputted
     */

    addMessage(type, msg) {
        message.messageList.push((type === 0 ? '[Error]' : '[Success]') + ' => ' + msg.trim());
    }

    getMessageList() {
        let msg = '';
        message.messageList.forEach(e => {
            msg += e + '\n';
        });
        return msg;
    }

    clearMessageList() {
        message.messageList = [];
    }
}

module.exports = {message};