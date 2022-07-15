import { Button, Card, Container, Form, Row, Spinner, Stack } from 'solid-bootstrap';
import { SiGithub } from 'solid-icons/si';
import { Component, createSignal, Match, Switch } from 'solid-js';
import GoogleLogo from '../icons/btn_google_dark_normal_ios.svg';
import { magicLoginHandler } from '../lib/magiclogin';

const LoginPage: Component = () => {
  const [magicLinkPage, setMagicLinkPage] = createSignal(0); // 0, 1 - email, 2 - code
  const [email, setEmail] = createSignal('');
  const [token, setToken] = createSignal('');
  const [waiting, setWaiting] = createSignal(false);
  return (
    <Container class='py-5 h-100'>
      <Row class='d-flex justify-content-center align-items-center h-100'>
        <Card class='bg-secondary p-3'>
          <Card.Title>
            {magicLinkPage() === 0 ? (
              'Please Login'
            ) : (
              <div class='d-flex justify-content-between'>
                Magic Link
                <Button size='sm' onClick={() => setMagicLinkPage(0)}>
                  Back to Login
                </Button>
              </div>
            )}
          </Card.Title>
          <Card.Body>
            <Stack gap={3}>
              <Switch>
                <Match when={magicLinkPage() === 0}>
                  <Button class='google-login-btn' rel='external' href='/auth/google'>
                    <img src={GoogleLogo} />
                    Login with Google
                  </Button>
                  <Button class='discord-login-btn' rel='external' href='/auth/discord'>
                    Login with Discord
                  </Button>
                  <Button onClick={() => setMagicLinkPage(1)}>Email me a Magic Link</Button>
                </Match>
                <Match when={magicLinkPage() === 1}>
                  <Form.Group class='mb-3' controlId='formBasicEmail'>
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      size='sm'
                      type='email'
                      onInput={(e: Event) => {
                        const el = e.target as HTMLInputElement;
                        setEmail(el.value);
                      }}
                      placeholder='Enter email'
                    />
                    <Form.Text class='text-muted'>Fill in your email address to be emailed a magic login link.</Form.Text>
                  </Form.Group>
                  <Button
                    onClick={() => {
                      setWaiting(true);
                      magicLoginHandler(email())
                        .then((val) => {
                          setMagicLinkPage(2);
                          setToken(val);
                          setWaiting(false);
                        })
                        .catch(console.error);
                    }}>
                    {waiting() ? (
                      <>
                        Sending <Spinner as='span' animation='border' size='sm' role='status' aria-hidden='true' />
                        <span class='visually-hidden'>Loading...</span>
                      </>
                    ) : (
                      'Send me the Link!'
                    )}
                  </Button>
                </Match>
                <Match when={magicLinkPage() === 2}>
                  <p>
                    Email Sent! Please look for an email from <strong>events@nwest.link</strong>
                  </p>
                  <p class='text-center'>
                    Your login session token is: <code class='ml-4'>{token()}</code>
                  </p>
                </Match>
              </Switch>
              <hr />
              <p class='text-center'>
                This is a website which provides collaboration and reference for group-planned events. Find the project source on{' '}
                <a href='https://github.com/nwesterhausen/events-webapp' target='_blank' class='text-nowrap text-decoration-none text-primary'>
                  <SiGithub class='icon-fix' /> Github
                </a>{' '}
                if you're interested in trying it out.
              </p>
            </Stack>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default LoginPage;
