import Image from "next/image";

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <header className="w-full flex justify-center py-5 border-b border-light-grey-400">
                <Image src="/logo.svg" alt="Logo DNC" width={45} height={40} />
            </header>
            <main className="w-full flex justify-center align-middle">{children}</main>
            <footer className="w-full flex justify-center py-6 bg-snow-white border-t border-light-grey-500">
                <p>&copy; 2025 Hotel System. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Layout;
