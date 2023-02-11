// Test task Sellerise, 2023

// This task has two main metrics// Create func that parse Amazon product (https://www.amazon.com/dp/B082R2TMRV) with all reviews and produce JSON output as shown below. You can use up to four threads to speed up review downloading process (requests).
// - processing speed,
// - regex adaptation in case the page slightly changes



const productOutput = {
    asin: 'B082R2TMRV',
    title: 'Hiearcool Universal Waterproof Case, Waterproof Phone Pouch Compatible for iPhone 14 13 12 11 Pro Max XS Plus Samsung Galaxy S22 Cellphone Up to 7.2", IPX8 Cellphone Dry Bag for Vacation-2 Pack',
    bestSellerRank: true,
    price: 1399,
    answeredQuestions: 486,
    images:[
        // Parse all product images 
        'https://m.media-amazon.com/images/I/61QvJmeSg3L._AC_SX522_.jpg', // the biggest one
        // ...
    ],
    shipsFrom: 'Amazon',
    soldBy: {
        title: 'Hiearcool Direct',
        url: 'https://www.amazon.com/gp/help/seller/at-a-glance.html/ref=dp_merchant_link?ie=UTF8&seller=A3DJTZRS1C5A82&asin=B082R2TMRV&ref_=dp_merchant_link&isAmazonFulfilled=1'
    },
    variations: {
        total: 6,
        products: [
            // Parse all variants of the product
            {
                asin: 'B074M4PQ1K',
                image: 'https://m.media-amazon.com/images/I/51OonT6wA4L._SS36_.jpg',
                price: 1399
            },
            // ...
        ]
    },
    detailed:{
        brand: 'Hiearcool',
        color:	'Black&Black',
        formfactor: 'Dry Bag',
        compatiblePhoneModels: 'iPhone 14 Pro Max,14 Pro,iPhone 14 Plus,iPhone 14,iPhone 13 Pro Max,13 Pro,13, 13 mini,iPhone 12 Pro Max,12 Pro,12,iPhone 11,11 Pro,11Max, Xs Max, Xs, Xr, X,8,8 plus,7 plus,7, Samsung Galaxy S22,S21 Ultra,S21+, S21,S20 Ultra,S20,S10,S10e,S9,S9 Plus,S8,S8 Plus,Note 10+,10 9 8 S7 S7 edge S6 S6 Edge plus, Google Pixel 6 Pixel 5 Pixel 4 XL Pixel 4 Pixel 3,Play Z,P30,P30pro,LG G6 G5 G4 G3 G2 v10 etc, HTC One M10, M9, M8, M7, Nexus 6, 6P, 5, 4, Nokia Microsoft Lumia Black Berry Motorola, Other phone devices up to 7.2"', // full info
        material: 'Polyvinyl Chloride'
    },
    bulletPoints:[
        'Easy to operate the touch screen functions, but NOT for touch ID fingerprint. You can wake up your phone by power button or use "Raise to Wake" function: Setting->Display & Brightness->Raise to wake-> ON.',
        'Transparent cover will not block the camera use. But cell phone may suffer hydraulic pressure under certain water depth, which will impact the the operation of the touchscreen. Please take photos by volume buttons in this case. NOT for touch ID fingerprint.',
        'Fully submersible and IPX8 certified waterproof up to 100 feet/ 30 meters, this waterproof case is designed for extreme conditions such as rafting, swimming, beach playing and ordinary diving, but not recommended when diving into more than 49 feet of water depth.',
        'This extra large size universal waterproof phone case dry bag fits all smartphones up to 7.2 inches tall and 4 inches wide, including iPhone, Samsung, Google pixel, etc. Credit card wallet money waterproof dry bag for beach, fishing, swimming, boating, kayaking, snorkeling and water park activities.',
        'Product packaging update: new or old packages will send out randomly due to the lack of old version packaging.'
    ],
    productInfo: {
        productDimensions:	'8.27 x 4.33 x 0.5 inches',
        itemWeight: {
            val: 3.8,
            type: 'ounces'
        },
        asin: 'B082R2TMRV',
        itemModelNumber: 'Black&Black Waterproof Phone Pouch',
        bestSellersRank:[
            //Parse all categories available (there may be a different number of categories on different products)
            {
                val: 8,
                category: 'Cell Phones & Accessories',
                url: 'N/A'
            },
            {
                val: 1,
                category: 'Cell Phone Dry Bags',
                url: 'https://www.amazon.com/gp/bestsellers/wireless/17875443011/ref=pd_zg_hrsr_wireless'
            }
        ],
        isDiscontinuedByManufacturer: false,
        specialFeatures: 'Waterproof, Snowproof, Dustproof, Scratch Resistant',
        otherDisplayFeatures: 'Wireless',
        formfactor: 'Dry Bag',
        colour:	'Black&Black',
        whatsInTheBox: 'Cases and Lanyards',
        manufacturer: 'X Vision Technology LIMITED',
        countryOfOrigin: 'China',
        DateFirstAvailable:	'December 13, 2019'
    },
    ratings:{
        rate: 4.6,
        maxRate: 5,
        totalRate: 74156,
        byStars: {
            // Star: Percent
            5: 74,
            4: 15,
            3: 6,
            2: 2,
            1: 3
        }
    },
    reviewsThatMention:[
        //Parse all reviewsThatMention available (there may be a different number of such tags)
        {
            val: 'touch screen',
            url: 'https://www.amazon.com/product-reviews/B082R2TMRV/ref=cm_cr_othr_d_lh_0?ie=UTF8&filterByKeyword=touch+screen&pageNumber=1&reviewerType=all_reviews#reviews-filter-bar'
        },
        {
            val: 'face recognition',
            url: 'https://www.amazon.com/dp/B082R2TMRV?th=1#:~:text=reviews%20that%20mention-,touch%20screen,pro%20max,-iphone%2012%20pro'
        },
        {
            val: 'highly recommend',
            url: 'https://www.amazon.com/product-reviews/B082R2TMRV/ref=cm_cr_othr_d_lh_2?ie=UTF8&filterByKeyword=highly+recommend&pageNumber=1&reviewerType=all_reviews#reviews-filter-bar'
        },
        //...
    ],
    reviews: {
        total: 9124,
        list: [
            {
                user: {
                    name: 'Berto',
                    url: 'https://www.amazon.com/gp/profile/amzn1.account.AHSYQIBDZCDM5D62BAC6LMZVIEZQ/ref=cm_cr_arp_d_gw_btm?ie=UTF8'
                },
                body: [
                    // Parse all reviews available, (look at "See all reviews" button after review list)
                    {
                        title: `Works perfectly, minor issue that doesn’t affect it functionally`,
                        country: 'United States',
                        date: 'January 27, 2023',
                        verified: true,
                        color: 'Black&Green',
                        body: `Took these pouches to the beach for a few days in a row and have had them submerged under the ocean water for long periods of time. No moisture got in the case, not even condensation which is surprising. The touch screen works perfectly as well, but it won’t work underwater as water creates a barrier for capacitive touch screens whereas air doesn’t. If you try to record underwater, record above of it first then bring the phone underwater. Face recognition generally worked as well as what the Iphone could do, but didn’t rely on it too much.
                        One minor issue which I’ve seen other people comment on is that the side buttons are masked under the opaque colors of the pouch and makes it’s a bit clunky to figure out which buttons you’re pressing. It’s not the greatest design, but doesn’t impact the pouch functionality.
                        `,
                        helpful: 14
                    },
                   //...
                ]
            }
        ]
    }
}
