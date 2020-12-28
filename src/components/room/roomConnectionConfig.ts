export const configuration = {
    'iceServers': [
        {
            urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
            ],
        },
        { urls: 'stun:stun.services.mozilla.com' },
        { urls: 'turn:numb.viagenie.ca','credential': 'hmprettyplease','username': 'gri-go-riy@mail.ru' }
    ],
    iceCandidatePoolSize: 10,
}
