// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./ChainData.sol";

contract SupplyChain {
    event ManufacturerAdded(address indexed _account);

    address owner;
    // product id
    uint256 public uid;
    uint256 public stockKeepingUnit;

    // assign an id for each product stored in the structure
    mapping(uint256 => ChainData.Product) products;
    mapping(uint256 => ChainData.ProductHistory) productHistory;
    mapping(bytes32 => uint256) productStockCounter;

    // assign an Ethereum address representing an actor in the supply chain
    mapping(address => ChainData.Roles) roles;

    function hasManufacturerRole(address _account) public view returns (bool) {
        require((_account != address(0)));
        return roles[_account].Manufacturer; // true if the Role instance of account is a Manufacturer
    }

    function addManufacturerRole(address _account) public {
        require((_account != address(0)));
        require(!hasManufacturerRole(_account));
        roles[_account].Manufacturer = true;
    }

    function hasRetailerRole(address _account) public view returns (bool) {
        require(_account != address(0));
        return roles[_account].Retailer;
    }

    function addRetailerRole(address _account) public {
        require(_account != address(0));
        require(!hasRetailerRole(_account));
        roles[_account].Retailer = true;
    }

    function hasDistributionHubRole(
        address _account
    ) public view returns (bool) {
        require(_account != address(0));
        return roles[_account].DistributionHub;
    }

    function addDistributionHubRole(address _account) public {
        require(_account != address(0));
        require(!hasDistributionHubRole(_account));
        roles[_account].DistributionHub = true;
    }

    function hasCustomerRole(address _account) public view returns (bool) {
        require(_account != address(0));
        return roles[_account].Customer;
    }

    function addCustomerRole(address _account) public {
        require(_account != address(0));
        require(!hasDistributionHubRole(_account));
        roles[_account].Customer = true;
    }

    constructor() public payable {
        owner = msg.sender;
        stockKeepingUnit = 1;
        uid = 1;
    }

    event Manufactured(uint256 uid);
    event PurchasedByRetailer(uint256 uid);
    event ShippedByManufacturer(uint256 uid);
    event ReceivedByRetailer(uint256 uid);
    event PurchasedByCustomer(uint256 uid);
    event ShippedByRetailer(uint256 uid);
    event ReceivedByDistributionHub(uint256 uid);
    event ShippedByDistributionHub(uint256 uid);
    event ReceivedByCustomer(uint256 uid);

    modifier verifyAddress(address account) {
        require(msg.sender == account);
        _;
    }

    modifier manufactured(uint256 _uid) {
        require(products[_uid].productState == ChainData.State.Manufactured);
        _;
    }

    modifier shippedByManufacturer(uint256 _uid) {
        require(
            products[_uid].productState == ChainData.State.ShippedByManufacturer
        );
        _;
    }

    modifier receivedByRetailer(uint256 _uid) {
        require(
            products[_uid].productState == ChainData.State.ReceivedByRetailer
        );
        _;
    }

    modifier purchasedByCustomer(uint256 _uid) {
        require(
            products[_uid].productState == ChainData.State.PurchasedByCustomer
        );
        _;
    }

    modifier shippedByRetailer(uint256 _uid) {
        require(
            products[_uid].productState == ChainData.State.ShippedByRetailer
        );
        _;
    }

    modifier receivedByDistributionHub(uint256 _uid) {
        require(
            products[_uid].productState ==
                ChainData.State.ReceivedByDistributionHub
        );
        _;
    }

    modifier shippedByDistributionHub(uint256 _uid) {
        require(
            products[_uid].productState ==
                ChainData.State.ShippedByDistributionHub
        );
        _;
    }

    modifier receivedByCustomer(uint256 _uid) {
        require(
            products[_uid].productState == ChainData.State.ReceivedByCustomer
        );
        _;
    }

    function initialiseBaseProductDetails(
        ChainData.Product memory product
    ) internal pure {
        address retailer;
        string memory transaction;
        string memory retailerLongitude;
        string memory retailerLatitude;

        address distributionHub;
        string memory distributionHubLongitude;
        string memory distributionHubLatitude;
        address customer;

        product.retailer.retailer = retailer;
        product.retailer.retailerLongitude = retailerLongitude;
        product.retailer.retailerLatitude = retailerLatitude;

        product.distributionHub.distributionHub = distributionHub;
        product.distributionHub.hubLongitude = distributionHubLongitude;
        product.distributionHub.hubLatitude = distributionHubLatitude;

        product.customer = customer;
        product.transaction = transaction;
    }

    function initialiseProductDetails(
        ChainData.Product memory product,
        string memory productName,
        uint256 productCode,
        uint256 productPrice,
        string memory productCategory
    ) internal pure {
        product.details.productName = productName;
        product.details.productCode = productCode;
        product.details.productPrice = productPrice;
        product.details.productCategory = productCategory;
    }

    // Supply chain processes
    // Step 1: Product manufacturing

    function manufactureProduct(
        string memory manufacturerName,
        string memory manufactureDetails,
        string memory manufactureLongitude,
        string memory manufactureLatitude,
        string memory productName,
        uint256 productCode,
        uint256 productPrice,
        string memory productCategory
    ) public {
        require(hasManufacturerRole(msg.sender));
        uint256 _uid = uid;

        ChainData.Product memory product;
        product.uid = _uid;

        bytes32 productTypeKey = keccak256(
            abi.encodePacked(productName, productCategory)
        );

        if (productStockCounter[productTypeKey] == 0) {
            productStockCounter[productTypeKey] = 1;
        } else {
            productStockCounter[productTypeKey]++;
        }

        product.stockKeepingUnit = productStockCounter[productTypeKey];
        product.manufacturer.manufacturerName = manufacturerName;
        product.manufacturer.manufacturerDetails = manufactureDetails;
        product.manufacturer.factoryLongitude = manufactureLongitude;
        product.manufacturer.factoryLatitude = manufactureLatitude;
        product.manufacturer.manufacturedDate = block.timestamp;

        product.owner = msg.sender;
        product.manufacturer.manufacturer = msg.sender;
        initialiseBaseProductDetails(product);
        product.productState = ChainData.State.Manufactured;

        initialiseProductDetails(
            product,
            productName,
            productCode,
            productPrice,
            productCategory
        );

        product.operationTimestamp = block.timestamp;

        products[_uid] = product;
        productHistory[_uid].history.push(product);

        uid++;
        emit Manufactured(_uid);
    }

    // Step 2: Retailer purchase the product from the Manufacturer
    function purchaseByRetailer(uint256 _uid) public manufactured(_uid) {
        require(
            hasRetailerRole(msg.sender),
            "Caller does not have retailer role"
        );
        require(
            products[_uid].productState == ChainData.State.Manufactured,
            "Product is not in 'Manufactured' state"
        );

        products[_uid].retailer.retailer = msg.sender;
        products[_uid].productState = ChainData.State.PurchasedByRetailer;
        products[_uid].operationTimestamp = block.timestamp;

        productHistory[_uid].history.push(products[_uid]);
        emit PurchasedByRetailer(_uid);
    }

    // Step 3: Product shipping to Retailer
    function shipToRetailer(
        uint256 _uid
    ) public verifyAddress(products[_uid].manufacturer.manufacturer) {
        require(hasManufacturerRole(msg.sender));
        products[_uid].productState = ChainData.State.ShippedByManufacturer;
        products[_uid].operationTimestamp = block.timestamp;

        productHistory[_uid].history.push(products[_uid]);
        emit ShippedByManufacturer(_uid);
    }

    // Step 4: Retailer receives the product shipped by Manufacturer
    function receiveByRetailer(
        uint256 _uid,
        string memory retailerLongitude,
        string memory retailerLatitude
    )
        public
        shippedByManufacturer(_uid)
        verifyAddress(products[_uid].retailer.retailer)
    {
        require(hasRetailerRole(msg.sender));
        products[_uid].owner = msg.sender;
        products[_uid].retailer.retailerLongitude = retailerLongitude;
        products[_uid].retailer.retailerLatitude = retailerLatitude;
        products[_uid].productState = ChainData.State.ReceivedByRetailer;
        products[_uid].operationTimestamp = block.timestamp;

        productHistory[_uid].history.push(products[_uid]);
        emit ReceivedByRetailer(_uid);
    }

    // Step 5: Customer purchases a product from the Retailer
    function purchaseByCustomer(uint256 _uid) public receivedByRetailer(_uid) {
        require(hasCustomerRole(msg.sender));
        products[_uid].customer = msg.sender;
        products[_uid].productState = ChainData.State.PurchasedByCustomer;
        products[_uid].operationTimestamp = block.timestamp;

        productHistory[_uid].history.push(products[_uid]);
        emit PurchasedByCustomer(_uid);
    }

    // Step 6: Product shipping to Customer via Distribution Hub by Retailer
    function shipByRetailer(
        uint256 _uid
    )
        public
        verifyAddress(products[_uid].owner)
        verifyAddress(products[_uid].retailer.retailer)
    {
        require(hasRetailerRole(msg.sender));
        products[_uid].productState = ChainData.State.ShippedByRetailer;
        products[_uid].operationTimestamp = block.timestamp;

        productHistory[_uid].history.push(products[_uid]);
        emit ShippedByRetailer(_uid);
    }

    // Step 7: Distribution Hub received product from Retailer and will deliver it to Customer
    function receiveByDistributionHub(
        uint256 _uid,
        string memory hubLongitude,
        string memory hubLatitude
    ) public shippedByRetailer(_uid) {
        require(hasDistributionHubRole(msg.sender));
        products[_uid].owner = msg.sender;
        products[_uid].distributionHub.distributionHub = msg.sender;
        products[_uid].distributionHub.hubLongitude = hubLongitude;
        products[_uid].distributionHub.hubLatitude = hubLatitude;
        products[_uid].productState = ChainData.State.ReceivedByDistributionHub;
        products[_uid].operationTimestamp = block.timestamp;

        productHistory[_uid].history.push(products[_uid]);
        emit ReceivedByDistributionHub(_uid);
    }

    // Step 8: Product shipping to Customer
    function shipByDistributionHub(
        uint256 _uid
    )
        public
        receivedByDistributionHub(_uid)
        verifyAddress(products[_uid].owner)
        verifyAddress(products[_uid].distributionHub.distributionHub)
    {
        require(hasDistributionHubRole(msg.sender));
        products[_uid].productState = ChainData.State.ShippedByDistributionHub;
        products[_uid].operationTimestamp = block.timestamp;

        productHistory[_uid].history.push(products[_uid]);
        emit ShippedByDistributionHub(_uid);
    }

    // Step 9: Customer receives the product
    function receiveByCustomer(
        uint256 _uid
    )
        public
        shippedByDistributionHub(_uid)
        verifyAddress(products[_uid].customer)
    {
        require(hasCustomerRole(msg.sender));
        products[_uid].owner = msg.sender;
        products[_uid].productState = ChainData.State.ReceivedByCustomer;
        products[_uid].operationTimestamp = block.timestamp;

        productHistory[_uid].history.push(products[_uid]);
        emit ReceivedByCustomer(_uid);
    }

    // Get basic product details (sku, owner, manufacturer details)
    function getBasicProductDetails(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            uint256,
            uint256,
            address,
            address,
            string memory,
            string memory,
            string memory,
            string memory
        )
    {
        require(products[_uid].uid != 0);
        // product data will be persisted in the contract's storage for further use (stored permanently in the blockchain)
        ChainData.Product storage product = products[_uid];

        // checks the _type parameter is equal to "product" by comparing their keccak256 hashes (used for data encryption & security)
        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }

        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = productHistory[_uid].history[i];
        }

        return (
            product.uid,
            product.stockKeepingUnit,
            product.owner,
            product.manufacturer.manufacturer,
            product.manufacturer.manufacturerName,
            product.manufacturer.manufacturerDetails,
            product.manufacturer.factoryLongitude,
            product.manufacturer.factoryLatitude
        );
    }

    // Get additional product details and retailer info
    function getAdditionalProductDetails(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            uint256,
            string memory,
            uint256,
            uint256,
            string memory,
            ChainData.State,
            address,
            string memory,
            string memory
        )
    {
        require(products[_uid].uid != 0);
        ChainData.Product storage product = products[_uid];

        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }

        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = productHistory[_uid].history[i];
        }

        return (
            product.manufacturer.manufacturedDate,
            product.details.productName,
            product.details.productCode,
            product.details.productPrice,
            product.details.productCategory,
            product.productState,
            product.retailer.retailer,
            product.retailer.retailerLongitude,
            product.retailer.retailerLatitude
        );
    }

    // Get details about retailer & distribution hub and transaction
    function getRetailerDistributionDetails(
        uint256 _uid,
        string memory _type,
        uint256 i
    )
        public
        view
        returns (
            string memory,
            address,
            string memory,
            string memory,
            address,
            string memory
        )
    {
        require(products[_uid].uid != 0);
        ChainData.Product storage product = products[_uid];

        if (keccak256(bytes(_type)) == keccak256(bytes("product"))) {
            product = products[_uid];
        }

        if (keccak256(bytes(_type)) == keccak256(bytes("history"))) {
            product = productHistory[_uid].history[i];
        }

        return (
            product.retailer.retailerLatitude,
            product.distributionHub.distributionHub,
            product.distributionHub.hubLongitude,
            product.distributionHub.hubLatitude,
            product.customer,
            product.transaction
        );
    }

    function getProductCount() public view returns (uint256) {
        return uid;
    }

    function getProductHistoryLength(
        uint256 _uid
    ) public view returns (uint256) {
        return productHistory[_uid].history.length;
    }

    function getProductState(
        uint256 _uid
    ) public view returns (ChainData.State) {
        return products[_uid].productState;
    }

    function getOperationTimestamp(
        uint256 _uid,
        uint256 historyIndex
    ) public view returns (uint256) {
        require(_uid < uid, "Product ID does not exist!");
        require(
            historyIndex < productHistory[_uid].history.length,
            "History index out of bounds"
        );
        return productHistory[_uid].history[historyIndex].operationTimestamp;
    }

    // update the history of transactions for the current product in the ledger
    function setTransactionHashOnManufacture(string memory transaction) public {
        // accesses the most recent history entry of current product (last one)
        productHistory[uid - 1]
            .history[productHistory[uid - 1].history.length - 1]
            .transaction = transaction;

        products[uid - 1].transaction = transaction;
    }

    function setTransactionHash(
        uint256 _uid,
        string memory transaction
    ) public {
        ChainData.Product storage product = productHistory[_uid].history[
            productHistory[_uid].history.length - 1
        ];
        product.transaction = transaction;
    }
}
