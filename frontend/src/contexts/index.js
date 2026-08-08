export { AuthProvider, useAuth } from './AuthContext';
export { CartProvider, useCart } from './CartContext';
export { WishlistProvider, useWishlist } from './WishlistContext';
export { ToastProvider, useToast } from './ToastContext';
export { ThemeProvider, useTheme } from './ThemeContext';

// If you need to use multiple providers together, you can create a combined provider:
export const AppProviders = ({ children }) => {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              {children}
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};