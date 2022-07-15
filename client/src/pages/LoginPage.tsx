import { Button, Card, Container, Row, Stack } from 'solid-bootstrap';
import { SiGithub } from 'solid-icons/si';
import { Component } from 'solid-js';

const LoginPage: Component = () => {
  return (
    <Container class='py-5 h-100'>
      <Row class='d-flex justify-content-center align-items-center h-100'>
        <Card class='border-primary p-3'>
          <Card.Title>Please Login</Card.Title>
          <Card.Body>
            <Stack gap={3}>
              <Button rel='external' href='/auth/google'>
                Login with Google
              </Button>
              <Button rel='external' href='/auth/discord'>
                Login with Discord
              </Button>
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
