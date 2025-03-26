// src/utils/sizeChartData.js

/**
 * Simple repository for product size charts
 * Contains only the basic table data without extra explanations or images
 */
export const sizeCharts = {
    // Key product types - we'll match these using "includes" rather than exact match
    "TEAM TEE": {
        title: "T-Shirt Size Guide",
        columns: ["Size", "Body Length", "Chest Width"],
        rows: [
            ["S", "28 in", "18 in"],
            ["M", "29 in", "20 in",],
            ["L", "30 in", "22 in"],
            ["XL", "31 in", "24 in",]
        ]
    },

    "TEAM HOODIE": {
        title: "Hoodie Size Guide",
        columns: ["Size", "Across Shoulders", "Body Length", "Chest Width", "Sleeve Length"],
        rows: [
            ["S", "18.5 in", "27.5 in", "21.75 in", "36.25 in"],
            ["M", "20.5 in", "28.5 in", "23.75 in", "37 in"],
            ["L", "22 in", "29.5 in", "25.75 in", "37.5 in"],
            ["XL", "23.5 in", "30.5 in", "27.75 in", "38.5 in"]
        ]
    }
};

/**
 * Get the appropriate size chart for a product
 * Uses partial matching to handle variations like "TEAM HOODIE Black"
 * 
 * @param {Object|string} product - Product data or title
 * @returns {Object|null} Size chart data object or null if not available
 */
export const getSizeChartForProduct = (product) => {
    // Get product title to match against
    let productTitle = '';

    if (typeof product === 'string') {
        productTitle = product;
    } else if (product?.title) {
        productTitle = product.title;
    } else {
        return null; // No valid product to match
    }

    // Check for key product types using includes() instead of exact match
    if (productTitle.includes("TEAM TEE")) {
        return sizeCharts["TEAM TEE"];
    }

    if (productTitle.includes("TEAM HOODIE")) {
        return sizeCharts["TEAM HOODIE"];
    }

    // For other product types like stickers that shouldn't have size charts
    return null;
};