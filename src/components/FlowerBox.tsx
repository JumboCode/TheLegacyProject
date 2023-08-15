import Image from "next/image";

interface FlowerBoxProps {
  children: React.ReactNode;
}

const FlowerBox = ({ children }: FlowerBoxProps) => {
  return (
    <>
      <div className="relative flex flex-col p-[20px] sm:p-[40px] md:mx-[40px] gap-[20px] content-center text-center \
                      bg-med-tan overflow-hidden z-10">
        {children}

        <span className="absolute h-[140px] aspect-square -top-6 -left-10 rotate-45 opacity-60 -z-10">
          <Image 
            src="/landing/pink-flower.png"
            layout="fill"
            objectFit="cover"
          />
        </span>
        <span className="absolute h-[200px] aspect-square -bottom-12 -left-16 -rotate-45 opacity-40 -z-10">
          <Image 
            src="/landing/olive-branch.png"
            layout="fill"
            objectFit="cover"
          />
        </span>
        <span className="absolute h-[200px] aspect-square -top-8 -right-14 -rotate-12 opacity-60 -z-10">
          <Image 
            src="/landing/pink-stem.png"
            layout="fill"
            objectFit="cover"
          />
        </span>
        <span className="absolute h-[140px] aspect-square -bottom-8 -right-12 opacity-40 -z-10">
            <Image 
              src="/landing/yellow-flower.png"
              layout="fill"
              objectFit="cover"
            />
        </span>
      </div>
    </>
  );
}

export default FlowerBox;