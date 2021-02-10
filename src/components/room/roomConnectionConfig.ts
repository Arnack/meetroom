export const configuration = {
    host: 'http://ec2-34-227-149-124.compute-1.amazonaws.com:8888',
    'iceServers': [
        {
            urls: [
                'stun:stun1.l.google.com:19302',
                'stun:stun2.l.google.com:19302',
                'stun:stun.services.mozilla.com'
            ],
        },
        // { urls: 'turn:numb.viagenie.ca','credential': 'hmprettyplease','username': 'gri-go-riy@mail.ru' }
    ],
    iceCandidatePoolSize: 10,
}
