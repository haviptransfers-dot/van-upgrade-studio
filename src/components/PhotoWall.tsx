import wall3 from "@/assets/wall-3.webp";

const photos = [
  { src: wall3, alt: "Mercedes V Class cruising on the highway" },
];

const PhotoWall = () => {
  return (
    <section className="bg-background">
      {photos.map((p) => (
        <div key={p.src} className="w-full">
          <img
            src={p.src}
            alt={p.alt}
            loading="lazy"
            decoding="async"
            width={1600}
            height={900}
            className="w-full h-[60vh] md:h-screen object-cover block"
          />
        </div>
      ))}
    </section>
  );
};

export default PhotoWall;
