import Link, { LinkProps as NextLinkProps} from "next/link";
import { ReactElement } from "react";

type LinkProps = NextLinkProps & {
    children: ReactElement | string;
    className?: string;
};

const CustomLink = ({ className, ...props }: LinkProps) => {
    return (
        <Link {...props} className={`text-main-brand-blue-500 font-medium ${className}`}>
            {props.children}
        </Link>
    );
};

export default CustomLink;
