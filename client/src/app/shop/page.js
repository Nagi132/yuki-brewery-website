import React from 'react';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';

export default function ShopPage() {
    const products = [
        {
            id: 1,
            name: "SALTFIELDS SKATER CAP",
            price: 32.00,
            image: "/images/20.jpg",
            description: "Classic 6-panel cap with embroidered logo"
        },
        {
            id: 2,
            name: "STREET CULTURE TEE",
            price: 28.00,
            image: "/images/21.jpg",
            description: "100% cotton tee with front and back prints"
        },
        {
            id: 3,
            name: "NEOPRENE CAN HOLDER",
            price: 12.00,
            image: "/images/22.jpg",
            description: "Insulated beer sleeve with logo"
        },
        {
            id: 4,
            name: "DIE-CUT LOGO STICKER",
            price: 4.00,
            image: "/images/23.jpg",
            description: "Weather-resistant vinyl sticker"
        }
    ];

    return (

        <div className="min-h-screen bg-[#f0f8ff] py-16 px-4">
            <div className="container mx-auto">

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="group relative bg-white p-6 rounded-lg transition-shadow hover:shadow-lg"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-square mb-6 overflow-hidden rounded-md bg-gray-100">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="text-center">
                                <h2 className="text-gray-900 font-medium tracking-wide mb-2">
                                    {product.name}
                                </h2>
                                <p className="text-sm text-gray-500 mb-4">
                                    {product.description}
                                </p>
                                <p className="text-gray-900 font-medium mb-4">
                                    ${product.price.toFixed(2)}
                                </p>

                                {/* Add to Cart Button */}
                                <button
                                    className="w-full group relative flex items-center justify-center space-x-2 border border-black text-gray-900 px-6 py-3 rounded-md font-medium tracking-wide overflow-hidden hover:text-white transition-colors duration-300"
                                >
                                    <span className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></span>
                                    <FaShoppingCart size={16} className="relative z-10" />
                                    <span className="relative z-10">ADD TO CART</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Shipping Notice */}
                <div className="mt-16 text-center">
                    <p className="text-gray-600 text-sm">
                        Free shipping on orders over $75. Orders typically ship within 2-3 business days.
                    </p>
                </div>
            </div>
        </div>
    );
}