// utils/gqlClient.ts

export const signUpUser = async (userData: { firstName: string; lastName: string; email: string; username: string; password: string; phone: string }) => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        operation: 'signUp',
        variables: userData,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data.registerUser;
  } catch (error) {
    console.error('Sign-up error:', error);
    throw error;
  }
};

export const signInUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await fetch('/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        operation: 'signIn',
        variables: credentials,
      }),
    });

    const data = await response.json();
    if (data.errors) {
      throw new Error(data.errors[0].message);
    }

    return data.data.loginUser;
  } catch (error) {
    console.error('Sign-in error:', error);
    throw error;
  }
};
