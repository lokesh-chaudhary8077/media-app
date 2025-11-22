// Mock socket functions to avoid Socket.IO dependency temporarily
export const getSocketId = (receiverId) => {
    return null // Return null when no socket connection
}

export const io = {
    emit: (event, data) => {
        console.log(`Socket emit: ${event}`, data)
    },
    to: (socketId) => ({
        emit: (event, data) => {
            console.log(`Socket emit to ${socketId}: ${event}`, data)
        }
    })
}
