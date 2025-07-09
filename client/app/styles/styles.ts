export const buttonStyles = {
  base: "inline-flex items-center justify-center font-Poppins font-medium rounded-lg transition-all duration-200 transform focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none",

  primary:
    "bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md focus:ring-blue-500/20",
  secondary:
    "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-500 dark:hover:border-blue-400 shadow-sm hover:shadow-md focus:ring-blue-500/20",
  tertiary:
    "bg-transparent text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500/20",

  small: "px-4 py-2 text-sm",
  medium: "px-6 py-3 text-base",
  large: "px-8 py-4 text-lg",

  danger:
    "bg-red-600 hover:bg-red-700 text-white shadow-sm hover:shadow-md focus:ring-red-500/20",
  success:
    "bg-green-600 hover:bg-green-700 text-white shadow-sm hover:shadow-md focus:ring-green-500/20",
  ghost:
    "bg-transparent text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 focus:ring-slate-500/20",
};

export const inputStyles = {
  base: "w-full font-Poppins bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 shadow-sm",

  default:
    "focus:border-blue-500 dark:focus:border-blue-400 focus:ring-blue-500/20",
  error:
    "border-red-500 dark:border-red-400 focus:border-red-500 dark:focus:border-red-400 focus:ring-red-500/20",
  success:
    "border-green-500 dark:border-green-400 focus:border-green-500 dark:focus:border-green-400 focus:ring-green-500/20",

  small: "px-3 py-2 text-sm",
  medium: "px-4 py-3 text-base",
  large: "px-5 py-4 text-lg",

  search: "pl-4 pr-12 py-3 rounded-lg",
  textarea: "min-h-[120px] resize-vertical",
};

export const labelStyles = {
  base: "block font-Poppins font-medium text-slate-700 dark:text-slate-300 mb-2",

  default: "text-sm",
  large: "text-base",
  small: "text-xs",

  required: "after:content-['*'] after:ml-0.5 after:text-red-500",
  error: "text-red-600 dark:text-red-400",
  success: "text-green-600 dark:text-green-400",
};

export const sectionStyles = {
  container: "w-[95%] 800px:w-[92%] m-auto",
  containerSmall: "w-[90%] 800px:w-[85%] m-auto",
  containerLarge: "w-[98%] 800px:w-[95%] m-auto",

  paddingSmall: "py-8 lg:py-12",
  paddingMedium: "py-12 lg:py-16",
  paddingLarge: "py-16 lg:py-24",
  paddingXLarge: "py-20 lg:py-32",

  backgroundDefault: "bg-white dark:bg-slate-900",
  backgroundGray: "bg-gray-50 dark:bg-gray-800",
  backgroundBlue: "bg-blue-50 dark:bg-blue-900/10",
  backgroundGreen: "bg-green-50 dark:bg-green-900/10",

  borderTop: "border-t border-slate-200 dark:border-slate-700",
  borderBottom: "border-b border-slate-200 dark:border-slate-700",
  borderFull: "border border-slate-200 dark:border-slate-700",

  shadowSmall: "shadow-sm",
  shadowMedium: "shadow-md",
  shadowLarge: "shadow-lg",
};

export const titleStyles = {
  h1: "text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 dark:text-white",
  h2: "text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-900 dark:text-white",
  h3: "text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-slate-900 dark:text-white",
  h4: "text-xl sm:text-2xl lg:text-3xl font-bold leading-tight text-slate-900 dark:text-white",
  h5: "text-lg sm:text-xl lg:text-2xl font-bold leading-tight text-slate-900 dark:text-white",
  h6: "text-base sm:text-lg lg:text-xl font-bold leading-tight text-slate-900 dark:text-white",

  subtitle:
    "text-lg text-slate-600 dark:text-slate-300 font-Poppins leading-relaxed",
  subtitleLarge:
    "text-xl text-slate-600 dark:text-slate-300 font-Poppins leading-relaxed",
  subtitleSmall:
    "text-base text-slate-600 dark:text-slate-300 font-Poppins leading-relaxed",

  hero: "text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight text-slate-900 dark:text-white",
  section:
    "text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight text-slate-900 dark:text-white text-center mb-4",
  card: "text-xl font-semibold font-Poppins text-slate-900 dark:text-white",

  gradient:
    "bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent",
  gradientBlue:
    "bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent",
  gradientGreen:
    "bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent",
};

export const cardStyles = {
  base: "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm transition-all duration-200",

  default: "hover:shadow-md",
  interactive: "hover:shadow-lg hover:scale-[1.02] cursor-pointer",
  elevated: "shadow-md hover:shadow-lg",

  paddingSmall: "p-4",
  paddingMedium: "p-6",
  paddingLarge: "p-8",

  header: "border-b border-slate-200 dark:border-slate-700 pb-4 mb-4",
  footer: "border-t border-slate-200 dark:border-slate-700 pt-4 mt-4",
};

