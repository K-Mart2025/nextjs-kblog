import { useConfig } from "@/hooks/useConfig";
import { Product, ProductComponentProps } from "@/types/product";
import { ShoppingCart } from "lucide-react";
import Image from "next/image";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const ProductsGrid = ({ filteredProducts, gridRef }: ProductComponentProps) => {
    const config = useConfig()
    if (!filteredProducts || filteredProducts.length === 0) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="text-gray-500 text-lg">No hay productos disponibles</span>
            </div>
        )
    }

    return (
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product: Product) => (
                <div
                    key={product.id}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group"
                >
                    <div className="relative overflow-hidden w-full h-64">
                        <Image
                            width={200}
                            height={200}
                            src={product.img ? apiUrl + product.img : "/fallback-image.jpg"}
                            alt={product.name}
                            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <button className="absolute top-4 right-4 bg-white/90 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            <ShoppingCart size={20} className="text-red-600" />
                        </button>
                    </div>

                    <div className="p-6">
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-bold text-gray-900">{product.name}</h3>
                            {/* <div className="flex items-center space-x-1">
                                <Star size={16} className="text-yellow-400 fill-current" />
                                <span className="text-sm text-gray-600">{product.rating}</span>
                            </div> */}
                        </div>
                        <p className="text-gray-600 mb-4 leading-relaxed">{product.description}</p>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-red-600">{"$" + product.price}</span>
                            {
                                config &&
                                <a href={config?.commerceUrl + "/" + product.id} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2">
                                    <ShoppingCart size={16} />
                                    <span>Comprar</span>
                                </a>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default ProductsGrid