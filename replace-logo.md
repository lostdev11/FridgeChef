# How to Replace the Logo with Your Own

## Quick Steps:

1. **Prepare your logo files:**
   - Main logo: Save as `logo.svg` (recommended 120x120px or larger)
   - Favicon: Save as `favicon.svg` (32x32px for browser tab)

2. **Replace the files:**
   - Copy your `logo.svg` to `/public/logo.svg`
   - Copy your `favicon.svg` to `/public/favicon.svg`

3. **Test the changes:**
   - The app will automatically use your new logo
   - Refresh your browser to see the changes

## File Locations:

- **Main Logo**: `/public/logo.svg` (used in hero section and footer)
- **Favicon**: `/public/favicon.svg` (used in browser tab)

## Logo Specifications:

### Main Logo (`logo.svg`):
- **Format**: SVG (preferred) or PNG with transparent background
- **Size**: 120x120px or larger
- **Colors**: Should work well on white background
- **Style**: Should match your brand and the cooking/food theme

### Favicon (`favicon.svg`):
- **Format**: SVG (preferred) or PNG with transparent background  
- **Size**: 32x32px
- **Colors**: Should be visible in browser tabs
- **Style**: Simplified version of your main logo

## Alternative Formats:

If you don't have SVG files, you can use:
- **PNG**: Good for logos with complex graphics
- **JPG**: Only if you don't need transparency
- **WebP**: Modern format with good compression

## Example:

If your logo is called `my-company-logo.png`:
1. Rename it to `logo.svg` (or keep as PNG)
2. Copy it to `/public/logo.svg`
3. Create a smaller version for favicon
4. Copy the favicon to `/public/favicon.svg`

## Troubleshooting:

- **Logo not showing**: Check file path and refresh browser
- **Logo too big/small**: Adjust the `w-16 h-16` classes in the components
- **Poor quality**: Use higher resolution source files
- **Wrong colors**: Ensure your logo works well on light backgrounds

## Current Logo Usage:

The logo appears in these locations:
1. **Hero Section**: Large logo in white circle with green border
2. **Footer**: Small logo with brand name
3. **Browser Tab**: Favicon

Your new logo will automatically appear in all these locations once you replace the files! 