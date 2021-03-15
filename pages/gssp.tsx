import { ILocaleProps, ILocales } from 'interfaces/app/props';
import { useRouter } from 'next/router';

const GsspPage = (props: ILocales): JSX.Element => {
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

export const getServerSideProps = ({ locale, locales }: ILocales): ILocaleProps => {
  return {
    props: {
      locale,
      locales,
    },
  };
};

export default GsspPage;
