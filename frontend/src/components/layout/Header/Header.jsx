'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search, ShoppingBag, Heart, User, Menu, X, ChevronDown } from 'lucide-react';
import { colors } from '@/config/theme/colors';
import { spacing } from '@/config/theme/spacing';
import { typography } from '@/config/theme/typography';
import { ROUTES, CATEGORIES } from '@/config/constants';
import { useCart } from '@/hooks/useCart';
import { useAuth } from '@/hooks/useAuth';
import { useWishlist } from '@/hooks/useWishlist';
import MobileMenu from '@/components/layout/MobileMenu/MobileMenu';

const Header = ({ announcementHeight = 0 }) => {  // ✅ parent se height receive karega
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  
  const router = useRouter();
  const { cartItems } = useCart();
  const { user, isAuthenticated } = useAuth();
  const { wishlist } = useWishlist();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const handleMouseLeaveDropdown = () => {
    setTimeout(() => {
      setIsCategoriesOpen(false);
    }, 150);
  };

  const headerStyles = {
    position: 'fixed',
    top: `${announcementHeight}px`, // ✅ AnnouncementBar ke neeche aayega
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: isScrolled ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.98)',
    backdropFilter: isScrolled ? 'blur(12px)' : 'blur(8px)',
    borderBottom: isScrolled ? `1px solid ${colors.border.light}` : 'none',
    transition: 'all 0.3s ease',
    boxShadow: isScrolled ? '0 4px 20px rgba(0,0,0,0.04)' : 'none',
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${spacing[6]}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '72px',
  };

  const logoStyles = {
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: spacing[2],
  };

  const logoImageStyles = {
    height: windowWidth < 768 ? '50px' : '60px',
    width: 'auto',
    maxHeight: '60px',
  };

  const navStyles = {
    display: windowWidth >= 1024 ? 'flex' : 'none',
    alignItems: 'center',
    gap: spacing[6],
  };

  const navLinkStyles = {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.medium,
    color: colors.text.secondary,
    textDecoration: 'none',
    transition: 'color 0.3s ease',
    position: 'relative',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  };

  const dropdownWrapperStyles = {
    position: 'relative',
    display: 'inline-block',
  };

  const dropdownMenuStyles = {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: colors.white,
    borderRadius: '12px',
    border: `1px solid ${colors.border.light}`,
    boxShadow: '0 20px 60px rgba(0,0,0,0.12)',
    padding: spacing[2],
    minWidth: '200px',
    zIndex: 999,
    opacity: isCategoriesOpen ? 1 : 0,
    visibility: isCategoriesOpen ? 'visible' : 'hidden',
    transition: 'opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease',
    transform: isCategoriesOpen ? 'translateX(-50%) translateY(0)' : 'translateX(-50%) translateY(-8px)',
    pointerEvents: isCategoriesOpen ? 'auto' : 'none',
  };

  const dropdownItemStyles = {
    display: 'block',
    padding: `${spacing[2]} ${spacing[4]}`,
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textDecoration: 'none',
    borderRadius: '8px',
    transition: 'all 0.2s ease',
    whiteSpace: 'nowrap',
  };

  const iconButtonStyles = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: colors.text.secondary,
    padding: spacing[2],
    borderRadius: '50%',
    transition: 'all 0.3s ease',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const badgeStyles = {
    position: 'absolute',
    top: '2px',
    right: '2px',
    backgroundColor: colors.primary,
    color: colors.white,
    fontSize: '10px',
    fontWeight: typography.fontWeight.extrabold,
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: `2px solid ${colors.white}`,
  };

  const searchOverlayStyles = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    backdropFilter: 'blur(4px)',
    zIndex: 99,
    display: isSearchOpen ? 'block' : 'none',
  };

  const searchModalStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: colors.white,
    borderRadius: '16px',
    padding: spacing[8],
    width: '90%',
    maxWidth: '600px',
    zIndex: 100,
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  };

  const searchInputStyles = {
    width: '100%',
    padding: `${spacing[3]} ${spacing[4]}`,
    fontSize: typography.fontSize.lg,
    border: `2px solid ${colors.border.light}`,
    borderRadius: '12px',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  };

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;
  const isDesktop = windowWidth >= 1024;

  return (
    <>
      <header style={headerStyles}>
        <div style={containerStyles}>
          <Link href={ROUTES.HOME} style={logoStyles}>
            <img src="/logo.avif" alt="CUTIES GLOW" style={logoImageStyles} />
          </Link>

          {isDesktop && (
            <nav style={navStyles}>
              <Link href={ROUTES.HOME} style={navLinkStyles}>Home</Link>
              <div style={dropdownWrapperStyles} onMouseEnter={() => setIsCategoriesOpen(true)} onMouseLeave={handleMouseLeaveDropdown}>
                <button style={navLinkStyles}>Categories <ChevronDown size={16} /></button>
                <div style={dropdownMenuStyles}>
                  {CATEGORIES?.length > 0 ? (
                    CATEGORIES.map((category) => (
                      <Link key={category} href={`/categories/${category.toLowerCase()}`} style={dropdownItemStyles}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = colors.border.light; e.currentTarget.style.color = colors.primary; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = colors.text.secondary; }}
                      >{category}</Link>
                    ))
                  ) : (
                    <div style={{ padding: spacing[2], color: colors.text.muted }}>No categories found.</div>
                  )}
                </div>
              </div>
              <Link href={ROUTES.PRODUCTS} style={navLinkStyles}>All Products</Link>
              <Link href={ROUTES.ABOUT} style={navLinkStyles}>About</Link>
              <Link href={ROUTES.CONTACT} style={navLinkStyles}>Contact</Link>
            </nav>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: spacing[2] }}>
            {(isTablet || isDesktop) && (
              <button style={iconButtonStyles} onClick={() => setIsSearchOpen(true)} aria-label="Search">
                <Search size={20} />
              </button>
            )}

            <Link href={ROUTES.WISHLIST} style={{ ...iconButtonStyles, textDecoration: 'none' }}>
              <Heart size={20} />
              {wishlist.length > 0 && <span style={badgeStyles}>{wishlist.length}</span>}
            </Link>

            <Link href={ROUTES.CART} style={{ ...iconButtonStyles, textDecoration: 'none' }}>
              <ShoppingBag size={20} />
              {cartItems.length > 0 && <span style={badgeStyles}>{cartItems.length}</span>}
            </Link>

            {isAuthenticated ? (
              <Link href={ROUTES.DASHBOARD} style={{ ...iconButtonStyles, textDecoration: 'none' }}>
                <User size={20} />
              </Link>
            ) : (
              <Link href={ROUTES.LOGIN} style={{ ...iconButtonStyles, textDecoration: 'none' }}>
                <User size={20} />
              </Link>
            )}

            {(isMobile || isTablet) && (
              <button style={iconButtonStyles} onClick={() => setIsMobileMenuOpen(true)} aria-label="Menu">
                <Menu size={24} />
              </button>
            )}
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isSearchOpen && (
          <>
            <div style={searchOverlayStyles} onClick={() => setIsSearchOpen(false)} />
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.2 }} style={searchModalStyles}>
              <form onSubmit={handleSearch}>
                <div style={{ position: 'relative' }}>
                  <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={searchInputStyles} autoFocus />
                  <button type="submit" style={{ position: 'absolute', right: spacing[4], top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: colors.primary, cursor: 'pointer' }}><Search size={24} /></button>
                </div>
              </form>
              <button onClick={() => setIsSearchOpen(false)} style={{ position: 'absolute', top: spacing[4], right: spacing[4], background: 'none', border: 'none', cursor: 'pointer', color: colors.text.muted }}><X size={24} /></button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </>
  );
};

Header.displayName = 'Header';
export default Header;