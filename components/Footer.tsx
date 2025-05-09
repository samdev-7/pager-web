export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full flex justify-center">
      <div className="max-w-7xl grow flex justify-center text-xs text-muted-foreground py-1">
        <p>Copyright &copy; {year} Pager. Licenced under AGPL-3.0.</p>
      </div>
    </footer>
  );
}
