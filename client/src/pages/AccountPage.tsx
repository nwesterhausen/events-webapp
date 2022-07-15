import { Alert, Button, Card, Container, Form, Row, Stack } from 'solid-bootstrap';
import { Component } from 'solid-js';
import GoogleLogo from '../icons/btn_google_dark_normal_ios.svg';
import { useAuthContext } from '../providers/Auth';

const LoginPage: Component = () => {
  const authContext = useAuthContext();
  const updateAccountInfo = () => {};
  return (
    <Container class='py-5 h-100'>
      <Row class='d-flex justify-content-center align-items-center h-100'>
        <Card class='bg-secondary p-3'>
          <Card.Body>
            <Alert variant='warning text-dark'>Currently, you are unable to update your name or email. This is coming soon!</Alert>
            <Stack>
              <Form id='account-details' onSubmit={updateAccountInfo}>
                <p class='mb-0 fs-4'>User Details</p>
                <Form.Group controlId='user_name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type='name' value={authContext.auth.user.name} />
                </Form.Group>
                <Form.Group controlId='user_email'>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type='email' value={authContext.auth.user.email} />
                </Form.Group>
                <Button disabled type='submit'>
                  Update
                </Button>
                <hr />
                <p class='mb-0 fs-4'>OAuth Login Providers</p>
                <label for='user_email'>
                  Before you connect the services below, make sure the email address above matches the one used for these accounts.
                </label>
                <Form.Group controlId='exampleForm.ControlInput1'>
                  <Form.Label>Google OAuth ID</Form.Label>
                  <Form.Control type='text' placeholder={authContext.auth.user.googleId || 'unset'} disabled readOnly />
                </Form.Group>
                <Button class='google-login-btn ps-5' rel='external' href='/auth/google'>
                  <img src={GoogleLogo} />
                  Connect Google
                </Button>
                <Form.Group controlId='exampleForm.ControlInput1'>
                  <Form.Label>Discord OAuth ID</Form.Label>
                  <Form.Control type='text' placeholder={authContext.auth.user.discordId || 'unset'} disabled readOnly />
                </Form.Group>
                <Button class='discord-login-btn' rel='external' href='/auth/discord'>
                  Connect Discord
                </Button>
              </Form>
            </Stack>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default LoginPage;
