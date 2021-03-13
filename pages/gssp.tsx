import { useRouter } from "next/router";

const GsspPage = (props) => {
  const router = useRouter();
  const { defaultLocale } = router;

  return (
    <div>
      <h1>getServerSideProps page</h1>
      <p>Current locale: {props.locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(props.locales)}</p>
    </div>
  );
};

export const getServerSideProps = ({ locale, locales }) => {
  return {
    props: {
      locale,
      locales,
    },
  };
};

export default GsspPage;
