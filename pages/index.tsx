import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import ProTip from '../src/ProTip';
import Copyright from '../src/Copyright';
import { Link } from '@material-ui/core';
import { useRouter } from 'next/router';
import styles from 'css/styles.module.css';
import logger from 'utils/logger';

const Code = (p: { children: string }) => <code className={styles.inlineCode} {...p} />;

export default function Index() {
  const router = useRouter();
  const { locale, locales, defaultLocale } = router;
  return (
    <Container maxWidth="sm">
      <div className="bg-red-100 p-10 mt-20">
        <h1>Index page</h1>
        <p>Current locale: {locale}</p>
        <p>Default locale: {defaultLocale}</p>
        <p>Configured locales: {JSON.stringify(locales)}</p>

        <Link href="/gsp">
          <a>To getStaticProps page</a>
        </Link>
        <br />

        <Link href="/gsp/first">
          <a>To dynamic getStaticProps page</a>
        </Link>
        <br />

        <Link href="/gssp">
          <a>To getServerSideProps page</a>
        </Link>
        <br />
      </div>
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
      <table>
        <thead>
          <tr>
            <th>Variable Name</th>
            <th>Value</th>
            <th>Added By</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>NEXT_PUBLIC_ENV_VARIABLE</td>
            <td>{process.env.NEXT_PUBLIC_ENV_VARIABLE}</td>
            <td>
              <Code>.env</Code>
            </td>
          </tr>
          <tr>
            <td>NEXT_PUBLIC_ENV_LOCAL_VARIABLE</td>
            <td>{process.env.NEXT_PUBLIC_ENV_LOCAL_VARIABLE}</td>
            <td>
              <Code>.env.local</Code>
            </td>
          </tr>
          <tr>
            <td>NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE</td>

            <td>{process.env.NEXT_PUBLIC_DEVELOPMENT_ENV_VARIABLE}</td>
            <td>
              <Code>.env.development</Code>
            </td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}

// `getStaticProps`, and similar Next.js methods like `getStaticPaths` and `getServerSideProps`
// only run in Node.js. Check the terminal to see the environment variables
export async function getStaticProps() {
  // Using the variables below in the browser will return `undefined`. Next.js doesn't
  // expose environment variables unless they start with `NEXT_PUBLIC_`
  logger.log('info', `[Node.js only] ENV_VARIABLE: ${process.env.ENV_VARIABLE}`);
  logger.log('info', `[Node.js only] ENV_LOCAL_VARIABLE: ${process.env.ENV_LOCAL_VARIABLE}`);

  return { props: {} };
}
