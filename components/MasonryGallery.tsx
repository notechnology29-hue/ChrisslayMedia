export type GalleryImage = {
  id: string;
  title: string | null;
  image_url: string;
};

export default function MasonryGallery({ images }: { images: GalleryImage[] }) {
  if (!images.length) {
    return <p className="text-sm uppercase tracking-[0.2em] text-black/50">No images yet.</p>;
  }
  return (
    <div className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {images.map((img) => (
        <figure key={img.id} className="mb-4 break-inside-avoid">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img.image_url}
            alt={img.title ?? "Chriss Lay Media gallery image"}
            loading="lazy"
            className="w-full grayscale transition duration-500 hover:grayscale-0"
          />
        </figure>
      ))}
    </div>
  );
}
