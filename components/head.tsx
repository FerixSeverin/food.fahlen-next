import { useTheme } from 'styled-components';
import NextHead from 'next/head';

const Head: React.FC = () => {
  const currentTheme = useTheme();
  return (
    <>
      <NextHead>
        <title>Food.Fahlen</title>
        <meta name='theme-color' content={ currentTheme.backgroundColor } />
        <meta name='description' content='Recipes' />
        <link rel='shortcut icon' href='/favicon.ico' />
      </NextHead>
    </>
  );
};

export default Head;
