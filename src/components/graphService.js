// graphService.js

export async function getMessages(accessToken) {
    // const endpoint = 'https://graph.microsoft.com/v1.0/me/messages';
    const endpoint = `https://graph.microsoft.com/v1.0/me/messages?$filter=(from/emailAddress/address) eq 'warrenpeace014@gmail.com'`;
    
    const response = await fetch(endpoint, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  
    if (!response.ok) {
      throw new Error(`Error fetching messages: ${response.statusText}`);
    }
  
    return await response.json();
  }
  
  export async function sendMessage(accessToken, info) {
    try {
      const sendMail = {
        message: {
          subject: 'New Mail',
          body: {
            contentType: 'Text',
            content: info,
          },
          toRecipients: [
            {
              emailAddress: {
                address: 'warrenpeace014@gmail.com',
              },
            },
          ],
          ccRecipients: [
            {
              emailAddress: {
                address: 'jsamdavidpaul@gmail.com',
              },
            },
          ],
        },
        saveToSentItems: true,
      };
  
      const endpoint = 'https://graph.microsoft.com/v1.0/me/sendMail';
  
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendMail),
      });
  
      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(`Error sending email: ${errorMessage.error.message}`);
      }
  
      return 'Email sent successfully!';
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Error sending email.');
    }
  }
  
  