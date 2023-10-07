import { Accordion, AccordionDetails, AccordionSummary, Box, Stack, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export type questionAnswer = {
    question: string;
    answer: string;
};

const questions: questionAnswer[] = [
    {
        question: 'What is this project about?',
        answer: 'This project is a real-time communication platform that allows users to create and join public rooms for video, audio, or text-based communication. It leverages WebSockets for signaling and WebRTC for peer-to-peer communication.'
    },
    {
        question: 'How do I create a room?',
        answer: 'To create a room, simply choose the type of room you want (video, audio, or text), provide a unique room name, and click the "Confirm" button. Your room will be generated, and you\'ll receive a room link to share with others.'
    },
    {
        question: 'Can anyone join my room?',
        answer: 'Yes, all rooms are publicly visible, and anyone with the room link can join. However, room types (video, audio, or text) restrict the type of communication allowed within the room.'
    },
    {
        question: 'Is there a limit to the number of participants in a room?',
        answer: 'The number of participants in a room depends on the server\'s capacity and the room type.Video and audio rooms may have limitations due to bandwidth and processing constraints, while text rooms can accommodate a larger number of users.'
    },
    {
        question: 'Is my communication secure in these rooms?',
        answer: 'Yes, WebRTC provides end-to-end encryption for video and audio communication, ensuring your conversations are secure. Text rooms also use secure communication protocols.'
    },
    {
        question: 'Do I need to install any software or plugins to use this service?',
        answer: 'No, you don\'t need to install any additional software or plugins.This project works directly in your web browser, utilizing the built-in WebRTC capabilities.'
    },
    {
        question: 'Can I use this service on mobile devices?',
        answer: 'Yes, this project is accessible from mobile devices as well as desktop computers. Ensure you have a compatible web browser for the best experience.'
    },
    {
        question: 'Is there any cost associated with using this service?',
        answer: 'No, this service is entirely free to use. We do not charge users for creating or joining rooms.'
    },
    {
        question: 'Can I customize the appearance and features of my room?',
        answer: 'Currently, room customization options are limited, but we plan to add more features in future updates to allow users to personalize their rooms further.'
    },
    {
        question: 'How can I report abusive behavior or content in a room?',
        answer: 'We take user safety seriously. If you encounter abusive behavior or inappropriate content, please use the reporting feature, and our team will investigate and take appropriate action.'
    },
    {
        question: 'Can I use this service without creating an account?',
        answer: 'Yes, you can use the service without creating an account. We prioritize user privacy and do not require users to register.'
    },
    {
        question: 'How do I invite someone to join my room?',
        answer: 'To invite someone to your room, simply share the room link with them via email, messaging apps, or any other preferred communication method.'
    },
    {
        question: 'What browsers are supported for this service?',
        answer: 'This service is compatible with modern web browsers, including Google Chrome, Mozilla Firefox, Microsoft Edge, and Safari. Ensure you\'re using an up-to-date version for the best experience.'
    },
    {
        question: ' Is there a time limit for how long a room can be active?',
        answer: 'Rooms remain active as long as there are participants in them. They will automatically close when the last participant leaves.'
    },
    {
        question: 'Can I record conversations in a room?',
        answer: 'Currently, we do not offer built-in recording functionality. However, you can use third-party screen recording software to capture conversations if needed.'
    },
    {
        question: 'Are there any geographic restrictions on using this service?',
        answer: ' No, there are no geographic restrictions. This service is accessible worldwide, as long as you have an internet connection and a compatible web browser.'
    }
];

export default function FAQ() {
    return (
        <Box sx={{ maxWidth: theme => theme.breakpoints.values.md, marginX: 'auto' }}>

            <Typography variant="h2" >
                FAQ
            </Typography>

            {questions.map((question, index) => {
                return (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Stack direction={'row'} gap={2} sx={{ justifyContent: 'start', alignItems: 'center' }}>
                                <Typography fontWeight={"bold"} textAlign={'end'} component="div"
                                    sx={{ minWidth: '24px' }}
                                >
                                    {`${index}.`}
                                </Typography>
                                <Typography fontWeight={"bold"}>{`${question.question}`}</Typography>
                            </Stack>

                        </AccordionSummary>

                        <AccordionDetails>
                            <Typography>
                                {question.answer}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </Box>

    );
}