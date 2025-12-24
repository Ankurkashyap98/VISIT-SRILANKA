# Turbopack Configuration

This project is configured to support both Webpack and Turbopack for optimal development and production performance.

## Configuration Files

- `next.config.ts` - Main configuration with conditional Webpack/Turbopack support
- `next.config.dev.js` - Development-specific configuration
- `next.config.prod.js` - Production-specific configuration

## Available Scripts

### Development
```bash
# Use Turbopack (faster, recommended)
npm run dev

# Use Webpack (fallback)
npm run dev:webpack
```

### Production
```bash
# Standard build (Webpack)
npm run build

# Turbopack build (experimental)
npm run build:turbo
```

## Turbopack Benefits

- **Faster Development**: Up to 10x faster than Webpack in development
- **Better Caching**: Improved incremental compilation
- **Modern Architecture**: Built with Rust for better performance
- **Hot Reload**: Faster hot module replacement

## Configuration Details

### Turbopack Rules
```typescript
turbo: {
  rules: {
    '*.svg': {
      loaders: ['@svgr/webpack'],
      as: '*.js',
    },
  },
  resolveAlias: {
    '@': './',
  },
}
```

### Webpack Fallbacks
The configuration automatically detects when Turbopack is being used and skips Webpack-specific optimizations to prevent conflicts.

### Environment Detection
```typescript
const isTurbopack = process.env.TURBOPACK === '1' || process.env.__NEXT_PRIVATE_TURBOPACK === '1';
```

## Troubleshooting

### Warning: Webpack is configured while Turbopack is not
This warning appears when both Webpack and Turbopack configurations are present. The current setup handles this by:

1. Detecting when Turbopack is active
2. Skipping Webpack optimizations when using Turbopack
3. Providing fallback configurations

### Performance Issues
If you experience performance issues:

1. Try using Webpack instead: `npm run dev:webpack`
2. Check for conflicting dependencies
3. Verify Node.js version compatibility

### Build Issues
If builds fail with Turbopack:

1. Use standard build: `npm run build`
2. Check for unsupported features
3. Report issues to Next.js team

## Best Practices

1. **Development**: Use Turbopack for faster development
2. **Production**: Use standard Webpack build for stability
3. **Testing**: Test with both configurations
4. **CI/CD**: Use standard build in production pipelines

## Migration Guide

### From Webpack to Turbopack
1. Update scripts to use `--turbopack` flag
2. Test all features and dependencies
3. Update any custom webpack configurations
4. Verify build outputs

### From Turbopack to Webpack
1. Remove `--turbopack` flag from scripts
2. Ensure webpack configurations are active
3. Test performance and functionality
4. Update documentation

## Support

- [Next.js Turbopack Documentation](https://nextjs.org/docs/app/api-reference/next-config-js/turbopack)
- [Turbopack GitHub](https://github.com/vercel/turbo)
- [Next.js Configuration](https://nextjs.org/docs/app/api-reference/next-config-js)
