import wall1 from "@/assets/wall-1.jpg";
import wall2 from "@/assets/wall-2.jpg";
import wall3 from "@/assets/wall-3.jpg";

const photos = [
  { src: wall1, alt: "Client arriving at Mercedes V Class" },
  { src: wall2, alt: "Guest stepping out of luxury van at hotel" },
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
            className="w-full h-[60vh] md:h-screen object-cover block"
          />
        </div>
      ))}
    </section>
  );
};

export default PhotoWall;
