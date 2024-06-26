// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

// other smart contracts can use this library for different operations specific to the supply chain

library ChainData {
    enum State {
        Manufactured,
        PurchasedByRetailer,
        ShippedByManufacturer,
        ReceivedByRetailer,
        PurchasedByCustomer,
        ShippedByRetailer,
        ReceivedByDistributionHub,
        ShippedByDistributionHub,
        ReceivedByCustomer
    }

    struct ManufactureDetails {
        address manufacturer;
        string manufacturerName;
        string manufacturerDetails;
        string factoryLongitude;
        string factoryLatitude;
        uint256 manufacturedDate;
    }

    struct ProductDetails {
        uint256 productCode;
        string productName;
        uint256 productPrice;
        string productCategory;
    }

    struct Product {
        uint256 uid;
        uint256 stockKeepingUnit;
        address owner;
        address customer;
        string transaction;
        State productState;
        ManufactureDetails manufacturer;
        RetailerDetails retailer;
        ProductDetails details;
        DistributionHubDetails distributionHub;
        uint256 operationTimestamp;
    }

    struct ProductHistory {
        Product[] history;
    }

    struct RetailerDetails {
        address retailer;
        string retailerLongitude;
        string retailerLatitude;
    }

    struct DistributionHubDetails {
        address distributionHub;
        string hubLongitude;
        string hubLatitude;
    }

    struct Roles {
        bool Manufacturer;
        bool Retailer;
        bool DistributionHub;
        bool Customer;
    }
}
