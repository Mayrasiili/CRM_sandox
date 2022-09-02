import React from 'react';
import { useForm } from '@mantine/form';
import {
  Paper,
  createStyles,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core';

import * as M from "../../configuration/method.js";
import APP from "../../configuration/config.js";

const useStyles = createStyles((theme) => ({
  wrapper: {
    minHeight: 900,
    backgroundSize: 'cover',
    backgroundImage:
      'url(/assets/loginImage.jpg)',
  },

  form: {
    borderRight: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    minHeight: 900,
    maxWidth: 450,
    paddingTop: 80,

    [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
      maxWidth: '100%',
    },
  },

  title: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  logo: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    width: 120,
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}));

const Login = props => {
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
        username: "",
        password: "",
        rememberUsername: false
    },

    validate: {
        username: (value) => (/^[a-zA-Z0-9]{1,}$/.test(value) ? null : 'Invalid username'),
    },
    });

  React.useEffect(() => {
      checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
      M.sendGetData(APP.SERVER_ENDPOINTS.LOGIN_CHECK).then((response) => {
          if(response.username) props.login(response);
      }).catch(error => {
          if(APP.DEBUG) console.log(error);
      });
  }

  const sendLoginRequest = (formData) => {
      fetch(APP.SERVER_ENDPOINTS.LOGIN, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
      }).then(response => {
          if (!response.ok) {
              // Reject the promise if the response is not valid (2xx)
              throw new Error(response.statusText);
          } else {
              return response.text()
          }
      }).then(data => {
          let parsed = JSON.parse(data);
          window.localStorage.setItem(APP.TOKEN_KEY, parsed.token)
          checkLoginStatus();
      }).catch(error => {
          if(APP.DEBUG) console.log(error);
      });
  }

  return (
    <div className={classes.wrapper}>
         <form onSubmit={form.onSubmit((values) => sendLoginRequest(values))}>
          <Paper className={classes.form} radius={0} p={30}>
            <Title order={2} className={classes.title} align="center" mt="md" mb={50}>
              Welcome back to TPJaakko!
            </Title>

            <TextInput label="Username" placeholder="Name of the user" size="md" {...form.getInputProps('username')}/>
            <PasswordInput label="Password" placeholder="Password of the user" mt="md" size="md" {...form.getInputProps('password')}/>
            <Checkbox label="Remember Username" mt="xl" size="md"  {...form.getInputProps('rememberUsername', { type: 'checkbox' })}/>
            <Button fullWidth mt="xl" size="md" type="submit">
              Login
            </Button>

            <Text align="center" mt="md">
              Don&apos;t have an account?{' '}
              <Anchor href="#" weight={700} onClick={(event) => event.preventDefault()}>
                TOO BAD!
              </Anchor>
            </Text>
          </Paper>
         </form>
    </div>
  );
}

export default Login;