export const navStyles = {
  // Navigation links
  link: "text-[16px] px-4 py-2 font-Poppins font-[400] cursor-pointer transition-colors duration-200 rounded-md",
  linkActive: "text-blue-600 dark:text-blue-400",
  linkDefault:
    "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",

  // Mobile navigation
  mobileLink:
    "block py-4 text-[18px] px-6 font-Poppins font-[400] cursor-pointer transition-colors duration-200",
  mobileLinkActive:
    "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20",
  mobileLinkDefault:
    "text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",

  // Navigation brand
  brand:
    "text-[25px] font-Poppins font-[500] text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors",
};

// Form Styles
export const formStyles = {
  // Form containers
  container: "space-y-6",
  group: "space-y-2",
  row: "grid grid-cols-1 md:grid-cols-2 gap-4",

  // Form elements
  fieldset: "border border-slate-200 dark:border-slate-700 rounded-lg p-4",
  legend:
    "text-lg font-semibold font-Poppins text-slate-900 dark:text-white px-2",

  // Error and success messages
  error: "text-red-600 dark:text-red-400 text-sm font-Poppins mt-1",
  success: "text-green-600 dark:text-green-400 text-sm font-Poppins mt-1",
  hint: "text-slate-500 dark:text-slate-400 text-sm font-Poppins mt-1",
};

// Badge Styles
export const badgeStyles = {
  // Base badge styles
  base: "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium font-Poppins",

  // Badge variants
  primary: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  secondary: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
  success:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  warning:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
  danger: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",

  // Badge sizes
  small: "px-2 py-0.5 text-xs",
  medium: "px-3 py-1 text-sm",
  large: "px-4 py-1.5 text-base",
};

// Utility Classes
export const utilityStyles = {
  // Text utilities
  textMuted: "text-slate-500 dark:text-slate-400",
  textAccent: "text-blue-600 dark:text-blue-400",
  textSuccess: "text-green-600 dark:text-green-400",
  textWarning: "text-yellow-600 dark:text-yellow-400",
  textDanger: "text-red-600 dark:text-red-400",

  // Background utilities
  bgAccent: "bg-blue-50 dark:bg-blue-900/20",
  bgSuccess: "bg-green-50 dark:bg-green-900/20",
  bgWarning: "bg-yellow-50 dark:bg-yellow-900/20",
  bgDanger: "bg-red-50 dark:bg-red-900/20",

  // Border utilities
  borderAccent: "border-blue-200 dark:border-blue-700",
  borderSuccess: "border-green-200 dark:border-green-700",
  borderWarning: "border-yellow-200 dark:border-yellow-700",
  borderDanger: "border-red-200 dark:border-red-700",

  // Animation utilities
  fadeIn: "animate-fade-in",
  slideIn: "animate-slide-in",
  pulse: "animate-pulse",
  bounce: "animate-bounce",

  // Spacing utilities
  spacingXSmall: "space-y-2",
  spacingSmall: "space-y-4",
  spacingMedium: "space-y-6",
  spacingLarge: "space-y-8",
  spacingXLarge: "space-y-12",
};

// Helper function to combine styles
export const combineStyles = (...styles: string[]) => {
  return styles.filter(Boolean).join(" ");
};

// Common style combinations
export const commonStyles = {
  // Page layouts
  pageContainer: combineStyles(
    sectionStyles.container,
    sectionStyles.paddingMedium
  ),
  pageHeader: combineStyles(
    sectionStyles.container,
    sectionStyles.paddingSmall,
    sectionStyles.borderBottom
  ),

  // Form layouts
  formContainer: combineStyles(
    cardStyles.base,
    cardStyles.paddingLarge,
    "max-w-md mx-auto"
  ),
  formField: combineStyles(formStyles.group),

  // Button combinations
  primaryButton: combineStyles(
    buttonStyles.base,
    buttonStyles.primary,
    buttonStyles.medium
  ),
  secondaryButton: combineStyles(
    buttonStyles.base,
    buttonStyles.secondary,
    buttonStyles.medium
  ),
  tertiaryButton: combineStyles(
    buttonStyles.base,
    buttonStyles.tertiary,
    buttonStyles.medium
  ),

  // Input combinations
  defaultInput: combineStyles(
    inputStyles.base,
    inputStyles.default,
    inputStyles.medium
  ),
  errorInput: combineStyles(
    inputStyles.base,
    inputStyles.error,
    inputStyles.medium
  ),

  // Title combinations
  pageTitle: combineStyles(titleStyles.h1, "text-center mb-6"),
  sectionTitle: combineStyles(titleStyles.section),
  cardTitle: combineStyles(titleStyles.card, "mb-4"),
};

const styles = {
  buttonStyles,
  inputStyles,
  labelStyles,
  sectionStyles,
  titleStyles,
  cardStyles,
  navStyles,
  formStyles,
  badgeStyles,
  utilityStyles,
  combineStyles,
  commonStyles,
};

export default styles;
