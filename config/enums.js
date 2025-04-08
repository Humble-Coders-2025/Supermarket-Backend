const UserTypes = {
    ADMIN: "admin",
    CUSTOMER: "customer",
    DELIVERY_PARTNER: "delivery_partner",
};

const OrderStatus = {
    PENDING: "pending",
    CONFIRMED: "confirmed",
    CANCELLED: "cancelled",
    DELIVERED: "delivered",
    RETURNED: "returned",
    REFUNDED: "refunded",
    OUT_FOR_DELIVERY: "out_for_delivery",
    FAILED: "failed",
};

const TransactionStatus = {
    PENDING: "pending",
    SUCCESS: "success",
    FAILED: "failed",
};

const CarouselItemType = {
    DISCOUNT: "discount",
    ADVRTISEMENT: "advertisement",
    PRODUCT: "product",
    CATEGORY: "category",
};

const DiscountType = {
    PERCENTAGE: "percentage",
    FLAT: "flat",
};

module.exports = {
    UserTypes,
    OrderStatus,
    TransactionStatus,
    CarouselItemType,
    DiscountType,
};
