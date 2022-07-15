export const magicLoginHandler = async (email: string): Promise<string> => {
  // POST a request with the users email or phone number to the server
  const resp = await fetch(`/auth/magiclogin`, {
    method: `POST`,
    body: JSON.stringify({
      // `destination` is required.
      destination: 'nwesterhausen@gmail.com',
      // However, you can POST anything in your payload and it will show up in your verify() method
      name: 'test',
    }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!resp.ok) {
    return 'Failure';
  }
  const json = await resp.json();
  if (json.success) {
    // The request successfully completed and the email to the user with the
    // magic login link was sent!
    // You can now prompt the user to click on the link in their email
    // We recommend you display json.code in the UI (!) so the user can verify
    // that they're clicking on the link for their _current_ login attempt
    // document.body.innerText = json.code
    return json.code;
  }

  return 'Failure';
};
