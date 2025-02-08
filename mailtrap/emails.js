// const { mailtrapClient, sender } = require("../mailtrap/mailtrapConfig.js");
// const { VERIFICATION_EMAIL_TEMPLATE } = require("../mailtrap/emailTemplates.js");


export const sendVerificationEmail = async (email, verificationCodeToken) => {
    const recipients = [
        {
            email: email,
        }
    ];

    try {
      const response =  await mailtrapClient.send({
            from: sender,
            to: recipients,
            subject: "Verify your email",
            html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationCodeToken),
            category: "Verification Email",
        });

        console.log("Email sent successfully", response);

    } catch (error) {
            console.log('Error sending verification', error);
            throw new Errorrror(`Error sending verification email: ${error}`);
    }
    }; 

