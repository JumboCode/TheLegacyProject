import Image from "next/legacy/image";

interface FlowerBoxProps {
  children: React.ReactNode;
}

const FlowerBox = ({ children }: FlowerBoxProps) => {
  return (
    <div
      className="p-[20px] mt-[40px] sm:p-[40px] md:mx-[40px] \ relative z-10 flex flex-col content-center
                      overflow-hidden border border-dark-tan bg-med-tan text-center"
    >
      <span className="gap-[20px] z-10 flex flex-col">{children}</span>

      <span className="h-[140px] absolute -left-10 -top-6 aspect-square rotate-45 opacity-60">
        <Image
          src="/landing/pink-flower.png"
          layout="fill"
          objectFit="cover"
          alt="Pink flower top left frame"
        />
      </span>
      <span className="h-[200px] absolute -bottom-12 -left-16 aspect-square -rotate-45 opacity-40">
        <Image
          src="/landing/olive-branch.png"
          layout="fill"
          objectFit="cover"
          alt="Pink flower bottom left frame"
        />
      </span>
      <span className="h-[200px] absolute -right-14 -top-8 aspect-square -rotate-12 opacity-60">
        <Image
          src="/landing/pink-stem.png"
          layout="fill"
          objectFit="cover"
          alt="Pink flower top right frame"
        />
      </span>
      <span className="h-[140px] absolute -bottom-8 -right-12 aspect-square opacity-40">
        <Image
          src="/landing/yellow-flower.png"
          layout="fill"
          objectFit="cover"
          alt="Pink flower bottom right frame"
        />
      </span>
    </div>
  );
};

export default FlowerBox;
