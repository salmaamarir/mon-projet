import { useState } from 'react';
import { Container, Card, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from './AuthContext';
import api from '../../api/axios';

export default function LoginBS() {
  const { state, dispatch } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch({ type: 'LOGIN_START' });

    try {
      const { data: users } = await api.get(`/users?email=${email}`);

      if (!users || users.length === 0) {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'Email ou mot de passe incorrect'
        });
        return;
      }

      const foundUser = users[0];

      if (foundUser.password !== password) {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: 'Email ou mot de passe incorrect'
        });
        return;
      }

      // ✅ éviter conflit password
      const user = { ...foundUser };
      delete user.password;

      dispatch({ type: 'LOGIN_SUCCESS', payload: user });

    } catch (error) {
      console.error(error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: 'Erreur serveur'
      });
    }
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: '100vh' }}
    >
      <Card style={{ maxWidth: 400, width: '100%' }}>
        <Card.Body>

          <Card.Title
            className="text-center"
            style={{ color: '#1B8C3E', fontWeight: 'bold' }}
          >
            TaskFlow
          </Card.Title>

          {state.error && (
            <Alert variant="danger">{state.error}</Alert>
          )}

          <Form onSubmit={handleSubmit}>

            <Form.Group className="mb-3">
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Control
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                required
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100"
              disabled={state.loading}
              style={{ backgroundColor: '#1B8C3E', border: 'none' }}
            >
              {state.loading ? 'Connexion...' : 'Se connecter'}
            </Button>

          </Form>

        </Card.Body>
      </Card>
    </Container>
  );
}