import user_1 from '../../public/images/Hillary_Clinton.jpg';
import user_3 from '../../public/images/Ryan_Gosling.png';

export default [
    {
        id: 1,
        userId: 1,
        title: 'Hello. Is anyone here?',
        description: 'This place\'s been rather quiet of late.  Wonder what everyone\'s up to?',
        avatar: user_1,
        firstName: 'Hillary',
        secondName: 'Clinton',
        comments: [
            {
                id: 1,
                userId: 2,
                content: 'yeah wow this place is pretty dead pacman is my favorite game and I thought other people would be more active here.',
                avatar: null,
                firstName: 'Bob',
                secondName: 'Dylan'
            },
            {
                id: 2,
                userId: 3,
                content: 'Shame, too...this past December 23/24, I got my 8th split-screen on Pac-Man (topping 3,256,XXX).  What\'s significant about this is it\'s my first such try on the arcade Fast Game (difficulty 2) and it beats my first "topper" on the slow game (3,252,010 in \'86--beating John Birkner\'s 3,214,270 Guiness \'82 record at the time).',
                avatar: user_3,
                firstName: 'Ryan',
                secondName: 'Gosling'
            }
        ]
    },
    {
        id: 2,
        userId: 3,
        title: 'Where can a I find Ms. Pac-Man with sound?',
        description: 'I have searched everywhere. I find knock offs and ones without sound. Where can I go play or download the original Ms.Pac-Man with sound?....I dont even care if I have to pay to do it.',
        avatar: user_3,
        firstName: 'Ryan',
        secondName: 'Gosling',
        comments: []
    }
];
