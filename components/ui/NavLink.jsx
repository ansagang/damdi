import { useRouter } from 'next/router'
import Link from 'next/link';

export default function NavLink({ href, children }) {
    const router = useRouter();
    const className = router.asPath === `${href}` ? "active" : '';
    return (
        <Link href={href} className={className}>
            {children}
        </Link>
    )
}