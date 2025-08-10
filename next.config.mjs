
import withBundleAnalyzer from '@next/bundle-analyzer';
const withAnalyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' });
/** @type {import('next').NextConfig} */
const nextConfig = {};
export default withAnalyzer(nextConfig);
