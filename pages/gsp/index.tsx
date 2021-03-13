import { useRouter } from "next/router";
import Link from "next/link";

const GspPage = (props) => {
  const router = useRouter();
  const { defaultLocale } = router;

  return (
    <div>
      <h1>getStaticProps page</h1>
      <p>Current locale: {props.locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(props.locales)}</p>

      <Link href="/gsp/first">
        <a>To dynamic get static props page</a>
      </Link>
      <Link href="/gssp">
        <a>to getServerSideProps page</a>
      </Link>
      <Link href="/">
        <a>To index page</a>
      </Link>
    </div>
  );
};

export const getStaticProps = ({ locale, locales }) => {
  return {
    props: {
      locale,
      locales,
    },
  };
};

export default GspPage;
