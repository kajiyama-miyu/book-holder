import Image from "next/image";

type Props = {
  handleOpen: (open: boolean) => void;
};

const HeaderMenu: React.FC<Props> = (props) => {
  const { handleOpen } = props;
  return (
    <>
      <svg
        onClick={() => handleOpen(true)}
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 mr-14 cursor-pointer"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <Image
        priority
        height={45}
        width={45}
        alt="book"
        src="/images/books.png"
        onClick={() => handleOpen(true)}
      />
      <a className="text-white ml-7">Book Holder</a>
    </>
  );
};

export default HeaderMenu;
