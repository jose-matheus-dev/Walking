type Props = { title: string } & React.HTMLAttributes<HTMLElement>;

export function Layout({ title, children, ...attrs }: Props) {
  return (
    <>
      <header>
        <h2>{title}</h2>
      </header>
      <main {...attrs}>{children}</main>
      <footer></footer>
    </>
  );
}
