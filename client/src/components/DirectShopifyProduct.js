"use client";

import React, { useEffect, useState, useId, useRef } from 'react';

export default function DirectShopifyProduct({ productId, selected = false }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const loadingCheckerRef = useRef(null);
  
  // Use React's useId hook for stable IDs across server/client
  const uniqueId = useId();
  const componentId = `product-component-${productId}-${uniqueId.replace(/:/g, '')}`;

  useEffect(() => {
    // This script is directly from Shopify's Buy Button with minimal modifications
    const scriptCode = `
      (function () {
        var scriptURL = 'https://sdks.shopifycdn.com/buy-button/latest/buy-button-storefront.min.js';
        if (window.ShopifyBuy) {
          if (window.ShopifyBuy.UI) {
            ShopifyBuyInit();
          } else {
            loadScript();
          }
        } else {
          loadScript();
        }
        
        function loadScript() {
          var script = document.createElement('script');
          script.async = true;
          script.src = scriptURL;
          (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(script);
          script.onload = ShopifyBuyInit;
          script.onerror = function() {
            var errorContainer = document.getElementById('${componentId}');
            if (errorContainer) {
              errorContainer.innerHTML = '<div class="text-center"><p class="text-red-500 font-medium">Failed to load product</p></div>';
            }
          };
        }
        
        function ShopifyBuyInit() {
          var client = ShopifyBuy.buildClient({
            domain: 'w0gjqw-en.myshopify.com',
            storefrontAccessToken: '198e20dd3540402c924a22b413668692',
          });
          
          ShopifyBuy.UI.onReady(client).then(function (ui) {
            ui.createComponent('product', {
              id: '${productId}',
              node: document.getElementById('${componentId}'),
              moneyFormat: '%24%7B%7Bamount%7D%7D',
              options: {
                product: {
                  styles: {
                    product: {
                      "@media (min-width: 601px)": {
                        "max-width": "100%",
                        "margin-left": "0",
                        "margin-bottom": "0"
                      },
                      "text-align": "left",
                      "margin-bottom": "0"
                    },
                    title: {
                      "font-family": "Montserrat, sans-serif",
                      "font-weight": "normal",
                      "font-size": "14px",
                      "color": "#333333",
                      "text-transform": "uppercase"
                    },
                    price: {
                      "font-family": "Montserrat, sans-serif",
                      "font-size": "14px",
                      "color": "#333333"
                    },
                    compareAt: {
                      "font-size": "12px"
                    },
                    unitPrice: {
                      "font-size": "12px"
                    },
                    button: {
                      "display": "none"
                    },
                    description: {
                      "display": "none"
                    },
                    buttonWithQuantity: {
                      "display": "none"
                    },
                    quantity: {
                      "display": "none"
                    },
                    quantityIncrement: {
                      "display": "none"
                    },
                    quantityDecrement: {
                      "display": "none"
                    },
                    quantityInput: {
                      "display": "none"
                    }
                  },
                  contents: {
                    button: false,
                    buttonWithQuantity: false,
                    options: false,
                    quantity: false,
                    quantityIncrement: false,
                    quantityDecrement: false,
                    description: false
                  },
                  text: {
                    button: "Add to cart"
                  },
                  googleFonts: [
                    "Montserrat"
                  ]
                },
                modalProduct: {
                  contents: {
                    img: false,
                    imgWithCarousel: true,
                    variantTitle: false,
                    buttonWithQuantity: true,
                    button: false,
                    quantity: false
                  },
                  styles: {
                    product: {
                      "@media (min-width: 601px)": {
                        "max-width": "100%",
                        "margin-left": "0px",
                        "margin-bottom": "0px"
                      }
                    },
                    button: {
                      "font-family": "Montserrat, sans-serif",
                      "font-weight": "bold",
                      "font-size": "14px",
                      "padding-top": "15px",
                      "padding-bottom": "15px",
                      "border-radius": "6px",
                      "background-color": "#86c240",
                      ":hover": {
                        "background-color": "#76ae3a"
                      }
                    }
                  }
                },
                cart: {
                  styles: {
                    button: {
                      "font-family": "Montserrat, sans-serif",
                      "font-weight": "bold",
                      "font-size": "14px",
                      "padding-top": "15px",
                      "padding-bottom": "15px",
                      "border-radius": "6px",
                      "background-color": "#86c240",
                      ":hover": {
                        "background-color": "#76ae3a"
                      }
                    }
                  }
                },
                toggle: {
                  styles: {
                    toggle: {
                      "font-family": "Montserrat, sans-serif",
                      "background-color": "#86c240",
                      ":hover": {
                        "background-color": "#76ae3a"
                      }
                    },
                    count: {
                      "font-size": "14px"
                    }
                  }
                }
              }
            });
            
            // Signal to the parent window that the component has loaded
            window.dispatchEvent(new CustomEvent('shopifyProductLoaded', { 
              detail: { componentId: '${componentId}' }
            }));
          }).catch(function(error) {
            console.error("ShopifyBuy UI error:", error);
            var errorContainer = document.getElementById('${componentId}');
            if (errorContainer) {
              errorContainer.innerHTML = '<div class="text-center"><p class="text-red-500 font-medium">Error loading product</p></div>';
            }
          });
        }
      })();
    `;

    // Create and execute the script
    const executeScript = () => {
      try {
        // Create a new script element
        const scriptElement = document.createElement('script');
        scriptElement.type = 'text/javascript';
        scriptElement.innerHTML = scriptCode;
        
        // Add it to the document
        document.body.appendChild(scriptElement);
        
      } catch (err) {
        console.error("Error executing Shopify script:", err);
        setError("Error initializing product view");
      }
    };

    // Listen for the custom event from the Shopify script
    const handleProductLoaded = (event) => {
      if (event.detail.componentId === componentId) {
        setIsLoaded(true);
      }
    };
    
    window.addEventListener('shopifyProductLoaded', handleProductLoaded);
    executeScript();

    // Use the image loading as a backup method to detect when product is ready
    const checkProductLoaded = () => {
      // Check if the product image has loaded
      const container = document.getElementById(componentId);
      if (container && (
        container.querySelector('img') || 
        container.querySelector('.shopify-buy__product') ||
        container.querySelector('.shopify-buy__btn')
      )) {
        setIsLoaded(true);
        return true;
      }
      return false;
    };

    // Set multiple check points to detect product loading
    const checkInterval = setInterval(() => {
      if (checkProductLoaded()) {
        clearInterval(checkInterval);
      }
    }, 1000);
    
    // Set a longer timeout as a safety net
    loadingCheckerRef.current = setTimeout(() => {
      clearInterval(checkInterval);
      if (!isLoaded) {
        // Even if we hit timeout, don't show error if the content appears loaded
        if (!checkProductLoaded()) {
          setError("Product loading timed out");
        }
      }
    }, 20000); // Increased to 20 seconds

    return () => {
      // Clean up
      window.removeEventListener('shopifyProductLoaded', handleProductLoaded);
      clearInterval(checkInterval);
      if (loadingCheckerRef.current) {
        clearTimeout(loadingCheckerRef.current);
      }
    };
  }, [componentId, productId, isLoaded]);

  // Force removing the loading state after the component appears to have loaded
  useEffect(() => {
    // If the component has been mounted for at least 6 seconds, assume it's loaded
    const forceLoadTimeout = setTimeout(() => {
      const container = document.getElementById(componentId);
      if (container && container.children.length > 0 && !isLoaded) {
        setIsLoaded(true);
      }
    }, 6000);

    return () => clearTimeout(forceLoadTimeout);
  }, [componentId, isLoaded]);

  // Apply custom styles to Shopify elements after loading
  useEffect(() => {
    if (isLoaded) {
      const container = document.getElementById(componentId);
      if (container) {
        // Apply custom styles to match the design
        const applyCustomStyles = () => {
          // Remove unwanted elements and styles
          const styleTag = document.createElement('style');
          styleTag.textContent = `
            #${componentId} .shopify-buy__product {
              margin-bottom: 0 !important;
              padding: 0 !important;
            }
            #${componentId} .shopify-buy__product-img-wrapper {
              padding-top: 100% !important;
            }
            #${componentId} .shopify-buy__btn {
              display: none !important;
            }
            #${componentId} .shopify-buy__product__title {
              margin-top: 10px !important;
              font-weight: normal !important;
              text-transform: uppercase !important;
            }
            #${componentId} .shopify-buy__product__price {
              margin-top: 4px !important;
            }
            #${componentId} .shopify-buy__product__variant-selectors {
              display: none !important;
            }
            #${componentId} .shopify-buy__product__variant-img {
              position: absolute !important;
              top: 0 !important;
              left: 0 !important;
              right: 0 !important;
              bottom: 0 !important;
              width: 100% !important;
              height: 100% !important;
              object-fit: contain !important;
            }
          `;
          document.head.appendChild(styleTag);
        };

        // Apply styles after a short delay to ensure Shopify elements are fully rendered
        setTimeout(applyCustomStyles, 1000);
      }
    }
  }, [componentId, isLoaded]);

  return (
    <div 
      className={`relative cursor-pointer transition-all duration-300 hover:opacity-90 ${
        selected ? 'ring-2 ring-purple-500' : ''
      }`}
      onClick={() => {
        // Find and click the hidden Shopify Buy Button to open the modal
        const buyButton = document.getElementById(componentId)?.querySelector('.shopify-buy__btn');
        if (buyButton) {
          buyButton.click();
        }
      }}
    >
      {/* The container for Shopify to render into */}
      <div 
        id={componentId} 
        className="shopify-container" 
        suppressHydrationWarning
      >
        {/* Loading state - only show if not loaded yet */}
        {!isLoaded && !error && (
          <div className="animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-md"></div>
            <div className="space-y-2 mt-2">
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div className="text-center">
            <p className="text-red-500 font-medium">{error}</p>
            <p className="mt-2 text-sm text-gray-600">
              Please refresh the page
            </p>
          </div>
        )}
      </div>
    </div>
  );
}