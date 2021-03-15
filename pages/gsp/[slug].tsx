import { ILocaleProps, ILocales } from 'interfaces/app/props';
import { AppProps } from 'next/app';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function GspPage(props: AppProps & ILocales): JSX.Element {
  const router = useRouter();
  const { defaultLocale, query, isFallback } = router;

  //TODO: add a dedicated component for loading messages
  if (isFallback) return <div>'Loading...';</div>;

  return (
    <div>
      <h1>GetStaticProps page</h1>
      <p>Current slug: {query.slug}</p>
      <p>Current locales: {props.locale}</p>
      <p>Default locale: {defaultLocale}</p>
      <p>Configured locales: {JSON.stringify(props.locales)}</p>

      <Link href="/gsp">
        <a>To getStaticProps page</a>
      </Link>
      <br />

      <Link href="/gssp">
        <a>To getServerSideProps page</a>
      </Link>
      <br />

      <Link href="/">
        <a>To index page</a>
      </Link>
      <br />
    </div>
  );
}

interface IParam {
  slug: string;
}
interface IPath {
  params: IParam;
  locale: string;
}

interface IPaths {
  paths: IPath[];
  fallback: boolean;
}

export const getStaticProps = ({ locale, locales }: ILocales): ILocaleProps => {
  return {
    props: {
      locale,
      locales,
    },
  };
};

export const getStaticPaths = ({ locales = [] }: ILocales): IPaths => {
  const paths = [];
  for (const locale of locales) {
    paths.push({ params: { slug: 'first' }, locale });
    paths.push({ params: { slug: 'second' }, locale });
  }

  return { paths, fallback: true };
};
