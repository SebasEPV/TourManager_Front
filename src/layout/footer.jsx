export default function Footer() {
  return (
    <>
      <footer className="bg-teal-700 text-white py-6 text-center">
        <div className="container mx-auto">
          <p className="text-sm">
            Descubre nuestros increíbles tours y vive experiencias únicas.
          </p>
          <p className="text-sm mt-2">
            &copy;{new Date().getFullYear()} KANKUN. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
}
