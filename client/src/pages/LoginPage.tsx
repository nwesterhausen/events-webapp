import { Button, Card, Container, Row, Stack } from 'solid-bootstrap';
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
            </Stack>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default LoginPage;
