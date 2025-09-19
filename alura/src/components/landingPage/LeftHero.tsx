import { CardCarousel } from "../ui/card-carousel"

function LeftHero() {
  const images = [
    { src: "/card1.jpg", alt: "Image 1" },
    // { src: "/card2.jpg", alt: "Image 2" },
    { src: "/card6.jpg", alt: "Image 3" },
    { src: "/card7.jpg", alt: "Image 3" },
    { src: "/card5.jpg", alt: "Image 3" },
  ]

  return (
    <div className="pt-40 flex justify-center">
      <CardCarousel
        images={images}
        autoplayDelay={2000}
        showPagination={true}
        showNavigation={true}
      />
    </div>
  )
}

export default LeftHero
