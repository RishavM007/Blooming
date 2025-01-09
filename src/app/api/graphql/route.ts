// API/graphql/router.ts
import { NextRequest, NextResponse } from 'next/server';

const GRAPHQL_URL = process.env.WORDPRESS_GRAPHQL_URL;

const SIGN_UP_MUTATION = `
  mutation SignUp($firstName: String!, $lastName: String!, $email: String!, $username: String!, $password: String!, $phone: String!) {
    registerUser(
      input: {
        firstName: $firstName
        lastName: $lastName
        email: $email
        username: $username
        password: $password
        phone: $phone
      }
    ) {
      user {
        id
        username
        email
      }
    }
  }
`;

const SIGN_IN_MUTATION = `
  mutation SignIn($email: String!, $password: String!) {
    loginUser(input: { email: $email, password: $password }) {
      token
      user {
        id
        username
        email
      }
    }
  }
`;

export async function POST(req: NextRequest) {
  if (!GRAPHQL_URL) {
    return NextResponse.json({ error: 'GraphQL URL not defined' }, { status: 500 });
  }

  const body = await req.json();

  const { operation, variables } = body;

  let query = '';
  if (operation === 'signUp') {
    query = SIGN_UP_MUTATION;
  } else if (operation === 'signIn') {
    query = SIGN_IN_MUTATION;
  } else {
    return NextResponse.json({ error: 'Invalid operation type' }, { status: 400 });
  }

  try {
    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('GraphQL API error:', error); // Log the error
    return NextResponse.json(
      { error: 'Error connecting to GraphQL API' },
      { status: 500 }
    );
  }
}
