export const doLogin = async (username: any,
                              database: any,
                              handleUpdate: any) => {
    await database.ref('/notifs/' + username).remove()
    database.ref('/notifs/' + username).on('value', (snapshot: any) => {
        snapshot.exists() && handleUpdate(snapshot.val(), username)
    })
}

export const doOffer = async (to: any, offer: any, database: any, username: any) => {
    await database.ref('/notifs/' + to).set({
        type: 'offer',
        from: username,
        offer: JSON.stringify(offer)
    })
}

export const doAnswer = async (to: any, answer: any, database: any, username: any) => {
    await database.ref('/notifs/' + to).update({
        type: 'answer',
        from: username,
        answer: JSON.stringify(answer)
    })
}

export const doLeaveNotif = async (to: any, database: any, username: any) => {
    await database.ref('/notifs/' + to).update({
        type: 'leave',
        from: username
    })
}

export const doCandidate = async (to: any, candidate: any, database: any, username: any) => {
    // send the new candiate to the peer
    await database.ref('/notifs/' + to).update({
        type: 'candidate',
        from: username,
        candidate: JSON.stringify(candidate)
    })
}
