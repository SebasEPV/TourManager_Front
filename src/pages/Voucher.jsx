import { MapPin, Phone, Mail } from "lucide-react";

export default function Voucher() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center px-4" style={{ backgroundImage: "url('/bg2.png')" }}>
            {/* Título */}
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-2 mt-6 text-center drop-shadow-lg">
                Gracias por reservar con nosotros
            </h1>
            <p className="text-yellow-400 text-lg font-semibold mb-6 text-center drop-shadow-lg">
                Puedes revisar tus reservaciones aquí abajo
            </p>

            {/* Recibo */}
            <div className="bg-white p-6 mb-12 md:p-8 rounded-lg shadow-xl w-full max-w-2xl">
                {/* Encabezado */}
                <div className="flex justify-between items-center border-b pb-4">
                    <div className="text-left">
                        <div className="w-16 h-16 bg-gray-300 flex items-center justify-center rounded-lg">
                            <span className="text-lg font-bold">LOGO</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#007870]">ISLA MUJERES</h2>
                        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm mt-2">
                            <p className="flex items-center gap-1"><MapPin size={14} /> Dirección</p>
                            <p className="flex items-center gap-1"><Phone size={14} /> Número de atención</p>
                            <p className="flex items-center gap-1"><Mail size={14} /> Correo de atención</p>
                        </div>
                    </div>
                    <div className="text-right text-xl font-semibold text-white">Recibo</div>
                </div>

                {/* Pagado por */}
                <div className="flex justify-between items-start mt-4 border-b pb-2">
                    <div>
                        <h3 className="text-[#007870] font-semibold">Pagado por</h3>
                        <p className="text-sm text-gray-700">Nombre de usuario</p>
                        <p className="text-sm text-gray-700">Correo de usuario</p>
                    </div>
                    <div className="text-right text-xl text-[#007870] font-bold">RECIBO</div>
                </div>

                {/* Detalles de Reserva + Recibo */}
                <div className="flex justify-between items-start mt-4 border-b pb-2">
                    <div className="pl-4">
                        <h3 className="text-[#007870] font-semibold">Detalles de la reserva</h3>
                        <p className="text-sm text-gray-700">Fecha inicial establecida: <span className="font-medium">DD/MM/AAAA</span></p>
                        <p className="text-sm text-gray-700">Fecha final establecida: <span className="font-medium">DD/MM/AAAA</span></p>
                        <p className="text-sm text-gray-700">Cantidad de personas: <span className="font-medium">Adultos | Niños</span></p>
                        <p className="text-sm text-gray-700">Número de asignación: <span className="font-medium">000000</span></p>
                    </div>
                    <div className="text-right flex flex-col h-full justify-end">
                        <p className="text-sm text-gray-700 font-semibold">Recibo # <span className="font-normal">000000</span></p>
                        <p className="text-sm text-gray-700 font-semibold mt-auto">Fecha del recibo <span className="font-normal">DD-MM-AAAA</span></p>
                    </div>

                </div>

                {/* Tabla de precios */}
                <div className="mt-4">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="border-b bg-[#007870] text-white">
                                <th className="py-2 text-left pl-2">Cantidad</th>
                                <th className="py-2 text-left">Descripción</th>
                                <th className="py-2 text-left">Precio por Persona</th>
                                <th className="py-2 text-left pr-2">Importe</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b">
                                <td className="py-2 pl-2">Cantidad</td>
                                <td className="py-2">Noches</td>
                                <td className="py-2">Precio</td>
                                <td className="py-2 pr-2">Precio</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pl-2">Cantidad</td>
                                <td className="py-2">Comida</td>
                                <td className="py-2">Precio</td>
                                <td className="py-2 pr-2">Precio</td>
                            </tr>
                            <tr className="border-b">
                                <td className="py-2 pl-2">Cantidad</td>
                                <td className="py-2">Actividad</td>
                                <td className="py-2">Precio</td>
                                <td className="py-2 pr-2">Precio</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* Resumen de precios */}
                <div className="mt-4">
                    <p className="text-sm flex justify-between text-gray-700"><span>Subtotal:</span> <span>Precio Subtotal</span></p>
                    <p className="text-sm flex justify-between text-gray-700"><span>IVA:</span> <span>Precio IVA</span></p>
                    <p className="text-lg font-semibold flex justify-between text-gray-800"><span>Total:</span> <span>Precio general</span></p>
                </div>

                {/* Notas */}
                <div className="mt-4">
                    <h3 className="text-[#007870] font-semibold">Notas</h3>
                    <p className="text-sm text-gray-700">Gracias por reservar con nosotros, esperamos su próxima visita. 😊</p>
                </div>
            </div>
        </div>
    );
}
