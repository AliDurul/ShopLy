import { PromotionCarausel } from '@/components/PromotionCarausel'
import Hero from '@/components/Hero'
import FeatureStrip from '@/components/FeatureStrip'
import ProductCarausel from '@/components/ProductCarausel'
import { LiaShippingFastSolid } from "react-icons/lia";
import PromotionDiv from '@/components/PromotionDiv';
import Newsletter from '@/components/Newsletter';

export default function Home() {

  const popularCategories = [
    'fashion',
    'electronics',
    'bags',
    'footwear',
    'groceries',
    'beauty',
    'wellness',
    'jewellery',
  ]

  const popularProducts = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,
    name: `pop-Product ${index + 1}`,
    brand: 'Flying Machine',
    images: ['/on.jpg', '/arka.jpg'],
    ratings: 4,
    price: 1200,
    discountPrice: 1000,
  }));

  const latestProducts = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,
    name: `latest-Product ${index + 1}`,
    brand: 'watch',
    images: ['https://serviceapi.spicezgold.com/download/1753712145779_morden-smart-watch-for-kids-men-women-boys-girls-d116-water-proof-touchscreen-smart-watch-bluetooth-1-44-hd-screen-smart-watch-with-daily-activity-tracker-heart-rate-sensor-sleep-monitor-black-product-image.webp', 'https://serviceapi.spicezgold.com/download/1753712150003_morden-smart-watch-for-kids-men-women-boys-girls-d116-water-proof-touchscreen-smart-watch-bluetooth-1-44-hd-screen-smart-watch-with-daily-activity-tracker-heart-rate-sensor-sleep-monitor-black-product-i(1).webp'],
    ratings: 4,
    price: 1200,
    discountPrice: 1000,
  }));

  const featuredProducts = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,
    name: `featured-Product ${index + 1}`,
    brand: 'cotton',
    images: ['https://serviceapi.spicezgold.com/download/1742463096955_hbhb1.jpg', 'https://serviceapi.spicezgold.com/download/1742463096960_hbhb3.jpg'],
    ratings: 4,
    price: 1200,
    discountPrice: 1000,
  }));

  const mens = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,
    name: `mens-Product ${index + 1}`,
    brand: 'Health',
    images: ['/on.jpg', '/arka.jpg'],
    ratings: 4,
    price: 1200,
    discountPrice: 1000,
  }));

  const women = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,
    name: `women-Product ${index + 1}`,
    brand: 'Shoe',
    images: ['/on.jpg', '/arka.jpg'],
    ratings: 4,
    price: 1200,
    discountPrice: 1000,
  }));

  const tech = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,
    name: `tech-Product ${index + 1}`,
    brand: 'Makeup',
    images: ['/on.jpg', '/arka.jpg'],
    ratings: 4,
    price: 1200,
    discountPrice: 1000,
  }));

  const promotionsF = [
    {
      id: 1,
      imageSrc: '/promo1.jpg',
      altText: 'Fashion Deals',
      title: 'New Season Styles',
      price: 50,
      isRight: true,
      href: '/category/fashion',
    },
    {
      id: 2,
      imageSrc: '/promo2.jpg',
      altText: 'Electronics Sale',
      title: 'Top Tech Picks',
      price: 299,
      isRight: true,
      href: '/category/electronics',
    },
    {
      id: 3,
      imageSrc: '/promo3.jpg',
      altText: 'Footwear Offers',
      title: 'Step Into Comfort',
      price: 35,
      isRight: false,
      href: '/category/footwear',
    },
    {
      id: 4,
      imageSrc: '/promo4.jpg',
      altText: 'Beauty Essentials',
      title: 'Glow-Up Deals',
      price: 20,
      isRight: false,
      href: '/category/beauty',
    }
  ];

  const promotionsS = [
    {
      id: 1,
      imageSrc: '/black-friday-promo.jpg',
      altText: 'Black Friday Sale',
      title: 'Black Friday Bonanza',
      price: 50,
      isRight: true,
      href: '/category/fashion',
    },
    {
      id: 2,
      imageSrc: '/fashion-promo.jpg',
      altText: 'Fashion Sale',
      title: 'Top Fashion Picks',
      price: 299,
      isRight: true,
      href: '/category/fashion',
    },
    {
      id: 3,
      imageSrc: '/grocery-promo.jpg',
      altText: 'Grocery Offers',
      title: 'Fresh Grocery Deals',
      price: 35,
      isRight: false,
      href: '/category/grocery',
    },
    {
      id: 4,
      imageSrc: '/new-season-promo.jpg',
      altText: 'New Season Essentials',
      title: 'Glow-Up Deals',
      price: 20,
      isRight: false,
      href: '/category/beauty',
    }
  ];

  return (
    <main className="space-y-14 pb-5 bg-[#f5f0f0] ">
      <Hero />

      <div className='-mt-10' />
      
      <ProductCarausel
        title="Popular Products"
        subTitle="Do not miss the current offers until the end of March."
        categories={popularCategories}
        products={popularProducts}
      />

      <PromotionCarausel />

      <FeatureStrip />

      <ProductCarausel
        title="Latest Products"
        products={latestProducts}
      />

      <section className='bg-background p-5 max-w-5/6 mx-auto border border-secondary/90 rounded-lg flex flex-col md:flex-row justify-around items-center gap-2 shadow-md shadow-secondary/50'>
        <div className='flex justify-center items-center'>
          <LiaShippingFastSolid className="mr-4 size-8" />
          <p className='uppercase font-medium '>Free shipping</p>
        </div>
        <p className='text-muted-foreground'>Free Delivery now On Your First Order and over $200</p>
        <p className='font-bold'>- Only $200</p>
      </section>

      <ProductCarausel
        title="featured Products"
        products={featuredProducts}
      />

      <PromotionDiv type="mid" promotions={promotionsS} />

      <ProductCarausel
        title="Tech Products"
        products={tech}
      />

      <ProductCarausel
        title="Mens Products"
        products={mens}
      />

      <PromotionDiv type="mix" promotions={promotionsF} />


      <ProductCarausel
        title="Women Products"
        products={women}
      />

      <Newsletter />

      {/* <div className='' /> */}

    </main>
  )
}
