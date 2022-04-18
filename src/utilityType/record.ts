{
  type PageInfo = {
    title: string;
  };

  type Page = 'home' | 'about' | 'contact';

  const nav: Record<Page, PageInfo> = {
    home: { title: 'Home' },
    about: { title: 'About' },
    contact: { title: 'Contact' },
  };

  type Nullable<T> = T | null;

  function isNullCheck<T>(arg: Nullable<T>) {
    return arg == null;
  }

  console.log(isNullCheck(123));
}
